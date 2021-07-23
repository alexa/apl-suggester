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
import * as fs from 'fs';
import { NotificationLevel } from '../IValidationInfo';
import { GraphicSchemaValidator } from '../GraphicSchemaValidator';
import * as AVGPathItemJSONSchema from '../assets/graphics/AVGPathItem';
import * as AVGJSONSchema from '../assets/graphics/AVG';

describe('GraphicSchemaValidator.', () => {
    const graphicSchemaValidator = GraphicSchemaValidator.getInstance();

    it('should validate group graphic.', async () => {
        await verifyGraphic('AVGGroupItem.json', 'group');
    });

    it('should validate path graphic.', async () => {
        await verifyGraphic('AVGPathItem.json', 'path');
    });

    it('should received correct amount of validation errors.', async () => {
        const data = fs.readFileSync(`src/__tests__/graphics/ErrorGraphic.json`, 'utf8');
        const result =  graphicSchemaValidator.validateGraphic(JSON.parse(data), 'path');
        expect(result.length).to.be.equal(10);
        expect(result[0].path).to.be.equal('/');
        expect(result[0].level).to.be.equal(NotificationLevel.WARN);
        expect(result[1].path).to.be.equal('/');
        expect(result[1].level).to.be.equal(NotificationLevel.WARN);
        expect(result[2].path).to.be.equal('/bind/0');
        expect(result[2].level).to.be.equal(NotificationLevel.WARN);
        expect(result[2].errorMessage.indexOf('value') > 0).to.be.equal(true);
        expect(result[3].path).to.be.equal('/filters/0/type');
        expect(result[3].level).to.be.equal(NotificationLevel.WARN);
        expect(result[4].path).to.be.equal('/filters/0/horizontalOffset');
        expect(result[4].level).to.be.equal(NotificationLevel.WARN);
        expect(result[5].path).to.be.equal('/when');
        expect(result[5].level).to.be.equal(NotificationLevel.WARN);
        expect(result[6].path).to.be.equal('/fill');
        expect(result[6].level).to.be.equal(NotificationLevel.WARN);
        expect(result[7].path).to.be.equal('/');
        expect(result[7].level).to.be.equal(NotificationLevel.WARN);
        expect(result[7].errorMessage.indexOf('pathData') > 0).to.be.equal(true);
        expect(result[8].path).to.be.equal('/pathLength');
        expect(result[8].level).to.be.equal(NotificationLevel.WARN);
        expect(result[9].path).to.be.equal('/stroke');
        expect(result[9].level).to.be.equal(NotificationLevel.WARN);
    });

    it('should return path graphic schema.', async () => {
        const result = graphicSchemaValidator.getGraphicSchema('path');
        expect(result).to.deep.equal(AVGPathItemJSONSchema.JSON_SCHEMA);
    });

    it('should return root graphics schema.', async () => {
        const result = graphicSchemaValidator.getGraphicSchema('root');
        expect(result).to.deep.equal(AVGJSONSchema.JSON_SCHEMA);
    });

    async function verifyGraphic(fileName : string, type : string) {
        const data = fs.readFileSync(`src/__tests__/graphics/${fileName}`, 'utf8');
        const result = graphicSchemaValidator.validateGraphic(JSON.parse(data), type);
        expect(result.length).to.be.equal(0);
    }
});
