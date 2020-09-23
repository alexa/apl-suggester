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
import { CustomComponentsExtractor } from '../CustomComponentsExtractor';
import { PackageLoader, ILoadedResult } from '../PackageLoader';
import * as sinon from 'sinon';
import { IMPORT_LAYOUT_TEMPLATE } from './template_test_cases/importInternalTemplate';
import { getSampleTemplate, SampleTemplateName } from '../../configs';

describe('CustomComponentsExtractor tests', () => {
    let stub;
    const customComponentsExtractor = CustomComponentsExtractor.getInstance();

    beforeEach(() => {
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

    it('should extract all including imported components', async () => {
        const apl = getSampleTemplate(SampleTemplateName.TEXT_FORWARD_LIST_SAMPLE).apl;
        const componentsWithoutMainTemplate = await customComponentsExtractor.extractCustomComponents(apl);
        expect(componentsWithoutMainTemplate.getCustomComponentNames()).to.have.lengthOf(2);
        expect(Object.keys(componentsWithoutMainTemplate.getCustomComponentJsonSchema('AlexaHeader').properties)).
        to.have.lengthOf(10);
    });

    it('should get all including imported component types as well', async () => {
        const apl = getSampleTemplate(SampleTemplateName.TEXT_FORWARD_LIST_SAMPLE).apl;
        const componentTypesWithoutMainTemplate = await customComponentsExtractor
        .getCustomComponentTypesAndValidate(apl);
        expect(componentTypesWithoutMainTemplate).to.have.lengthOf(5);
    });
});
