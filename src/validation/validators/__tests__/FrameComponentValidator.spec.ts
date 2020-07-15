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
import { FrameComponentValidator } from '../FrameComponentValidator';
import { ValidationSeed, Seed } from '../../ValidationSeed';

describe('FrameComponentValidator', () => {
    let frameComponentValidator : FrameComponentValidator;

    beforeEach(() => {
        frameComponentValidator = new FrameComponentValidator();
    });

    it('should report if borderRadius etc is not absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Frame',
            borderRadius : '100%',
            borderBottomLeftRadius : '100%',
            borderBottomRightRadius : 'auto',
            borderTopLeftRadius : '100%',
            borderTopRightRadius : '100%',
            borderWidth : '100%'
        }, '/path/to/parent'));
        const results = frameComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(6);
    });

    it('should not report if all of fields are abosolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Frame',
            borderRadius : '100px',
            borderBottomLeftRadius : '100dp',
            borderBottomRightRadius : '100vw',
            borderTopLeftRadius : '100vh',
            borderTopRightRadius : '100px',
            borderWidth : '100dp'
        }, '/path/to/parent'));
        const results = frameComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });
});
