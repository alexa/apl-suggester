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

import { expect } from 'chai';
import { ValidationErrorFilter } from '../ValidationErrorFilter';

const MOCK_ANYOF_ERRORS = [
    {
        dataPath: '',
        keyword: 'required',
        message: 'should have required property "item"',
        params: { missingProperty: 'item' },
        schema: ['type', 'item'],
        schemaPath: '#/oneOf/0/required'
    },
    {
        dataPath: '',
        keyword: 'required',
        message: 'should have required property "items"',
        params: { missingProperty: 'items' },
        schema: ['type', 'items'],
        schemaPath: '#/oneOf/1/required'
    },
    {
        dataPath: '',
        keyword: 'required',
        message: 'should match some schema in oneOf',
        params: {},
        schema: [
            { required: ['type', 'item'] },
            { required: ['type', 'items'] }
        ],
        schemaPath: '#/oneOf'
    }
];

const MOCK_PATH_ERRORS = [
    {
        dataPath: '/version',
        keyword: 'required',
        message: 'should have required property "item"',
        params: { missingProperty: 'item' },
        schema: ['type', 'item'],
        schemaPath: 'enum'
    },
    {
        dataPath: 'graphics/version',
        keyword: 'required',
        message: 'should have required property "items"',
        params: { missingProperty: 'items' },
        schema: ['type', 'items'],
        schemaPath: 'enum'
    },
    {
        dataPath: 'graphics',
        keyword: 'required',
        message: 'should have required property "items"',
        params: { missingProperty: 'items' },
        schema: ['type', 'items'],
        schemaPath: 'enum'
    }
];

const MOCK_ADDITIONAL_PROPERTIES_ERRORS = [
    {
        dataPath: '',
        keyword: 'additionalProperties',
        message: 'should NOT have additional properties',
        params: {
            additionalProperty: '-user-position'
        },
        schema: false,
        schemaPath: '#/additionalProperties'
    },
    {
        dataPath: '',
        keyword: 'additionalProperties',
        message: 'should NOT have additional properties',
        params: {
            additionalProperty: 'mock-position'
        },
        schema: false,
        schemaPath: '#/additionalProperties'
    }
];

describe('ValidationErrorFilter', () => {
    it('should correctly collapse oneOf item/items schema errors.', () => {
        const actualResults = [];
        ValidationErrorFilter.filterErrors(
            MOCK_ANYOF_ERRORS,
            ValidationErrorFilter.singleDataPathFilter
        ).forEach((error) => {
            actualResults.push(error);
        });
        expect(actualResults.length).to.equal(1);
    });

    it('should filter user defined property errors .', () => {
        const actualResults = [];
        MOCK_ADDITIONAL_PROPERTIES_ERRORS.filter(ValidationErrorFilter.userDefinedPropertyErrorFilter)
        .forEach((error) => {
            actualResults.push(error);
        });
        expect(actualResults.length).to.equal(1);
    });

    it('should correctly collapse oneOf item/items schema errors.', () => {
        const actualResults = [];
        ValidationErrorFilter.filterErrors(
            MOCK_PATH_ERRORS,
            ValidationErrorFilter.singleDataPathFilter
        ).forEach((error) => {
            actualResults.push(error);
        });
        console.log(actualResults);
        expect(actualResults.length).to.equal(2);
    });
});
