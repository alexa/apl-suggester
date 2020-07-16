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
import { ValidationSeed, Seed } from '../ValidationSeed';
import { IValidationInfo } from '../../IValidationInfo';
import { NotAutoRule } from '../rules/NotAutoRule';
import { NotRelativeRule } from '../rules/NotRelativeRule';
/**
 * ScrollViewComponentValidator.
 * @export
 * @class ScrollViewComponentValidator
 */
export class ScrollViewComponentValidator implements IValidator {
    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        const results = [];

        const seedComponent = validationSeed.getSeedComponent();
        if (seedComponent.getValue('type') === 'ScrollView') {
            NotAutoRule.applyRule(seedComponent, 'height', results);
        }

        if (!validationSeed.getParentComponet()
        || validationSeed.getParentComponet().getValue('type') !== 'ScrollView') {
            return results;
        }

        const errorMessage = `ScrollView child ${seedComponent.getValue('type')}`;
        NotRelativeRule.applyRule(seedComponent, 'height', results, errorMessage);
        return results;
    }
}
