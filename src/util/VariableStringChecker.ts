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

/**
 * Util method to check whether the string is defined as a variable.
 * @export
 */
export function containsVariableString(actualValue : string) : boolean {
    return actualValue.startsWith('@') || isVariableADataBindingExpression(actualValue);
}

/**
 * Check if the string is a data binding expression
 * @param actualValue
 */
function isVariableADataBindingExpression(actualValue : string) {
    return /.*\${.+}.*/.test(actualValue);
}
