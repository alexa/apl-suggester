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

import { ErrorDefinitions } from './IErrorDefinitions';
import { IError, IValidationError, IRuntimeError } from './IError';
import { IErrorInterface } from './IErrorInterface';

/**
 * ErrorController is used to control the errors in the renderer, and react when they occur.
 */
export class ErrorController {

    /**
     * Local instance of ErrorController. This is so that the same instance
     * is always returned.
     * @private
     * @static
     * @type {ErrorController}
     * @memberOf ErrorController
     */
    private static instance : ErrorController;

    /**
     * Maintain a mapping code=>error
     * @private
     * @type {Map<string, IError>}
     * @memberOf CommandController
     */
    private errorMap : Map<string, IError> = new Map<string, IError>();

    /**
     * Interface used to process renderer errors.
     * @private
     * @type {IErrors}
     * @memberof ErrorController
     */
    private errorInterface : IErrorInterface;

    /**
     * A set containing all affected path.
     */
    private existingAffectedElementPathSet : Set<string>;
    /**
     * Creates an instance of ErrorController.
     * @param {IErrors} errorInterface
     * @memberof ErrorController
     */
    private constructor(errorInterface : IErrorInterface) {
        this.errorInterface = errorInterface;
        this.existingAffectedElementPathSet = new Set<string>();
    }

    /**
     * Clear all existing validation warn.
     *
     * @memberof ErrorController
     */
    public clearExistingWarn() {
        this.existingAffectedElementPathSet = new Set<string>();
    }
    /**
     * Used to register an error
     * @param {string} id
     * @param {IError} error
     * @memberOf CommandController
     */
    private registerError(error : IError) {
        this.errorMap.set(error.code, error);
    }

    /**
     * Register all renderer specific errors
     * @memberOf CommandController
     */
    public registerErrors() {
        Object.keys(ErrorDefinitions).forEach((key) => this.registerError(ErrorDefinitions[key]));
    }

    /**
     * Triggers a runtime error.
     * @param {string} code
     * @returns
     * @memberOf ErrorController
     */
    public triggerRuntimeError(code : string) {
        const error = this.errorMap.get(code) as IRuntimeError;
        if (!error) {
            return;
        }

        this.errorInterface.sendError(error);
    }

    /**
     * Triggers a validation error.
     * @param {string} code
     * @param {object} position
     * @param {object} [placeholders={}]
     * @memberOf ErrorController
     */
    public triggerValidationError(code : string, placeholders : object = {}) {
        const error = this.errorMap.get(code) as IValidationError;
        if (!error) {
            return;
        }

        // ToDo: implement position when we have the ability
        error.placeholders = placeholders;
        this.errorInterface.sendError(error);
    }

    public sendValidationError(validationError : IValidationError) {
        const path = validationError.placeholders['path'];
        if (this.existingAffectedElementPathSet.has(path)) {
            return;
        }
        this.existingAffectedElementPathSet.add(path);
        this.errorInterface.sendError(validationError);
    }

    /**
     * Sets instance to new ErrorController with supplied interface.
     * @static
     * @param {IErrorInterface} callback
     * @memberOf ErrorController
     */
    public setErrorInterface(errorInterface : IErrorInterface) : void {
        this.errorInterface = errorInterface;
    }

    /**
     * Returns an instance of the ErrorController.
     * @static
     * @returns {ErrorController}
     * @memberOf ErrorController
     */
    public static getInstance() : ErrorController {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ErrorController(new DefaultErrorInterface());
        return this.instance;
    }
}

class DefaultErrorInterface implements IErrorInterface {
    public sendError(error : IError) : void {}
}
