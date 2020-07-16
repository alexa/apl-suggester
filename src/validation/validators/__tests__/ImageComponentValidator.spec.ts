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
import { ImageComponentValidator } from '../ImageComponentValidator';
import { ValidationSeed, Seed } from '../../ValidationSeed';

describe('ImageComponentValidator', () => {
    let imageComponentValidator : ImageComponentValidator;

    beforeEach(() => {
        imageComponentValidator = new ImageComponentValidator();
    });

    it('should ignore if type is not Image.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Other',
            width : 'auto'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if width is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            width : 'auto',
            height : '100px'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('width')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent/width');
    });

    it('should report if height is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            width : '100px',
            height : 'auto'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/height');
    });

    it('should report if both height and width are auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            height : 'auto',
            width : 'auto'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(2);
    });

    it('should not report if borderRadius is not absolute.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            width : '100px',
            height : '100px',
            borderRadius : '100%'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/borderRadius');
    });

    it('should not report if none of height and width is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            height : '100px',
            width : '100%'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if height is not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            width : '100px'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('height')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent');
    });

    it('should report if width is not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image',
            height : '100px'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('width')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent');
    });

    it('should report if width and height are not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Image'
        }, '/path/to/parent'));
        const results = imageComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('height')).to.be.greaterThan(-1);
        expect(results[0].errorMessage.indexOf('width')).to.be.greaterThan(-1);
    });
});
