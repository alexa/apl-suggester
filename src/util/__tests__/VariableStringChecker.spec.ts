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

import { expect } from 'chai';
import { isVariableString } from '../VariableStringChecker';

describe('VariableStringChecker.', () => {
    it('should evaluate variable string correctly.', () => {
        expect(isVariableString('@1234')).to.be.equal(true);
        expect(isVariableString('${1234}')).to.be.equal(true);
        expect(isVariableString('123')).to.be.equal(false);
        expect(isVariableString('${123}vw')).to.be.equal(true);
        expect(isVariableString('${123}vh')).to.be.equal(true);
        expect(isVariableString('${123}dp')).to.be.equal(true);
        expect(isVariableString('${123}px')).to.be.equal(true);
        expect(isVariableString('${123}%')).to.be.equal(true);
        expect(isVariableString('${viewport.theme == \'dark\'}')).to.be.equal(true);
    });
});
