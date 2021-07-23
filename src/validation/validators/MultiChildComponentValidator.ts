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

import { IValidator } from '../IValidator';
import { Seed, ValidationSeed } from '../ValidationSeed';
import { IValidationInfo, NotificationLevel } from '../../IValidationInfo';

/**
 * MultiChildComponentValidator.
 * @export
 * @class MultiChildComponentValidator.
 */
export class MultiChildComponentValidator implements IValidator {
    private TYPE_STRING = 'type';
    private DATA_STRING = 'data';
    private multiChildComponentTypes = ['Container', 'GridSequence', 'Pager', 'Sequence'];
    /**
     * Validate given object.
     * @param validationSeed seed to validate.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        const parentComponent : Seed = validationSeed.getParentComponet();
        // check if parent component is multiChild component
        if (!this.multiChildComponentTypes.includes(parentComponent.getValue(this.TYPE_STRING))) {
            return [];
        }

        let validationResults : IValidationInfo[] = [];
        const seedComponent : Seed = validationSeed.getSeedComponent();
        const seedComponentPath : string = seedComponent.getJsonPath();

        // check if parent component have 'data' property && current component is the second item
        const itemJsonPathRegEx = /.*\/(item|items)\/1\/?$/;
        if (!!parentComponent.getValue(this.DATA_STRING) && itemJsonPathRegEx.test(seedComponentPath)) {
            validationResults.push({
                path: seedComponentPath,
                errorMessage: 'This component might not be displayed because the parent component uses data array.',
                level: NotificationLevel.WARN,
                errorMessageWithLink: 'This component might not be displayed because the parent component uses data array. Learn more about {dataArrayLink}.',
                errorMessageLinkValues: [{
                    linkId: 'dataArrayLink',
                    linkText: 'data array and conditional inflation',
                    linkUrl: 'https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-conditional-component-inflation.html#data-array'
                }]
            });
        }
        return validationResults;
    }
}
