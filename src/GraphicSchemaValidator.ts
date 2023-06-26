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
import { NotificationLevel } from './IValidationInfo';
import * as AVGGroupItemJSONSchema from './assets/graphics/AVGGroupItem';
import * as AVGPathItemJSONSchema from './assets/graphics/AVGPathItem';
import * as AVGTextItemJSONSchema from './assets/graphics/AVGTextItem';
import * as AVGJSONSchema from './assets/graphics/AVG';

/**
 * Entrance to validate graphics.
 * @export
 * @class Validator
 */
export class GraphicSchemaValidator {
    private static instance;
    /**
     * Creates an instance of GraphicSchemaValidator.
     * @memberof GraphicSchemaValidator
     */
    private constructor() {
    }

    /**
     * Singleton method.
     * @static
     * @returns {GraphicSchemaValidator}
     * @memberof GraphicSchemaValidator
     */
    public static getInstance() : GraphicSchemaValidator {
        if (!this.instance) {
            this.instance = new GraphicSchemaValidator();
        }
        return this.instance;
    }

    /**
     * All supported graphic type to json schema mapping.
     * @static
     * @memberof GraphicSchemaValidator
     */
    private static GRAPHIC_TYPE_TO_JSON_SCHEMA = new Map<string, IJsonSchema>([
        ['group', AVGGroupItemJSONSchema.JSON_SCHEMA],
        ['path', AVGPathItemJSONSchema.JSON_SCHEMA],
        ['text', AVGTextItemJSONSchema.JSON_SCHEMA],
        ['root', AVGJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * Validate graphic.
     * @param {object} jsonObject
     * @param {string} graphicType
     * @returns {IValidationInfo[]}
     * @memberof GraphicSchemaValidator
     */
    public validateGraphic(jsonObject : object, graphicType : string) : IValidationInfo[] {
        const schemaId = 'avg_' + graphicType;
        const results = [];
        let validateFunction = ajv.getSchema(schemaId);

        if (!validateFunction) {
            const graphicJsonSchema : IJsonSchema = GraphicSchemaValidator.GRAPHIC_TYPE_TO_JSON_SCHEMA
            .get(graphicType);
            if (!graphicJsonSchema) {
                results.push({
                    errorMessage : 'Failed to find JSON schema for graphic: ' + graphicType,
                    path : '/',
                    level : NotificationLevel.WARN
                } as IValidationInfo);
                return results;
            }
            validateFunction = ajv.addSchema(graphicJsonSchema, schemaId).getSchema(schemaId);
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

    /**
     * Get graphic schema
     * @param {string} graphicType {'root', 'group', 'text', 'path'}
     * @returns {IJsonSchema}
     * @memberof GraphicSchemaValidator
     */
    public getGraphicSchema(graphicType : string) : IJsonSchema {
        const graphicJsonSchema : IJsonSchema = GraphicSchemaValidator.GRAPHIC_TYPE_TO_JSON_SCHEMA.get(graphicType);
        if (!graphicJsonSchema) {
            return graphicJsonSchema;
        }
        return JSON.parse(JSON.stringify(graphicJsonSchema));
    }
}
