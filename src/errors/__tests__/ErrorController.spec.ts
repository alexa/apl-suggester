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

// tslint:disable:no-unused-expression

import * as sinon from 'sinon';
import { expect } from 'chai';

import { ErrorController } from '../ErrorController';
import * as Errors from '../IErrorDefinitions';

import { ErrorLevels, ErrorTypes } from '../IError';
import { IErrorDefinitions } from '../IErrorDefinitions';
import { IErrorInterface } from '../IErrorInterface';
import { IValidationError } from '../IError';

/**
 * Create an empty callback to send to ErrorController.
 * We spy this to ensure callbacks are fired correctly.
 */
const createErrorCallback = () : IErrorInterface => ({
    sendError: ((error) => {})
});

// Mocked errors that are registered in renderer
const MOCK_ERRORS : IErrorDefinitions = {
    MOCKED_RUNTIME_ERROR: {
        level: ErrorLevels.ERROR,
        type: ErrorTypes.RUNTIME,
        code: '0'
    },
    MOCKED_VALIDATION_ERROR: {
        level: ErrorLevels.ERROR,
        type: ErrorTypes.VALIDATION,
        code: '1'
    }
};

// An error code not in MOCK_ERRORS object
const MOCKED_ERROR_CODE_DOESNT_EXIST = '-999999';

describe('ErrorController', () => {
    let sandbox;
    let errorController;
    let errorCallback;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        errorCallback = createErrorCallback();
        errorController = ErrorController.getInstance();
        errorController.setErrorInterface(errorCallback);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('Runtime Errors', () => {
        it('Can register and trigger runtime errors.', () => {
            const callbackSpy = sandbox.spy(errorCallback, 'sendError');
            sandbox.stub(Errors, 'ErrorDefinitions', MOCK_ERRORS);
            errorController.registerErrors();
            errorController.triggerRuntimeError(MOCK_ERRORS.MOCKED_RUNTIME_ERROR.code);
            expect(callbackSpy.calledWith(MOCK_ERRORS.MOCKED_RUNTIME_ERROR)).to.be.true;
        });
        it('Does not trigger a runtime error that hasnt been registered', () => {
            const callbackSpy = sandbox.spy(errorCallback, 'sendError');
            sandbox.stub(Errors, 'ErrorDefinitions', MOCK_ERRORS);
            errorController.registerErrors();
            errorController.triggerRuntimeError(MOCKED_ERROR_CODE_DOESNT_EXIST);
            expect(callbackSpy.calledOnce).to.be.false;
        });
    });
    describe('Validation Errors', () => {
        it('Can register and trigger validation errors', () => {
            const callbackSpy = sandbox.spy(errorCallback, 'sendError');
            sandbox.stub(Errors, 'ErrorDefinitions', MOCK_ERRORS);
            errorController.registerErrors();
            errorController.triggerValidationError(MOCK_ERRORS.MOCKED_VALIDATION_ERROR.code);
            expect(callbackSpy.calledWith(MOCK_ERRORS.MOCKED_VALIDATION_ERROR)).to.be.true;
        });
        it('Can register and trigger validation errors with placeholders', () => {
            const callbackSpy = sandbox.spy(errorCallback, 'sendError');
            sandbox.stub(Errors, 'ErrorDefinitions', MOCK_ERRORS);
            errorController.registerErrors();

            const placeholders = { key: 'test' };
            let expectedResult = MOCK_ERRORS.MOCKED_VALIDATION_ERROR as IValidationError;
            expectedResult.placeholders = placeholders;
            errorController.triggerValidationError(MOCK_ERRORS.MOCKED_VALIDATION_ERROR.code, placeholders);
            expect(callbackSpy.calledWith(expectedResult)).to.be.true;
        });
    });
});
