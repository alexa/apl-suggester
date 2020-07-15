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

import {
    CustomComponentJsonSchemaGenerator, CUSTOM_COMPONENT_SCHEMA_TEMPLATE } from '../CustomComponentJsonSchemaGenerator';
import { expect } from 'chai';

describe('Custom component json schema generator.', () => {
    it('should generate json schema correctly.', () => {
        const jsonSchema = CustomComponentJsonSchemaGenerator.generate(['param1', 'param2']);
        const expectedJsonSchema = CUSTOM_COMPONENT_SCHEMA_TEMPLATE();
        expectedJsonSchema.properties = {
            param1 : {
                type : 'string'
            },
            param2 : {
                type : 'string'
            },
            type : {
                type : 'string'
            }
        };
        expect(jsonSchema).to.deep.equal(expectedJsonSchema);
    });

    it('should generate json schema correctly when parameter is object.', () => {
        const jsonSchema = CustomComponentJsonSchemaGenerator.generate([
            {
              name: 'param1',
              description: 'Primary text to render in header.',
              type: 'string'
            },
            {
              name: 'param2',
              description: 'Secondary text to render in header.',
              type: 'boolean'
            }]);
        const expectedJsonSchema = CUSTOM_COMPONENT_SCHEMA_TEMPLATE();
        expectedJsonSchema.properties = {
            type : {
                type : 'string'
            },
            param1 : {
                type : 'string',
                description : 'Primary text to render in header.'
            },
            param2 : {
                type : 'boolean',
                description : 'Secondary text to render in header.'
            }
        };
        expect(jsonSchema).to.deep.equal(expectedJsonSchema);
    });
});
