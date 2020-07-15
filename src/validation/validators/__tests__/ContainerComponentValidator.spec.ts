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
import { ContainerComponentValidator } from '../ContainerComponentValidator';

describe('ContainerComponentValidator', () => {
    let containerComponentValidator : ContainerComponentValidator;

    beforeEach(() => {
        containerComponentValidator = new ContainerComponentValidator();
    });

    it('should report if child fields is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'AnyComponent',
            top : 'auto',
            left : 'auto',
            bottom : 'auto',
            right : 'auto'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Container',
            height : 'auto',
            letterSpacing : '100%'
        })
        );
        const results = containerComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(4);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/top');
        expect(results[1].path).to.be.equal('/path/to/parent/items/0/left');
        expect(results[2].path).to.be.equal('/path/to/parent/items/0/bottom');
        expect(results[3].path).to.be.equal('/path/to/parent/items/0/right');
    });

    it('should not report if top, left, bottom, right are absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            top : '100px',
            left : '78%',
            bottom : '100dp',
            right : '100%',
            height : '100px'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Container',
            height : '100px',
            letterSpacing : '100dp'
        })
        );
        const results = containerComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if spacing in child is not absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'AnyComponent',
            spacing : 'auto'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Container',
            height : 'auto',
            letterSpacing : '100%'
        })
        );
        const results = containerComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/spacing');
    });
});
