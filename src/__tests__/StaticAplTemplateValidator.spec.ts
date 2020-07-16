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
import { IMPORT_LAYOUT_TEMPLATE } from '../util/__tests__/template_test_cases/importInternalTemplate';
import { getSampleTemplates } from '../configs';

describe('Integration Test to verify the JSON schema.', () => {
    let stub;
    let validator;
    beforeEach(() => {
        validator = new StaticAplTemplateValidator();
        stub = sinon.stub(PackageLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json : IMPORT_LAYOUT_TEMPLATE,
                justLoaded : true,
                name : 'alexa-layouts'
            } as ILoadedResult]);
        }));
    });

    afterEach(() => {
        stub.restore();
    });

    it('should compile with sample templates.', async () => {
        await Promise.all(
            getSampleTemplates().map(async (template, name ) => {
                const result = await validator.validate(template.apl);
                expect(result, 'should compile with ' + name).to.have.lengthOf(0);
            }).valueSeq()
        );
    });

    it('should received correct amount of validation errors.', async () => {
        const result = await verifyTemplate('errorTemplate.json');
        expect(result.length).to.be.equal(9);
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

    async function readSchemaAndPassAllValidations(fileName : string) {
        const result = await verifyTemplate(fileName);
        expect(result).to.have.lengthOf(0);
    }

    function verifyTemplate(fileName : string) : Promise<IValidationInfo[]> {
        const data = fs.readFileSync(`src/__tests__/templates/${fileName}`, 'utf8');
        return validator.validate(JSON.parse(data));
    }
});
