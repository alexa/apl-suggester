/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

'use strict';

import { IJsonSchema } from './assets/IJsonSchema';
import { IValidationInfo } from './validation';
import * as ajv from 'ajv';
import { StaticAplTemplateValidator } from './StaticAplTemplateValidator';
import { ValidationErrorFilter } from './util/ValidationErrorFilter';
import { NotificationLevel } from './IValidationInfo';
import * as AVGGroupItemJSONSchema from './assets/graphics/AVGGroupItem';
import * as AVGPathItemJSONSchema from './assets/graphics/AVGPathItem';
import * as AVGTextItemJSONSchema from './assets/graphics/AVGTextItem';

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
        ['text', AVGTextItemJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * Validate graphic.
     * @param {object} jsonObject
     * @param {string} graphicType
     * @returns {IValidationInfo[]}
     * @memberof GraphicSchemaValidator
     */
    public validateGraphic(jsonObject : object, graphicType : string) : IValidationInfo[] {
        const graphicJsonSchema : IJsonSchema = GraphicSchemaValidator.GRAPHIC_TYPE_TO_JSON_SCHEMA
        .get(graphicType);
        const results = [];
        if (!graphicJsonSchema) {
            results.push({
                errorMessage : 'Failed to find JSON schema for graphic: ' + graphicType,
                path : '/',
                level : NotificationLevel.WARN
            } as IValidationInfo);
            return results;
        }
        const validateFunction = ajv({
            jsonPointers : true,
            allErrors : true,
            verbose : true
        }).compile(graphicJsonSchema);
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
