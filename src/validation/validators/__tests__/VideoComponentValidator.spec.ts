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
import { VideoComponentValidator } from '../VideoComponentValidator';
import { ValidationSeed, Seed } from '../../ValidationSeed';

describe('VideoComponentValidator', () => {
    let videoComponentValidator : VideoComponentValidator;

    beforeEach(() => {
        videoComponentValidator = new VideoComponentValidator();
    });

    it('should report if width is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            height : '100px',
            width : 'auto'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/path/to/parent/width');
    });

    it('should report if height is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            height : 'auto',
            width : '100px'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('height')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent/height');
    });

    it('should report if both height and width are auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            height : 'auto',
            width : 'auto'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(2);
    });

    it('should not report if none of height and width is auto.', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            height : '100px',
            width : '100%'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(0);
    });

    it('should report if height is not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            width : '100px'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('height')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent');
    });

    it('should report if width is not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video',
            height : '100px'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('width')).to.be.greaterThan(-1);
        expect(results[0].path).to.be.equal('/path/to/parent');
    });

    it('should report if width and height are not defined', () => {
        const seedComponent = new ValidationSeed(new Seed({
            type : 'Video'
        }, '/path/to/parent'));
        const results = videoComponentValidator.validate(seedComponent);
        expect(results.length).to.be.equal(1);
        expect(results[0].errorMessage.indexOf('height')).to.be.greaterThan(-1);
        expect(results[0].errorMessage.indexOf('width')).to.be.greaterThan(-1);
    });
});
