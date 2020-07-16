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
import { SequenceComponentValidator } from '../SequenceComponentValidator';

describe('SequenceComponentValidator', () => {
    let sequenceComponentValidator : SequenceComponentValidator;

    beforeEach(() => {
        sequenceComponentValidator = new SequenceComponentValidator();
    });

    it('should report if parent scroll direction is missing, child height is relative.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            height : '70%'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Sequence',
            letterSpacing : '100%'
        })
        );
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/height');
    });

    it('should report if parent scroll direction is vertical, child height is relative.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            height : '70%'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Sequence',
            scrollDirection : 'vertical',
            letterSpacing : '100%'
        })
        );
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/height');
    });

    it('should report if parent scroll direction is horizontal, child width is relative.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            width : '100%'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Sequence',
            width : 'auto',
            scrollDirection : 'horizontal',
            letterSpacing : '100dp'
        })
        );
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/items/0/width');
    });

    it('should not report if parent scroll direction is horizontal, child width is absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Container',
            width : '100px'
        }, '/path/to/parent/items/0'),
        new Seed({
            type : 'Sequence',
            scrollDirection : 'horizontal',
            letterSpacing : '100dp'
        })
        );
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if height is auto, scroll direction is missing.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Sequence',
            height : 'auto'
        }, '/path/to/parent'));
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/height');
    });

    it('should report if height is auto, scroll direction is vertical.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Sequence',
            scrollDirection : 'vertical',
            height : 'auto'
        }, '/path/to/parent'));
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/height');
    });

    it('should report if width is auto, scroll direction is horizontal.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Sequence',
            scrollDirection : 'horizontal',
            width : 'auto'
        }, '/path/to/parent'));
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/width');
    });

    it('should not report if height is absolute, scroll direction is vertical.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Sequence',
            scrollDirection : 'vertical',
            height : '100px'
        }, '/path/to/parent'));
        const results = sequenceComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });
});
