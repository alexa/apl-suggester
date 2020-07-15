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

/**
 * Util method to check whether the string is defined as a variable.
 * @export
 */
export function isVariableString(actualValue : string) : boolean {
    return actualValue.startsWith('@') || isVariableStartingWithDollarSign(actualValue);
}

const VALID_DIMENSION_SET = new Set(['vw', 'dp', 'vh', 'px', '%']);

function isVariableStartingWithDollarSign(actualValue : string) {
    if (!actualValue.startsWith('${')) {
        return false;
    }
    const rightBraceIndex = actualValue.indexOf('}');
    if (rightBraceIndex < 0) {
        return false;
    }
    if (rightBraceIndex === actualValue.length - 1) {
        return true;
    }
    return VALID_DIMENSION_SET.has(actualValue.substring(rightBraceIndex + 1));
}
