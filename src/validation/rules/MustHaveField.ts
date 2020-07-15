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
 * Check whether have a specific field.
 * @export
 * @class MustHaveField
 */
export class MustHaveField {
    /**
     * Entrance method to apply the rule.
     * @param sourceObject object to parse.
     * @param collectors used to collect all validation info.
     * @param keys
     */
    public static applyRule(sourceObject : Seed, keys : string[], collectors : IValidationInfo[]) : void {
        let missingFields : string[] = [];
        for (let key of keys) {
            if (!sourceObject.getValue(key)) {
                missingFields.push(key);
            }
        }
        const jsonPath = sourceObject.getJsonPath();
        const type = sourceObject.getValue('type');
        if (missingFields.length > 0) {
            collectors.push({
                path : jsonPath,
                errorMessage :
`${type} width and height must be defined. If the value is not defined, then default value is set to 100px.`,
                level : NotificationLevel.WARN
            });
        }
    }
}
