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
import { ILoadedResult } from '../PackageLoader';
import * as sinon from 'sinon';
import { IMPORT_LAYOUT_TEMPLATE_10, IMPORT_LAYOUT_TEMPLATE_13 } from './template_test_cases/importInternalTemplate';
import { getSampleTemplate, SampleTemplateName } from '../../configs';
import { ThirdPartyComponentLoader } from '../ThirdPartyComponentsLoader';

describe('CustomComponentsExtractor tests', () => {
    let stub;
    const customComponentsExtractor = CustomComponentsExtractor.getInstance();

    afterEach(() => {
        stub.restore();
    });

    it('should extract all including imported components', async () => {
        stubAlexaLayout(IMPORT_LAYOUT_TEMPLATE_13);
        const apl = getSampleTemplate(SampleTemplateName.TEXT_LIST).apl;
        const componentsWithoutMainTemplate = await customComponentsExtractor.extractCustomComponents(apl);
        expect(componentsWithoutMainTemplate.getCustomComponentNames()).to.have.lengthOf(2);
        expect(Object.keys(componentsWithoutMainTemplate.getCustomComponentJsonSchema('AlexaHeader').properties)).
        to.have.lengthOf(10);
    });

    it('should get all including imported component types for APL 1.0', async () => {
        await extractComponents(IMPORT_LAYOUT_TEMPLATE_10, 5);
    });

    it('should get all including imported component types which are exported for APL 1.3+', async () => {
        await extractComponents(IMPORT_LAYOUT_TEMPLATE_13, 2);
    });

    const extractComponents = async (json, expectedNumberOfComponents) => {
        stubAlexaLayout(json);
        const apl = getSampleTemplate(SampleTemplateName.TEXT_LIST).apl;
        const componentTypesWithoutMainTemplate = await customComponentsExtractor
            .getCustomComponentTypesAndValidate(apl);
        expect(componentTypesWithoutMainTemplate).to.have.lengthOf(expectedNumberOfComponents);
    };

    const stubAlexaLayout = (json) => {
        stub = sinon.stub(ThirdPartyComponentLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json,
                justLoaded : true,
                name : 'alexa-layouts'
            } as ILoadedResult]);
        }));
    };
});
