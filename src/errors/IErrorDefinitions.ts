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

import { IError, IRuntimeError, IValidationError } from './IError';
import { ErrorLevels, ErrorTypes } from './IError';

/**
 * Interface for errors thrown by the renderer
 * @export
 * @interface IErrors
 */
export interface IErrorDefinitions {
    [propName : string] : IError;
}

/**
 * Error Codes:
 * -1050 - The inputted template cannot be null.
 * -1100 - Unable to multiply dimension
 */
export const COMPONENT_BUILDER_NO_TEMPLATE : IRuntimeError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.RUNTIME,
    code: '-1050'
};

export const GENERAL_VALIDATION_WARN : IValidationError = {
    level: ErrorLevels.WARN,
    type: ErrorTypes.VALIDATION,
    code: '-4002'
};

export const COMPONENT_BUILDER_ITEM_AND_ITEMS : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1051'
};

export const COMPONENT_BUILDER_UNABLE_TO_FIND_TYPE : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1052'
};

export const UNIT_UTILS_CANNOT_MULTIPLY_DIMENSION : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1100'
};

export const META_TEMPLATE_UNABLE_TO_FIND_LAYOUT : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1150'
};

export const META_TEMPLATE_INVALID_LAYOUT_NAME : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1151'
};

export const PACKAGE_LOADER_CANNOT_FETCH_URL : IValidationError = {
    level: ErrorLevels.ERROR,
    type: ErrorTypes.VALIDATION,
    code: '-1200'
};

/**
 * All errors thrown by the renderer
 */
export const ErrorDefinitions : IErrorDefinitions = {
    GENERAL_VALIDATION_WARN,

    COMPONENT_BUILDER_NO_TEMPLATE,
    COMPONENT_BUILDER_ITEM_AND_ITEMS,
    COMPONENT_BUILDER_UNABLE_TO_FIND_TYPE,

    UNIT_UTILS_CANNOT_MULTIPLY_DIMENSION,

    META_TEMPLATE_UNABLE_TO_FIND_LAYOUT,
    META_TEMPLATE_INVALID_LAYOUT_NAME,

    PACKAGE_LOADER_CANNOT_FETCH_URL
};
