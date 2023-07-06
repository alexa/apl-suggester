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

import { IJsonSchema } from './assets/IJsonSchema';
import { IValidationInfo } from './validation';
import ajv from './util/Ajv';
import { StaticAplTemplateValidator } from './StaticAplTemplateValidator';
import { ValidationErrorFilter } from './util/ValidationErrorFilter';
import { getRootComponentName } from './util/Utils';
import { NotificationLevel } from './IValidationInfo';
import { CustomComponentsExtractor } from './util/CustomComponentsExtractor';
import { PrimitiveComponentJsonSchemaUtil } from './util/PrimitiveComponentJsonSchemaUtil';

/**
 * Entrance to validate components.
 * @export
 * @class Validator
 */
export class ComponentSchemaController {
    /**
     * CustomComponentsExtractor used to extract components from APL template.
     *
     * @private
     * @memberof ComponentSchemaController
     */
    private customComponentsExtractor;

    private static instance : ComponentSchemaController;
    /**
     * Creates an instance of ComponentSchemaController.
     * @memberof ComponentSchemaController
     */
    private constructor() {
        this.customComponentsExtractor = CustomComponentsExtractor.getInstance();
    }

    /**
     * Singleton method.
     * @static
     * @returns {ComponentSchemaController}
     * @memberof ComponentSchemaController
     */
    public static getInstance() : ComponentSchemaController {
        if (!this.instance) {
            this.instance = new ComponentSchemaController();
        }
        return this.instance;
    }

    /**
     * Check whether a component can contain other components.
     */
    public isLayoutComponent(componentName : string, jsonPath : string) : boolean {
        const isPredefined = ['Container', 'Frame', 'ScrollView', 'Sequence', 'TouchWrapper', 'Pager'].
        includes(componentName);
        return isPredefined || this.isCustomComponent(jsonPath);
    }

    public isCustomComponent(jsonPath : string) : boolean {
        if (!jsonPath) {
            return false;
        }
        return getRootComponentName(jsonPath) !== undefined || jsonPath === '/mainTemplate';
    }

    /**
     * Get JSON schema for given component.
     * @static
     * @param {string} componentType
     * @param {string} [parentComponentType]
     * @returns {IJsonSchema}
     * @memberof ComponentSchemaController
     */
    public async getComponentSchema(
        aplTemplate : object,
        componentType : string,
        parentComponentType? : string) : Promise<IJsonSchema> {
        const aplVersion = aplTemplate && aplTemplate['version'];
        const primitiveComponents = PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentTypes(aplVersion);
        if (primitiveComponents.includes(componentType)) {
            const componentSchema = PrimitiveComponentJsonSchemaUtil
            .getPrimitiveComponentSchema(componentType, aplVersion, parentComponentType);
            return new Promise<IJsonSchema>((resolve) => {
                resolve(componentSchema);
            });
        }
        const aplComponentRepresentation =
        await this.customComponentsExtractor.extractCustomComponents(aplTemplate);
        return aplComponentRepresentation.getCustomComponentJsonSchema(componentType);
    }

    /**
     * Get a list of the supported components.
     * @param {object} aplTemplate
     * @returns {Promise<IJsonSchema>}
     * @memberof ComponentSchemaController
     */
    public async getAvailableComponents(aplTemplate? : object) : Promise<string[]> {
        if (!aplTemplate) {
            return PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentTypes();
        }
        const primitiveComponents = PrimitiveComponentJsonSchemaUtil
        .getPrimitiveComponentTypes(aplTemplate['version']);
        const aplComponentRepresentation =
        await this.customComponentsExtractor.extractCustomComponents(aplTemplate);
        return primitiveComponents.concat(aplComponentRepresentation.getCustomComponentNames());
    }

    /**
     * Get a list of the custom components.
     * @param {object} aplTemplate
     * @returns {Promise<IJsonSchema>}
     * @memberof ComponentSchemaController
     */
    public async getCustomComponents(aplTemplate? : object) : Promise<string[]> {
        if (!aplTemplate) {
            return [];
        }
        const aplComponentRepresentation =
            await this.customComponentsExtractor.extractCustomComponents(aplTemplate);
        return aplComponentRepresentation.getCustomComponentNames();
    }

    /**
     * Validate component.
     * @static
     * @param {object} jsonObject
     * @param {string} componentType
     * @param {string} [parentComponent]
     * @returns {IValidationInfo[]}
     * @memberof ComponentSchemaController
     */
    public async validateComponent(
        aplTemplate : object,
        jsonObject : object,
        componentType : string,
        parentComponentType? : string
    ) : Promise<IValidationInfo[]> {
        const schemaId = (parentComponentType || '') + componentType;
        let validateFunction = ajv.getSchema(schemaId);
        const results = [];

        // not a compiled and cached schema
        if (!validateFunction) {
            const componentJsonSchema : IJsonSchema =
                await this.getComponentSchema(aplTemplate, componentType, parentComponentType);

            if (!componentJsonSchema) {
                results.push({
                    errorMessage : 'Failed to find JSON schema for component: ' + componentType,
                    path : '/',
                    level : NotificationLevel.WARN
                } as IValidationInfo);
                return results;
            }
            // Please refer to Ajv documentation on the method chaining
            // https://ajv.js.org/guide/managing-schemas.html#using-ajv-instance-cache
            validateFunction = ajv.addSchema(componentJsonSchema, schemaId).getSchema(schemaId);
        }

        const succeed = validateFunction(jsonObject);
        if (succeed) {
            return [];
        }
        ValidationErrorFilter.filterErrors(
            validateFunction.errors,
            ValidationErrorFilter.singleDataPathFilterNoRootPath
        ).filter(ValidationErrorFilter.userDefinedPropertyErrorFilter)
        .forEach((eachError) => {
                results.push(StaticAplTemplateValidator.asValidationWarnInfo(eachError));
        });
        return results;
    }
}
