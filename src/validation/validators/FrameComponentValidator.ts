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

import { IValidator } from '../IValidator';
import { ValidationSeed } from '../ValidationSeed';
import { IValidationInfo } from '../../IValidationInfo';
import { AbsoluteDimensionRule } from '../rules/AbsoluteDimensionRule';
/**
 * Validator to validate Frame component.
 * @export
 * @class FrameComponentValidator
 */
export class FrameComponentValidator implements IValidator {
    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        if (validationSeed.getSeedComponent().getValue('type') !== 'Frame') {
            return [];
        }

        const results = [];
        const seedComponent = validationSeed.getSeedComponent();
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderRadius', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderBottomLeftRadius', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderBottomRightRadius', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderTopLeftRadius', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderTopRightRadius', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'borderWidth', results);
        return results;
    }
}
