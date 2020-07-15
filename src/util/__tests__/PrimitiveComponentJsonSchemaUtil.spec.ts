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

import { expect } from 'chai';
import { PrimitiveComponentJsonSchemaUtil } from '../PrimitiveComponentJsonSchemaUtil';
import * as ContainerJSONSchema from '../../assets/Container';
import * as VectorGraphicJSONSchema from '../../assets/VectorGraphic';
import { IJsonSchema } from '../../assets/IJsonSchema';

describe('PrimitiveComponentJsonSchemaUtil', () => {
    it('should primitive component types correctly.', () => {
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentTypes().length).to.be.equal(12);
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentTypes('1.0').length).to.be.equal(9);
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentTypes('1.3').length).to.be.equal(12);
    });

    it('should get primitive component schema correctly if apl version is 1.3.', () => {
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Container', '1.3'))
        .to.be.eql(ContainerJSONSchema.JSON_SCHEMA);
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('VectorGraphic', '1.3'))
        .to.be.eql(VectorGraphicJSONSchema.JSON_SCHEMA);
    });

    it('should get primitive component schema correctly if apl version is 1.0.', () => {
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('VectorGraphic', '1.0'))
        .to.be.equal(undefined); // not defined in APL 1.0
        const jsonschema : IJsonSchema =
            PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Container', '1.0');
        expect(jsonschema.properties['type']['type']).to.be.equal('string'); // Component
        expect(jsonschema.properties['checked']).to.be.equal(undefined); // not defined in APL 1.0
    });

    it('should not let mixin support jsonSchema affect original component schema.', async () => {
        const jsonschema : IJsonSchema =
            PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Container', '1.0');
        expect(jsonschema.properties['checked']).to.be.equal(undefined); // not defined in APL 1.0
        expect(PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Container', '1.3'))
        .to.be.eql(ContainerJSONSchema.JSON_SCHEMA);
    });

    it('should generate correct Json schema with mixin support.', async () => {
        const jsonschema : IJsonSchema =
            PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Image', '1.0', 'Container');
        expect(jsonschema.properties['type']['type']).to.be.equal('string'); // Component
        expect(jsonschema.properties['checked']).to.be.equal(undefined); // not defined in APL 1.0
        expect(jsonschema.properties['id']['type']).to.be.equal('string'); // Component
        expect(jsonschema.properties['source']['$ref']).to.be.equal('#/definitions/url'); // Image
        expect(jsonschema.properties['grow']['type']).to.be.equal('number'); // ContainerChild
        expect(jsonschema.properties['numbering']['type']).to.be.equal('string'); // ContainerChild
    });

    it('should not let mixin support jsonSchema affect original component schema.', async () => {
        const jsonschemaWithMixin : IJsonSchema =
            PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Image', '1.0', 'Container');
        expect(jsonschemaWithMixin.properties['grow']['type']).to.be.equal('number'); // mixin type
        expect(jsonschemaWithMixin.properties.hasOwnProperty('overlayGradient')).to.be.equal(true);
        const originalSchema : IJsonSchema =
            PrimitiveComponentJsonSchemaUtil.getPrimitiveComponentSchema('Image', '1.0');
        expect(originalSchema.properties['grow']).to.be.equal(undefined); // mixin type
    });
});
