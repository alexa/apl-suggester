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

/**
 * This class is used to add json path to meta template.
 */
export class JsonPathCompletor {
    /**
     * JSON path key.
     * @static
     * @memberof JsonPathCompletor
     */
    public static JSON_PATH = 'JSON_PATH';

    /**
     * Template object;
     * @private
     * @memberof JsonPathCompletor
     */
    private copiedDoc;

    /**
     * Key to add to all levels of object.
     * @private
     * @memberof JsonPathCompletor
     */
    private keyToAdd;

    /**
     * Creates an instance of JsonPathCompletor.
     * @param {object} originalDoc
     * @memberof JsonPathCompletor
     */
    public constructor(originalDoc : object, key? : string) {
        this.keyToAdd = key ? key : JsonPathCompletor.JSON_PATH;
        this.copiedDoc = JSON.parse(JSON.stringify(originalDoc));
    }

    /**
     * Add json path to template object.
     * @returns {object} with json path information.
     * @memberof JsonPathCompletor
     */
    public addJsonPath() : object {
        const layoutElement = this.copiedDoc['layouts'];
        if (layoutElement) {
            for (let eachKey of Object.keys(layoutElement)) {
                this.addJsonPathToObject(layoutElement[eachKey], `/layouts/${eachKey}`);
            }
        }
        if (this.copiedDoc['mainTemplate']) {
            this.addJsonPathToObject(this.copiedDoc['mainTemplate'], '/mainTemplate');
        }
        return this.copiedDoc;
    }

    /**
     * Add json path to grpahics object.
     * @returns {object} with json path information in graphics.
     * @memberof JsonPathCompletor
     */
    public addJsonPathToGraphics() : object {
        const graphicsElement = this.copiedDoc['graphics'];
        if (graphicsElement) {
            for (let eachKey of Object.keys(graphicsElement)) {
                this.addJsonPathToObject(graphicsElement[eachKey], `/graphics/${eachKey}`);
            }
        }
        return this.copiedDoc;
    }

    /**
     * Recursion method to add json path to template.
     * @private
     * @param {object} currentObject
     * @param {string} currentPath
     * @returns
     * @memberof JsonPathCompletor
     */
    private addJsonPathToObject(currentObject : object, currentPath : string) {
        if (typeof(currentObject) !== 'object') {
            return;
        }
        currentObject[this.keyToAdd] = currentPath;
        this.processChildComponent(currentObject, currentPath, 'items');
        this.processChildComponent(currentObject, currentPath, 'item');
    }

    /**
     * Process child element under item(s).
     * @private
     * @param {object} currentObject
     * @param {string} currentPath
     * @param {string} element
     * @memberof JsonPathCompletor
     */
    private processChildComponent(currentObject : object, currentPath : string, element : string) {
        if (!currentObject[element]) {
            return;
        }
        if (Array.isArray(currentObject[element])) {
            let index = 0;
            for (let eachArrayElem of currentObject[element]) {
                this.addJsonPathToObject(eachArrayElem, currentPath + `/${element}/${index}`);
                index += 1;
            }
        } else if (typeof(currentObject[element]) === 'object') {
            this.addJsonPathToObject(currentObject[element], currentPath + `/${element}`);
        }
    }
}
