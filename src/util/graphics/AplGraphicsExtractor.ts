/*
 *   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

'use strict';
import { JsonPathCompletor } from '../JsonPathCompletor';
import { IAplGraphic } from './IAplGraphic';

/**
 * Used to extract Graphics from APL template.
 * @export
 * @class AplGraphicsExtractor
 */
export class AplGraphicsExtractor {
    private ROOT_GRAPHICS_PATH = 'graphics';

    /**
     * Instance of AplGraphicsExtractor.
     *
     * @private
     * @static
     * @type {AplGraphicsExtractor}
     * @memberof AplGraphicsExtractor
     */
    private static instance : AplGraphicsExtractor;

    private constructor() {
    }

    /**
     * Singleton method.
     *
     * @static
     * @returns {AplGraphicsExtractor}
     * @memberof AplGraphicsExtractor
     */
    public static getInstance() : AplGraphicsExtractor {
        if (!this.instance) {
            this.instance = new AplGraphicsExtractor();
        }
        return this.instance;
    }

    /**
     * Remove the JSON_PATH from the graphic
     * @param {object} aplTemplate
     * @returns {Promise<void>}
     * @memberOf AplGraphicsExtractor
     */
    public async clearJsonPath(aplTemplate : object) : Promise<void> {
        if (aplTemplate[this.ROOT_GRAPHICS_PATH]) {
            await Promise.all(
                Object.values(aplTemplate[this.ROOT_GRAPHICS_PATH])
                    .map((value : object) => {
                        if (typeof(value) === 'object' && value['type'] === 'AVG') {
                            delete value['JSON_PATH'];
                        }
                })
            );
        }
    }

    /**
     * Extract Graphic from current APL template without parsing all Graphics defined in import.
     * @param {object} aplTemplate
     * @returns {IAplGraphic[]}
     * @memberof AplGraphicsExtractor
     */
    public extractGraphics(aplTemplate : object) : IAplGraphic[] {
        const graphics : IAplGraphic[] = [];
        // add json path through completor. The completor also did deep copy of aplTemplate.
        const aplTemplateWithPath = new JsonPathCompletor(aplTemplate).addJsonPathToGraphics();
        // add graphics under graphics
        if (aplTemplateWithPath[this.ROOT_GRAPHICS_PATH]) {
            Object.values(aplTemplateWithPath[this.ROOT_GRAPHICS_PATH])
            .filter((value) => typeof(value) === 'object' && value['type'] === 'AVG')
            .forEach((value) => {
                this.addGraphicItems(value as object, graphics);
            });
        }
        return graphics;
    }

    /**
     * Add current Graphic. Also add child Graphics if there are any.
     * @param graphic the current Graphic to add
     * @param existingGraphics list of AplGraphics
     */
    private addGraphic(graphic : object, existingGraphics : IAplGraphic[]) {
        if (graphic['type'] === 'group') {
            this.addGraphicItems(graphic, existingGraphics);
        }
        const aplGraphic : IAplGraphic = this.buildAplGraphic(graphic);
        existingGraphics.push(aplGraphic);
    }

    private addGraphicItems(graphic : object, existingGraphics : IAplGraphic[]) {
        if (graphic['items']) {
            this.addChildGraphics(graphic['items'], existingGraphics);
        }
        if (graphic['item']) {
            this.addChildGraphics(graphic['item'], existingGraphics);
        }
    }

    private addChildGraphics(childGraphics : any, existingGraphics : IAplGraphic[]) {
        if (Array.isArray(childGraphics)) {
            childGraphics.forEach((Graphic) => this.addGraphic(Graphic, existingGraphics));
        } else if (typeof(childGraphics) === 'object') {
            this.addGraphic(childGraphics, existingGraphics);
        }
    }

    private buildAplGraphic(rawGraphic : object) : IAplGraphic {
        const jsonPath = rawGraphic[JsonPathCompletor.JSON_PATH];
        // delete unrelated properties
        delete rawGraphic[JsonPathCompletor.JSON_PATH];

        // indicate whether item/items exists but don't return the children. This replaced
        // outright deleting the properties which meant they would always error when required.
        if (rawGraphic['item']) {
            rawGraphic['item'] = [];
        }

        if (rawGraphic['items']) {
            rawGraphic['items'] = [];
        }

        return {
            jsonObject: rawGraphic,
            jsonPath,
            graphicType: rawGraphic['type']
        };
    }
}
