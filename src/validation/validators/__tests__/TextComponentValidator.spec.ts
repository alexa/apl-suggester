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

import { expect } from 'chai';
import { ValidationSeed, Seed } from '../../ValidationSeed';
import { TextComponentValidator } from '../TextComponetValidator';

describe('TextComponentValidator', () => {
    let textComponentValidator : TextComponentValidator;

    beforeEach(() => {
        textComponentValidator = new TextComponentValidator();
    });

    it('should report if fontSize and letterSpacing are not absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Text',
            fontSize : '100%',
            letterSpacing : '100%'
        }, '/path/to/parent'));
        const results = textComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(2);
    });

    it('should not report if all of fields are abosolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Text',
            fontSize : '100px',
            letterSpacing : '100dp'
        }, '/path/to/parent'));
        const results = textComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });
});
