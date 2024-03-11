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

import { IJsonSchema } from './assets/IJsonSchema';
import { IValidationInfo } from './validation';
import ajv from './util/Ajv';
import { StaticAplTemplateValidator } from './StaticAplTemplateValidator';
import { ValidationErrorFilter } from './util/ValidationErrorFilter';
import { NotificationLevel } from './IValidationInfo';
import * as AnimationItemCommandJSONSchema from './assets/commands/AnimationItemCommand';
import * as AutoPageCommandJSONSchema from './assets/commands/AutoPageCommand';
import * as ClearFocusCommandJSONSchema from './assets/commands/ClearFocusCommand';
import * as ControlMediaCommandJSONSchema from './assets/commands/ControlMediaCommand';
import * as IdleCommandJSONSchema from './assets/commands/IdleCommand';
import * as OpenURLCommandJSONSchema from './assets/commands/OpenURLCommand';
import * as ParallelCommandJSONSchema from './assets/commands/ParallelCommand';
import * as PlayMediaCommandJSONSchema from './assets/commands/PlayMediaCommand';
import * as ScrollCommandJSONSchema from './assets/commands/ScrollCommand';
import * as ScrollToComponentCommandJSONSchema from './assets/commands/ScrollToComponentCommand';
import * as ScrollToIndexCommandJSONSchema from './assets/commands/ScrollToIndexCommand';
import * as SendEventCommandJSONSchema from './assets/commands/SendEventCommand';
import * as SequentialCommandJSONSchema from './assets/commands/SequentialCommand';
import * as SetFocusCommandJSONSchema from './assets/commands/SetFocusCommand';
import * as SetPageCommandJSONSchema from './assets/commands/SetPageCommand';
import * as SetStateCommandJSONSchema from './assets/commands/SetStateCommand';
import * as SetValueCommandJSONSchema from './assets/commands/SetValueCommand';
import * as SpeakItemCommandJSONSchema from './assets/commands/SpeakItemCommand';
import * as SpeakListCommandJSONSchema from './assets/commands/SpeakListCommand';
import * as FinishCommandJSONSchema from './assets/commands/FinishCommand';
import * as SelectCommandJSONSchema from './assets/commands/SelectCommand';
import * as ReinflateCommandJSONSchema from './assets/commands/ReinflateCommand';
import * as InsertItemCommandJSONSchema from './assets/commands/InsertItemCommand';
import * as RemoveItemCommandJSONSchema from './assets/commands/RemoveItemCommand';
import * as LogCommandJSONSchema from './assets/commands/LogCommand';

/**
 * Entrance to validate commands.
 * @export
 * @class Validator
 */
export class CommandSchemaValidator {
    private static instance;
    /**
     * Creates an instance of CommandSchemaValidator.
     * @memberof CommandSchemaValidator
     */
    private constructor() {
    }

    /**
     * Singleton method.
     * @static
     * @returns {CommandSchemaValidator}
     * @memberof CommandSchemaValidator
     */
    public static getInstance() : CommandSchemaValidator {
        if (!this.instance) {
            this.instance = new CommandSchemaValidator();
        }
        return this.instance;
    }

    /**
     * All supported command type to json schema mapping.
     * @static
     * @memberof CommandSchemaValidator
     */
    public static COMMAND_TYPE_TO_JSON_SCHEMA = new Map<string, IJsonSchema>([
        ['AnimateItem', AnimationItemCommandJSONSchema.JSON_SCHEMA],
        ['AutoPage', AutoPageCommandJSONSchema.JSON_SCHEMA],
        ['ClearFocus', ClearFocusCommandJSONSchema.JSON_SCHEMA],
        ['ControlMedia', ControlMediaCommandJSONSchema.JSON_SCHEMA],
        ['Idle', IdleCommandJSONSchema.JSON_SCHEMA],
        ['OpenURL', OpenURLCommandJSONSchema.JSON_SCHEMA],
        ['Parallel', ParallelCommandJSONSchema.JSON_SCHEMA],
        ['PlayMedia', PlayMediaCommandJSONSchema.JSON_SCHEMA],
        ['Scroll', ScrollCommandJSONSchema.JSON_SCHEMA],
        ['ScrollToComponent', ScrollToComponentCommandJSONSchema.JSON_SCHEMA],
        ['ScrollToIndex', ScrollToIndexCommandJSONSchema.JSON_SCHEMA],
        ['SendEvent', SendEventCommandJSONSchema.JSON_SCHEMA],
        ['Sequential', SequentialCommandJSONSchema.JSON_SCHEMA],
        ['SetFocus', SetFocusCommandJSONSchema.JSON_SCHEMA],
        ['SetPage', SetPageCommandJSONSchema.JSON_SCHEMA],
        ['SetState', SetStateCommandJSONSchema.JSON_SCHEMA],
        ['SetValue', SetValueCommandJSONSchema.JSON_SCHEMA],
        ['SpeakItem', SpeakItemCommandJSONSchema.JSON_SCHEMA],
        ['SpeakList', SpeakListCommandJSONSchema.JSON_SCHEMA],
        ['Finish', FinishCommandJSONSchema.JSON_SCHEMA],
        ['Select', SelectCommandJSONSchema.JSON_SCHEMA],
        ['Reinflate', ReinflateCommandJSONSchema.JSON_SCHEMA],
        ['InsertItem', InsertItemCommandJSONSchema.JSON_SCHEMA],
        ['RemoveItem', RemoveItemCommandJSONSchema.JSON_SCHEMA],
        ['Log', LogCommandJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * Validate command.
     * @param {object} jsonObject
     * @param {string} commandType
     * @returns {IValidationInfo[]}
     * @memberof CommandSchemaValidator
     */
    public validateCommand(jsonObject : object, commandType : string) : IValidationInfo[] {
        let validateFunction = ajv.getSchema(commandType);
        const results = [];

        if (!validateFunction) {
            const commandJsonSchema : IJsonSchema = CommandSchemaValidator.COMMAND_TYPE_TO_JSON_SCHEMA
            .get(commandType);
            if (!commandJsonSchema) {
                results.push({
                    errorMessage : 'Failed to find JSON schema for command: ' + commandType,
                    path : '/',
                    level : NotificationLevel.WARN
                } as IValidationInfo);
                return results;
            }
            validateFunction = ajv.addSchema(commandJsonSchema, commandType).getSchema(commandType);
        }

        const succeed = validateFunction(jsonObject);
        if (succeed) {
            return [];
        }
        ValidationErrorFilter.filterErrors(
            validateFunction.errors,
            ValidationErrorFilter.singleDataPathFilterNoRootPath
        ).filter(ValidationErrorFilter.userDefinedPropertyErrorFilter)
        .forEach((eachError) => {
                results.push(StaticAplTemplateValidator.asValidationWarnInfo(eachError));
        });
        return results;
    }
}
