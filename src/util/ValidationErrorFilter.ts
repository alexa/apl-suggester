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

import { containsVariableString } from './VariableStringChecker';

export class ValidationErrorFilter {
    private static userDefinedPropertyPrefix = '-user-';

    /**
     * Collapse oneOf fields. When using oneOf, AJV will return multiple errors (one more than the number
     * of required fields). This method collapses those errors into the root error and modifies the root
     * error message to list required fields.
     * @private
     * @param {object[]} errors
     * @returns {object[]}
     * @memberOf ValidationErrorFilter
     */
    private static collapseOneOfSchemaProperties(errors : object[]) : object[] {
        const oneOfSchemaPath = '#/oneOf';
        const oneOfRootError : any = errors.find((error : any) => error.schemaPath === oneOfSchemaPath);

        if (!oneOfRootError) {
            return errors;
        }

        // collapse oneOf fields and store missing properties for message creation.
        const oneOfSchemaSet = [];
        errors = errors.filter((error : any) => {
            if (!error.schemaPath.includes(oneOfSchemaPath)) {
                return true;
            }

            if (error.params.missingProperty) {
                oneOfSchemaSet.push(error.params.missingProperty);
            }
            return false;
        });

        // customize message
        oneOfRootError.message = `missing required field: ${oneOfSchemaSet.join(' or ')}`;
        errors = errors.concat(oneOfRootError);

        return errors;
    }
    /**
     * Filter errors pointing to the parent error node out, only need the leaf error node.
     * @public
     * @param {object[]} errors
     * @returns {object[]}
     * @memberof ValidationErrorFilter
     */
    public static filterErrors(errors : object[], singlePathFilter?) : object[] {
        errors = this.collapseOneOfSchemaProperties(errors);

        const errorPathSet = [];
        errors.forEach((element) => {
            errorPathSet.push(element['dataPath']);
        });
        const noChildrenPathArray = errors.filter((element, index, array) => {
            const dataPath = element['dataPath'];
            if (dataPath === '') { return true; }
            for (let eachPath of errorPathSet) {
                if (eachPath !== dataPath && this.isNodeOf(dataPath, eachPath)) {
                    return false;
                }
            }
            return true;
        });
        if (singlePathFilter) {
            return this.processErrors(singlePathFilter(noChildrenPathArray));
        }
        return this.processErrors(noChildrenPathArray);
    }

    /**
     * Filter out duplicated path if dataPath is empty ignore.
     * @static
     * @memberof ValidationErrorFilter
     */
    public static singleDataPathFilterNoRootPath = (noChildrenPathArray) => {
        const result = new Set<object>();
        return noChildrenPathArray.filter((item) => {
            if (item['dataPath'] === '') {
                return true;
            }
            if (!result.has(item['dataPath'])) {
                result.add(item['dataPath']);
                return true;
            }
            return false;
        });
    }

    /**
     * Filter out duplicated path.
     * @static
     * @memberof ValidationErrorFilter
     */
    public static singleDataPathFilter = (noChildrenPathArray) => {
        const result = new Set<object>();
        return noChildrenPathArray.filter((item) => {
            if (!result.has(item['dataPath'])) {
                result.add(item['dataPath']);
                return true;
            }
            return false;
        });
    }

    /**
     * Filter the errors out if the value defined as a variable.
     * @private
     * @param {object[]} errors
     * @returns {object[]}
     * @memberof ValidationErrorFilter
     */
    private static processErrors(errors : object[]) : object[] {
        return errors.filter((eachError) => {
            const actualValue = eachError['data'];
            if (actualValue && typeof(actualValue) === 'string') {
                if (containsVariableString(actualValue)) {
                    return false;
                }
            }
            return true;
        });
    }

    private static isNodeOf(existingPath : string, pathToCheck : string) : boolean {
        return pathToCheck.indexOf(existingPath) >= 0;
    }

    public static userDefinedPropertyErrorFilter = (error : object) => {
        if (!error['params']
        || !error['params']['additionalProperty']
        || typeof error['params']['additionalProperty'] !== 'string') {
            return true;
        }

        const isUserDefinedPropertyError = error['params']['additionalProperty']
        .startsWith(ValidationErrorFilter.userDefinedPropertyPrefix);

        return !isUserDefinedPropertyError;
    }
}
