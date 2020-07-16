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
import { NotAutoRule } from '../rules/NotAutoRule';
import { AbsoluteDimensionRule } from '../rules/AbsoluteDimensionRule';
import { NotRelativeRule } from '../rules/NotRelativeRule';
/**
 * ComponentValidator.
 * @export
 * @class ComponentValidator.
 */
export class ComponentValidator implements IValidator {
    private ROOT_COMPONENT_TYPE = 'mainTemplate';

    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        const results = [];
        const seedComponent = validationSeed.getSeedComponent();
        AbsoluteDimensionRule.applyRule(seedComponent, 'paddingLeft', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'paddingRight', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'paddingTop', results);
        AbsoluteDimensionRule.applyRule(seedComponent, 'paddingBottom', results);

        NotAutoRule.applyRule(seedComponent, 'minWidth', results);
        NotAutoRule.applyRule(seedComponent, 'maxWidth', results);
        NotAutoRule.applyRule(seedComponent, 'minHeight', results);
        NotAutoRule.applyRule(seedComponent, 'maxHeight', results);

        this.childNotRelativeWhenParentIsAuto(validationSeed, 'width', results);
        this.childNotRelativeWhenParentIsAuto(validationSeed, 'height', results);
        return results;
    }

    private childNotRelativeWhenParentIsAuto(
        validationSeed : ValidationSeed, fieldToCheck : string, collectors : IValidationInfo[]) {
        // If there is no parent compent or parent compent is root then no need to check.
        if (!validationSeed.getParentComponet()
        || validationSeed.getParentComponet().getValue('type') === this.ROOT_COMPONENT_TYPE) {
            return;
        }

        if (!validationSeed.getParentComponet().getValue(fieldToCheck)
        || validationSeed.getParentComponet().getValue(fieldToCheck) === 'auto') {
            const type = validationSeed.getSeedComponent().getValue('type');
            NotRelativeRule.applyRule(validationSeed.getSeedComponent(), fieldToCheck, collectors, '',
            `${type} ${fieldToCheck} must be an absolute value when the parent ${fieldToCheck} is set to auto.`);
        }
    }
}
