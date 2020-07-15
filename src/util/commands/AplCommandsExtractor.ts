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
import { JsonPathCompletor } from '../JsonPathCompletor';
import { IAplCommand } from './IAplCommand';

/**
 * Used to extract Commands from APL template.
 * @export
 * @class AplCommandsExtractor
 */
export class AplCommandsExtractor {
    /**
     * All supported primitive component type to json schema mapping.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static COMMANDS_PROPERTIES_MAP = new Map<string, string[]>([
        ['Sequential', ['catch', 'commands', 'finally']],
        ['Parallel', ['commands']],
        ['OpenURL', ['onFail']],
        ['Select', ['commands', 'otherwise']]
    ]);

    /**
     * Instance of AplCommandsExtractor.
     *
     * @private
     * @static
     * @type {AplCommandsExtractor}
     * @memberof AplCommandsExtractor
     */
    private static instance : AplCommandsExtractor;

    private constructor() {
    }

    /**
     * Singleton method.
     *
     * @static
     * @returns {AplCommandsExtractor}
     * @memberof AplCommandsExtractor
     */
    public static getInstance() : AplCommandsExtractor {
        if (!this.instance) {
            this.instance = new AplCommandsExtractor();
        }
        return this.instance;
    }

    /**
     * Extract Command from current APL template without parsing all Commands defined in import.
     * @param {object} aplTemplate
     * @returns {IAplCommand[]}
     * @memberof AplCommandsExtractor
     */
    public extractCommands(aplTemplate : object) : IAplCommand[] {
        const commands : IAplCommand[] = [];
        // add json path through completor. The completor also did deep copy of aplTemplate.
        const aplTemplateWithPath = this.addJsonPath(aplTemplate);
        // add commands under commands
        if (aplTemplateWithPath['commands']) {
            Object.values(aplTemplateWithPath['commands'])
            .filter((value) => typeof(value) === 'object')
            .forEach((value) => {
                this.addCommandArray(value as object, commands, '');
            });
        }

        // add Commands under onMount
        if (aplTemplateWithPath['onMount']) {
            this.addChildCommands(aplTemplateWithPath['onMount'], commands);
        }
        return commands;
    }

    /**
     * Add current Command. Also add child Commands if there are any.
     * @param Command the current Command to add
     * @param existingCommands list of AplCommands
     */
    private addCommand(command : object, existingCommands : IAplCommand[]) {
        this.addCommandArray(command, existingCommands, command['type']);
        const aplCommand : IAplCommand = this.buildAplCommand(command);
        existingCommands.push(aplCommand);
    }

    private addCommandArray(
        command : object,
        existingCommands : IAplCommand[],
        commandType : string) {
        this.getCommandsProperties(commandType).forEach((commandsProperty) => {
            if (command[commandsProperty]) {
                this.addChildCommands(command[commandsProperty], existingCommands);
            }
        });
    }

    private addChildCommands(childCommands : any, existingCommands : IAplCommand[]) {
        if (Array.isArray(childCommands)) {
            childCommands.forEach((Command) => this.addCommand(Command, existingCommands));
        } else if (typeof(childCommands) === 'object') {
            this.addCommand(childCommands, existingCommands);
        }
    }

    private buildAplCommand(rawCommand : object) : IAplCommand {
        const jsonPath = rawCommand[JsonPathCompletor.JSON_PATH];
        // delete unrelated properties
        delete rawCommand[JsonPathCompletor.JSON_PATH];

        const commandType = rawCommand['type'];
        // indicate whether item/items exists but don't return the children. This replaced
        // outright deleting the properties which meant they would always error when required.
        this.getCommandsProperties(commandType).forEach((commandsProperty) => {
            if (rawCommand[commandsProperty]) {
                rawCommand[commandsProperty] = [];
            }
        });

        return {
            jsonObject: rawCommand,
            jsonPath,
            commandType
        };
    }

    private getCommandsProperties(commandType : string) : string[] {
        // command property in ControlMedia is enumerated value,
        // which is the operation that should be performed on the media player.
        // Ref: https://aplspec.aka.corp.amazon.com/release-1.1/html/standard_commands.html#controlmedia-command
        if (commandType === 'ControlMedia') {
            return [];
        }
        return AplCommandsExtractor.COMMANDS_PROPERTIES_MAP.get(commandType) || ['command', 'commands'];
    }

    /**
     * Add json path to commands object.
     * @returns {object} with json path information in commands.
     * @memberof JsonPathCompletor
     */
    private addJsonPath(originalDoc : object) : object {
        const copiedDoc = JSON.parse(JSON.stringify(originalDoc));
        const commandsElement = copiedDoc['commands'];
        if (commandsElement) {
            for (let eachKey of Object.keys(commandsElement)) {
                this.addJsonPathToObject(commandsElement[eachKey], `/commands/${eachKey}`);
            }
        }

        if (copiedDoc['onMount']) {
            this.processChildCommand(copiedDoc, '', 'onMount');
        }
        return copiedDoc;
    }

    /**
     * Recursion method to add json path to template.
     * @private
     * @param {object} currentObject
     * @param {string} currentPath
     * @returns
     */
    private addJsonPathToObject(currentObject : object, currentPath : string) {
        if (typeof(currentObject) !== 'object') {
            return;
        }
        currentObject[JsonPathCompletor.JSON_PATH] = currentPath;
        this.getCommandsProperties(currentObject['type']).forEach((commandsProperty) => {
            this.processChildCommand(currentObject, currentPath, commandsProperty);
        });
    }

    /**
     * Process child element under commandsProperties.
     * @private
     * @param {object} currentObject
     * @param {string} currentPath
     * @param {string} element
     */
    private processChildCommand(currentObject : object, currentPath : string, element : string) {
        if (!currentObject[element]) {
            return;
        }
        if (Array.isArray(currentObject[element])) {
            let index = 0;
            for (let eachArrayElem of currentObject[element]) {
                this.addJsonPathToObject(eachArrayElem, currentPath + `/${element}/${index}`);
                index += 1;
            }
        } else if (typeof(currentObject[element]) === 'object') {
            this.addJsonPathToObject(currentObject[element], currentPath + `/${element}`);
        }
    }
}
