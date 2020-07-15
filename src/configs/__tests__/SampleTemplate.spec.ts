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
import {
    getSampleTemplate,
    getSampleTemplates,
    getDefaultAplDocument,
    ISampleTemplate,
    SampleTemplateName
} from '../SampleTemplate';

describe('SampleTemplate', () => {
    it('should sample templates has contents.', () => {
        expect(getSampleTemplates().size).to.not.be.equal(0);
    });

    it('should sample template with specific name has contents.', () => {
        const template : ISampleTemplate = getSampleTemplate(SampleTemplateName.IMAGE_DISPLAY_SAMPLE);
        expect(template.apl).to.be.an('object');
        expect(template.data).to.be.an('object');
    });

    it('should default document has contents.', () => {
        const apl : object = getDefaultAplDocument();
        expect(apl).to.be.an('object');
    });
});
