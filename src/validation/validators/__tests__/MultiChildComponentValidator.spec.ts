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
import { MultiChildComponentValidator } from '../MultiChildComponentValidator';

describe('MultiChildComponentValidator', () => {
    let multiChildComponentValidator : MultiChildComponentValidator;

    beforeEach(() => {
        multiChildComponentValidator = new MultiChildComponentValidator();
    });

    it('should not report if parent is not multiChild component', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/1'),
            new Seed({
                type : 'Text',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should not report if parent is multiChild component but no live data', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/1'),
            new Seed({
                type : 'Container',
                item : []
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should not report if parent is multiChild component but seed is not the second child item', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/3'),
            new Seed({
                type : 'Container',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should not report if parent is multiChild component but seed is first child item', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/0'),
            new Seed({
                type : 'Container',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if parent is multiChild component with live data - item', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/item/1'),
            new Seed({
                type : 'Container',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/item/1');
    });

    it('should report if type is multiChild component with live data - items', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/1'),
            new Seed({
                type : 'GridSequence',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/1');
    });

    it('should report if type is multiChild component with live data - Sequence', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/items/1'),
            new Seed({
                type : 'Sequence',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/1');
    });

    it('should report if type is multiChild component with live data - Pager', () => {
        const seedComponent = new ValidationSeed(
            new Seed({type : 'Text'}, '/path/to/parent/item/1'),
            new Seed({
                type : 'Pager',
                item : [],
                data : {}
            }, '/path/to/parent')
        );
        const results = multiChildComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/item/1');
    });
});
