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
import { ComponentValidator } from '../ComponentValidator';

describe('ComponentValidator', () => {
    let componentValidator : ComponentValidator;

    beforeEach(() => {
        componentValidator = new ComponentValidator();
    });

    it('should report if height is auto, paddding* is not absolute and width must not be relative.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'AnyComponent',
            height : 'auto',
            width : '${variable}',
            paddingLeft : 'auto',
            paddingRight : '100%',
            paddingTop : '100%',
            paddingBottom : '100%',
            minWidth : 'auto',
            maxWidth : 'auto',
            minHeight : 'auto',
            maxHeight : 'auto'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'AnyComponent',
            height : '${heightVariable}',
            width : '100%'
        })
        );
        const results = componentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(8);
    });

    it('should report if height is not defined.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'AnyComponent',
            width : '100%',
            height : '100%'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'AnyComponent'
        })
        );
        const results = componentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(2);
    });

    it('should not report.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            top : '100px',
            left : '${leftVariable}',
            bottom : '${bottomVariable}',
            right : '100%',
            height : '100px'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Container',
            paddingLeft : '100px',
            paddingRight : '100dp',
            paddingTop : 100,
            paddingBottom : '50px',
            minWidth : 'auto',
            maxWidth : 'auto',
            minHeight : 100,
            maxHeight : '50dp'
        })
        );
        const results = componentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });
});
