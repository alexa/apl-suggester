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
import { NotRelativeRule } from '../NotRelativeRule';
import { IValidationInfo } from '../../../IValidationInfo';
import { Seed } from '../../ValidationSeed';

describe('NotRelativeRule', () => {
    it('should parse auto value out.', () => {
        const results : IValidationInfo[] = [];
        NotRelativeRule.applyRule(new Seed({
            width : '70%'
        }, '/root'), 'width', results);
        NotRelativeRule.applyRule(new Seed({
            width : '70'
        }, '/root'), 'width', results);
        expect(results.length).to.be.equal(1);
        expect(results[0].path).to.be.equal('/root/width');
    });
});
