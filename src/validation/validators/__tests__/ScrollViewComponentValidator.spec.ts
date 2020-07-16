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

'use strict';

import { expect } from 'chai';
import { ValidationSeed, Seed } from '../../ValidationSeed';
import { ScrollViewComponentValidator } from '../ScrollViewComponentValidator';

describe('ScrollViewComponentValidator', () => {
    let scrollViewComponentValidator : ScrollViewComponentValidator;

    beforeEach(() => {
        scrollViewComponentValidator = new ScrollViewComponentValidator();
    });

    it('should report if child has relative height.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            height : '70%'
        }, '/path/to/parent/items/0'),
        new Seed(
            {
                type : 'ScrollView'
            })
        );
        const results = scrollViewComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/height');
    });

    it('should not report if child height is absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            height : '100px'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'ScrollView'
        })
        );
        const results = scrollViewComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if height is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'ScrollView',
            height : 'auto'
        }, '/path/to/parent'));
        const results = scrollViewComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/height');
    });

    it('should not report if height is absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'ScrollView',
            height : '100px'
        }, '/path/to/parent'));
        const results = scrollViewComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

});
