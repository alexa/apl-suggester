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

import { IJsonSchema } from '../assets/IJsonSchema';

/**
 * This class is used to generate json schema for custom component.
 */
export class CustomComponentJsonSchemaGenerator {
    /**
     * Generate json schema based on the parameters.
     * @param data array of parameters.
     */
    public static generate(data : any[]) : IJsonSchema {
        const properties = {};
        data.forEach((eachItem) => {
            CustomComponentJsonSchemaGenerator.generalizeParameter(eachItem, properties);
        });
        const result = CUSTOM_COMPONENT_SCHEMA_TEMPLATE();
        result.properties = properties;
        // Add default property type.
        result.properties.type = {
            type : 'string'
        };
        return result;
    }

    private static generalizeParameter(param : any, carry : object) {
        const propertyTemplate = {
            type: 'string'
        };
        if (typeof param === 'string') {
            carry[param] = propertyTemplate;
        } else if (param['name']) {
            const paramName = param['name'];
            const copiedTemplate : IJsonSchema = {...propertyTemplate};
            if (param['type']) {
                copiedTemplate.type = param['type'];
            }
            if (param['description']) {
                copiedTemplate.description = param['description'];
            }
            if (param['default']) {
                copiedTemplate.default = param['default'];
            }
            carry[paramName] = copiedTemplate;
        }
    }
}

/**
 * Template for custom component json schema.
 */
export function CUSTOM_COMPONENT_SCHEMA_TEMPLATE() : IJsonSchema {
    return JSON.parse(JSON.stringify({
        $schema: 'http://json-schema.org/draft-07/schema#',
        definitions: {
        },
        type: 'object',
        properties: {
        },
        required: [
        ]
    })) as IJsonSchema;
}
