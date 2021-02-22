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
import { JsonPathCompletor } from './JsonPathCompletor';
import { ErrorDefinitions } from '../errors/IErrorDefinitions';
import { ErrorController } from '../errors/ErrorController';
import { PrimitiveComponentJsonSchemaUtil } from './PrimitiveComponentJsonSchemaUtil';
import { IAplComponent } from './IAplComponent';

/**
 * Used to extract components from APL template.
 * @export
 * @class AplComponentsExtractor
 */
export class AplComponentsExtractor {
    private ROOT_COMPONENT_TYPE = 'mainTemplate';

    /**
     * Instance of AplComponentsExtractor.
     *
     * @private
     * @static
     * @type {AplComponentsExtractor}
     * @memberof AplComponentsExtractor
     */
    private static instance : AplComponentsExtractor;

    private constructor() {
    }

    /**
     * Singleton method.
     *
     * @static
     * @returns {AplComponentsExtractor}
     * @memberof AplComponentsExtractor
     */
    public static getInstance() : AplComponentsExtractor {
        if (!this.instance) {
            this.instance = new AplComponentsExtractor();
        }
        return this.instance;
    }

    /**
     * Extract component from current APL template without parsing all components defined in import.
     * @param {object} aplTemplate
     * @returns {IAplComponent[]}
     * @memberof AplComponentsExtractor
     */
    public extractComponents(aplTemplate : object) : IAplComponent[] {
        const components : IAplComponent[] = [];
        // add json path through completor. The completor also did deep copy of aplTemplate.
        const aplTemplateWithPath = new JsonPathCompletor(aplTemplate).addJsonPath();
        // add components under layouts
        if (aplTemplateWithPath['layouts']) {
            Object.keys(aplTemplateWithPath['layouts']).forEach((key) => {
                this.addComponent(aplTemplateWithPath['layouts'][key], { type: key }, components);
            });
        }
        // add mainTemplate components
        if (aplTemplateWithPath['mainTemplate']) {
            this.addComponent(
                aplTemplateWithPath['mainTemplate'], { type: this.ROOT_COMPONENT_TYPE }, components);
        }
        // mixin parentComponentType
        const aplComponentTypes = PrimitiveComponentJsonSchemaUtil
        .getPrimitiveComponentTypes(aplTemplate['version']);
        this.generateMixinParent(components, aplComponentTypes);
        return components;
    }

    /**
     * Add current component. Also add child components if there are any.
     * @param component the current component to add
     * @param parentType direct parentType. Used to find mixin parent type later.
     * @param existingComponents list of AplComponents
     */
    private addComponent(component : object, parentComponent : object, existingComponents : IAplComponent[]) {
        const newParentComponent = component['type'] ? component : parentComponent;
        if (component['items']) {
            this.addChildComponents(component['items'], newParentComponent, existingComponents);
        }
        if (component['item']) {
            this.addChildComponents(component['item'], newParentComponent, existingComponents);
        }
        const aplComponent : IAplComponent = this.buildAplComponent(component, parentComponent);
        existingComponents.push(aplComponent);
    }

    private addChildComponents(
        childComponents : any, parentComponent : object, existingComponents : IAplComponent[]) {
        if (Array.isArray(childComponents)) {
            childComponents.forEach((component) => this.addComponent(component, parentComponent, existingComponents));
        } else if (typeof(childComponents) === 'object') {
            this.addComponent(childComponents, parentComponent, existingComponents);
        }
    }

    private buildAplComponent(rawComponent : object, parentComponent : object) : IAplComponent {
        const jsonPath = rawComponent[JsonPathCompletor.JSON_PATH];
        // delete unrelated properties
        delete rawComponent[JsonPathCompletor.JSON_PATH];

        if (rawComponent['items'] && rawComponent['item']) {
            const errorController = ErrorController.getInstance();
            errorController.triggerValidationError(
                ErrorDefinitions.COMPONENT_BUILDER_ITEM_AND_ITEMS.code,
                { path: jsonPath }
            );
        }

        // indicate whether item/items exists but don't return the children. This replaced
        // outright deleting the properties which meant they would always error when required.
        if (rawComponent['item']) {
            rawComponent['item'] = [];
        }

        if (rawComponent['items']) {
            rawComponent['items'] = [];
        }

        return {
            jsonObject: rawComponent,
            jsonPath,
            componentType: rawComponent['type'],
            parentComponentType: parentComponent['type'],
            parentComponent
        };
    }

    private generateMixinParent(components : IAplComponent[], aplComponentTypes : string[]) {
        components.forEach((component) => {
            component.parentComponent = this.findMixinParent(component.parentComponent, components, aplComponentTypes);
            component.parentComponentType = component.parentComponent['type'];
        });
    }

    private findMixinParent(
        currentParent : object,
        components : IAplComponent[],
        aplComponentTypes : string[]) : object {
        // Already reach root or the parent is APL component already
        if (currentParent['type'] === this.ROOT_COMPONENT_TYPE || aplComponentTypes.includes(currentParent['type'])) {
            return currentParent;
        }
        const parentComponent = components.filter((c) => {
            // avoid dead loop when a component's parent is the same type of itself
            // for layouts/custom/item is custom
            // currentParent is { "type": "custom"}, component is { "type": "custom" }
            if (c.componentType === c.parentComponentType) {
                return false;
            }
            return c.componentType === currentParent['type'];
        }).shift();
        if (parentComponent === undefined
            || parentComponent.parentComponent === undefined
            || !parentComponent.parentComponent['type']) {
            // The parent component is not used in APL.
            return currentParent;
        } else {
            return this.findMixinParent(parentComponent.parentComponent, components, aplComponentTypes);
        }
    }
}
