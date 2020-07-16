
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
 * Error levels supported by the renderer
 * @export
 * @enum {string}
 */
export enum ErrorLevels {
    ERROR = 'ERROR',
    WARN = 'WARNING'
}

/**
 * Error types supported by the renderer
 * @export
 * @enum {string}
 */
export enum ErrorTypes {
    RUNTIME = 'RUNTIME',
    VALIDATION = 'VALIDATION'
}

/**
 * Cursor position of error in APML.
 * @export
 * @interface ICursorPosition
 */
export interface ICursorPosition {
    row : number;
    column : number;
}

/**
 * @export
 * @interface IError
 */
export interface IError {
    level : ErrorLevels;
    type : ErrorTypes;
    code : string;
}

/**
 * Runtime Error Interface.
 * A runtime error is a generic error from the renderer that does
 * not reference a specific property or point in the APML template.
 * @export
 * @interface IRuntimeError
 * @extends {IError}
 */
export interface IRuntimeError extends IError {
    level : ErrorLevels.ERROR;
    type : ErrorTypes.RUNTIME;
}

/**
 * Validation Error Interface.
 * A validation error is an error specific to the APML template and can be
 * accompanied by a cursor position or message placeholders.
 * Note: Validation errors have not yet been implemented. Validation errors
 *       will always have a cursor position as they relate to the APML document.
 * @export
 * @interface IValidationError
 * @extends {IError}
 */
export interface IValidationError extends IError {
    level : ErrorLevels;
    type : ErrorTypes.VALIDATION;
    placeholders? : object;
}

/**
 * A renderer error is either a runtime or validation error.
 */
export type IRendererError = IRuntimeError | IValidationError;
