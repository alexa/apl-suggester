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
 * Validation information.
 * @export
 * @class IValidationInfo
 */
export interface IValidationInfo {
    /**
     * json path.
     */
    path : string;
    /**
     * error message.
     */
    errorMessage : string;
    /**
     * notification level.
     */
    level? : NotificationLevel;
    /**
     * message with link.
     */
    errorMessageWithLink? : string;
    /**
     * message link values.
     */
    errorMessageLinkValues? : IMessageLinkValue[];
}

export enum NotificationLevel {
    ERROR = 'ERROR',
    WARN = 'WARNING'
}

export interface IMessageLinkValue {
    linkId : string;
    linkText : string;
    linkUrl : string;
}
