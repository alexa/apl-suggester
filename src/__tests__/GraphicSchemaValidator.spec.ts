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
import * as fs from 'fs';
import { NotificationLevel } from '../IValidationInfo';
import { GraphicSchemaValidator } from '../GraphicSchemaValidator';

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
        expect(result.length).to.be.equal(2);
        expect(result[0].path).to.be.equal('/');
        expect(result[0].level).to.be.equal(NotificationLevel.WARN);
        expect(result[0].errorMessage.indexOf('pathData') > 0).to.be.equal(true);
        expect(result[1].path).to.be.equal('/stroke');
        expect(result[1].level).to.be.equal(NotificationLevel.WARN);
    });

    async function verifyGraphic(fileName : string, type : string) {
        const data = fs.readFileSync(`src/__tests__/graphics/${fileName}`, 'utf8');
        const result = graphicSchemaValidator.validateGraphic(JSON.parse(data), type);
        expect(result.length).to.be.equal(0);
    }
});
