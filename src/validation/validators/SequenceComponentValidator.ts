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
import { ValidationSeed, Seed } from '../ValidationSeed';
import { IValidationInfo } from '../../IValidationInfo';
import { NotAutoRule } from '../rules/NotAutoRule';
import { NotRelativeRule } from '../rules/NotRelativeRule';
import { AbsoluteDimensionRule } from '../rules/AbsoluteDimensionRule';
/**
 * SequenceComponentValidator.
 * @export
 * @class SequenceComponentValidator
 */
export class SequenceComponentValidator implements IValidator {
    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        const results = [];

        const seedComponent = validationSeed.getSeedComponent();
        const seedComponentCheck = this.getCheck(seedComponent);
        if (seedComponent.getValue('type') === 'Sequence' && seedComponentCheck.shouldCheck) {
            NotAutoRule.applyRule(seedComponent, seedComponentCheck.valueToCheck, results);
        }

        if (!validationSeed.getParentComponet() || validationSeed.getParentComponet().getValue('type') !== 'Sequence') {
            return results;
        }

        const parentComponet = validationSeed.getParentComponet();
        const childComponentCheck = this.getCheck(parentComponet);
        if (childComponentCheck.shouldCheck) {
            const valueToCheck = childComponentCheck.valueToCheck;
            NotRelativeRule.applyRule(seedComponent, valueToCheck, results, 'Sequence child ' + valueToCheck);
            AbsoluteDimensionRule.applyRule(seedComponent, 'spacing', results, 'Sequence child spacing');
        }

        return results;
    }

    private getCheck(seedComponent : Seed) : { shouldCheck : boolean, valueToCheck? : string } {
        // Default scrollDirection is vertical.
        if (!seedComponent.getValue('scrollDirection') || seedComponent.getValue('scrollDirection') === 'vertical') {
            return { shouldCheck: true, valueToCheck: 'height' };
        } else if (seedComponent.getValue('scrollDirection') === 'horizontal') {
            return { shouldCheck: true, valueToCheck: 'width' };
        }

        return { shouldCheck: false };
    }
}
