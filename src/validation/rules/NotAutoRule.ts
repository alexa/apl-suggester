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

import { IValidationInfo, NotificationLevel } from '../../IValidationInfo';
import { Seed } from '../ValidationSeed';

/**
 * Check whether value is absolute or relative value.
 * @export
 * @class NotAutoRule
 */
export class NotAutoRule {
    /**
     * Entrance method to apply the rule.
     * @param sourceObject object to parse.
     * @param key key to parse.
     * @param collectors used to collect all validation info.
     */
    public static applyRule(
        sourceObject : Seed, key : string, collectors : IValidationInfo[], context? : string) : void {
        const valueToCheck = sourceObject.getValue(key);
        if (valueToCheck === 'auto') {
            collectors.push({
                path : `${sourceObject.getJsonPath()}/${key}`,
                errorMessage : `${sourceObject.getValue('type')} ${key} must be an absolute or relative value.`,
                level : NotificationLevel.WARN
            });
        }
    }
}
