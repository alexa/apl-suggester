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

import { IValidator } from '../IValidator';
import { ValidationSeed } from '../ValidationSeed';
import { IValidationInfo } from '../../IValidationInfo';
import { AbsoluteDimensionRule } from '../rules/AbsoluteDimensionRule';
/**
 * TextComponentValidator.
 * @export
 * @class TextComponentValidator
 */
export class TextComponentValidator implements IValidator {
    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        if (validationSeed.getSeedComponent().getValue('type') !== 'Text') {
            return [];
        }

        const results = [];
        const seedComponent = validationSeed.getSeedComponent();
        AbsoluteDimensionRule.applyRule(seedComponent, 'fontSize', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'letterSpacing', results);
        return results;
    }
}
