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
import { StaticAplTemplateValidator } from '../StaticAplTemplateValidator';
import { IValidationInfo } from '../validation';
import { PackageLoader, ILoadedResult } from '../util/PackageLoader';
import * as sinon from 'sinon';
import { IMPORT_LAYOUT_TEMPLATE_13 } from '../util/__tests__/template_test_cases/importInternalTemplate';
import { getSampleTemplate, SampleTemplateName } from '../configs';
import { NotificationLevel } from '../IValidationInfo';

describe('Integration Test to verify the JSON schema.', () => {
    let stub;
    let validator;
    beforeEach(() => {
        validator = new StaticAplTemplateValidator();
        stub = sinon.stub(PackageLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json : IMPORT_LAYOUT_TEMPLATE_13,
                justLoaded : true,
                name : 'alexa-layouts'
            } as ILoadedResult]);
        }));
    });

    afterEach(() => {
        stub.restore();
    });
    it('should compile with sample templates.', async () => {
        const template = getSampleTemplate(SampleTemplateName.IMAGE_RIGHT_DETAIL);
        const result = await validator.validate(template.apl);
        expect(result.length).to.be.equal(0);
    });

    it('should received correct amount of validation errors.', async () => {
        const result = await verifyTemplate('errorTemplate.json');
        expect(result.length).to.be.equal(11);
    });

    it('should compile with video template when souce is array of string.', async () => {
        await readSchemaAndPassAllValidations('videoAplTemplateWithArraySource.json');
    });

    it('should compile with video template when source is string.', async () => {
        await readSchemaAndPassAllValidations('videoAplTemplateWithStringSource.json');
    });

    it('should compile with video template when source is video track object.', async () => {
        await readSchemaAndPassAllValidations('videoAplTemplateWithVideoTrackSource.json');
    });

    it('should compile with video template when source is video track array.', async () => {
        await readSchemaAndPassAllValidations('videoAplTemplateWithVideoTrackArraySource.json');
    });

    it('should compile with video template when source is mixed type.', async () => {
        await readSchemaAndPassAllValidations('videoAplTemplateWithMixedSource.json');
    });

    it('should compile with grid sequence template.', async () => {
        await readSchemaAndPassAllValidations('gridSequenceAplTemplate.json');
    });

    it('should compile with graphic template.', async () => {
        await readSchemaAndPassAllValidations('graphicAplTemplate.json');
    });

    it('should compile with layout template.', async () => {
        await readSchemaAndPassAllValidations('layoutAplTemplate.json');
    });

    it('should compile with resource template.', async () => {
        await readSchemaAndPassAllValidations('resourceAplTemplate.json');
    });

    it('should show correct validation errors with resource template.', async () => {
        const result = await verifyTemplate('errorResourceAplTemplate.json');
        expect(result).to.have.lengthOf(2);
    });

    it('should compile with graphic template and show errors', async () => {
        const result = await verifyTemplate('errorGraphicAplTemplate.json');
        expect(result).to.have.lengthOf(2);
    });

    it('should validate multiChildComponent and show warning', async () => {
        const result = await verifyTemplate('liveDataWarningMultiChildAplTemplate.json');
        expect(result.length).to.be.equal(1);
        expect(result[0].path).to.be.equal('/mainTemplate/item/item/1');
        expect(result[0].level).to.be.equal(NotificationLevel.WARN);
    });

    it('should validate DataSource', async () => {
        let result = await validator.validateDataSources({});
        expect(result).to.have.lengthOf(0);
        result = await validator.validateDataSources({ key: 'string'});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateDataSources({ key: false});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateDataSources({ key: null});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateDataSources({ key: []});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateDataSources({ key: ['string']});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateDataSources({ key: {}});
        expect(result).to.have.lengthOf(0);
        result = await validator.validateDataSources({ key: { A: 'b'}});
        expect(result).to.have.lengthOf(0);
    });

    it('should validate sources', async () => {
        let result = await validator.validateSources('');
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({});
        expect(result).to.have.lengthOf(0);
        result = await validator.validateSources({ key: 'string'});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({ key: false});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({ key: null});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({ key: []});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({ key: ['string']});
        expect(result).to.have.lengthOf(1);
        result = await validator.validateSources({ key: {}});
        expect(result).to.have.lengthOf(0);
        result = await validator.validateSources({ key: { A: 'b'}});
        expect(result).to.have.lengthOf(0);
        result = await validator.validateSources([{A: 'a'}]);
        expect(result).to.have.lengthOf(1);
    });

    async function readSchemaAndPassAllValidations(fileName : string) {
        const result = await verifyTemplate(fileName);
        expect(result).to.have.lengthOf(0);
    }

    function verifyTemplate(fileName : string) : Promise<IValidationInfo[]> {
        const data = fs.readFileSync(`src/__tests__/templates/${fileName}`, 'utf8');
        return validator.validate(JSON.parse(data));
    }
});
