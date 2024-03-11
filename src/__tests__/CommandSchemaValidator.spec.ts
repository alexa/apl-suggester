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

import { expect } from 'chai';
import * as fs from 'fs';
import { NotificationLevel } from '../IValidationInfo';
import { CommandSchemaValidator } from '../CommandSchemaValidator';

describe('CommandSchemaValidator.', () => {
    const commandSchemaValidator = CommandSchemaValidator.getInstance();

    it('should validate Idle command.', async () => {
        await verifyCommand('IdleCommand.json', 'Idle');
    });

    it('should validate Sequential command.', async () => {
        await verifyCommand('SequentialCommand.json', 'Sequential');
    });

    it('should validate Parallel command.', async () => {
        await verifyCommand('ParallelCommand.json', 'Parallel');
    });

    it('should validate SendEvent command.', async () => {
        await verifyCommand('SendEventCommand.json', 'SendEvent');
    });

    it('should validate SetValue command.', async () => {
        await verifyCommand('SetValueCommand.json', 'SetValue');
    });

    it('should validate SetState command.', async () => {
        await verifyCommand('SetStateCommand.json', 'SetState');
    });

    it('should validate SetFocus command.', async () => {
        await verifyCommand('SetFocusCommand.json', 'SetFocus');
    });

    it('should validate ClearFocus command.', async () => {
        await verifyCommand('ClearFocusCommand.json', 'ClearFocus');
    });

    it('should validate SpeakItem command.', async () => {
        await verifyCommand('SpeakItemCommand.json', 'SpeakItem');
    });

    it('should validate SpeakList command.', async () => {
        await verifyCommand('SpeakListCommand.json', 'SpeakList');
    });

    it('should validate Scroll command.', async () => {
        await verifyCommand('ScrollCommand.json', 'Scroll');
    });

    it('should validate ScrollToIndex command.', async () => {
        await verifyCommand('ScrollToIndexCommand.json', 'ScrollToIndex');
    });

    it('should validate ScrollToComponent command.', async () => {
        await verifyCommand('ScrollToComponentCommand.json', 'ScrollToComponent');
    });

    it('should validate SetPage command.', async () => {
        await verifyCommand('SetPageCommand.json', 'SetPage');
    });

    it('should validate AutoPage command.', async () => {
        await verifyCommand('AutoPageCommand.json', 'AutoPage');
    });

    it('should validate PlayMedia command.', async () => {
        await verifyCommand('PlayMediaCommand.json', 'PlayMedia');
    });

    it('should validate ControlMedia command.', async () => {
        await verifyCommand('ControlMediaCommand.json', 'ControlMedia');
    });

    it('should validate AnimateItem command.', async () => {
        await verifyCommand('AnimateItemCommand.json', 'AnimateItem');
    });

    it('should validate Finish command.', async () => {
        await verifyCommand('FinishCommand.json', 'Finish');
    });

    it('should validate Select command.', async () => {
        await verifyCommand('SelectCommand.json', 'Select');
    });

    it('should validate Reinflate command.', async () => {
        await verifyCommand('ReinflateCommand.json', 'Reinflate');
    });

    it('should validate Insert Item command.', async () => {
        await verifyCommand('InsertItemCommand.json', 'InsertItem');
    });

    it('should received correct amount of validation errors.', async () => {
        const data = fs.readFileSync(`src/__tests__/commands/ErrorCommand.json`, 'utf8');
        const result =  commandSchemaValidator.validateCommand(JSON.parse(data), 'SetState');
        expect(result.length).to.equal(2);

        expect(result[0].path).to.equal('/');
        expect(result[0].level).to.equal(NotificationLevel.WARN);
        expect(result[0].errorMessage.indexOf('\'value\'') > 0).to.equal(true);

        expect(result[1].path).to.equal('/state');
        expect(result[1].level).to.equal(NotificationLevel.WARN);
    });

    it('should received correct amount of validation errors for Remove Item Commands.', async() => {
        const data = fs.readFileSync(`src/__tests__/commands/RemoveItemCommand.json`, 'utf8');
        const result =  commandSchemaValidator.validateCommand(JSON.parse(data), 'RemoveItem');
        expect(result[0].path).to.equal('/componentId');
        expect(result[0].level).to.equal(NotificationLevel.WARN);
    });

    it('should allow all levels in Log command.', async () => {
        const data = fs.readFileSync(`src/__tests__/commands/Log_allLevels.json`, 'utf8');
        const testCases = JSON.parse(data);
        let result;
        let total = 0;
        testCases.forEach((obj) => {
            result = commandSchemaValidator.validateCommand(obj, 'Log');
            total += result.length;
        });
        expect(total).to.be.equal(0);
    });

    it('should allow array of anything in Log command.', async () => {
        const data = fs.readFileSync(`src/__tests__/commands/Log_differentArguments.json`, 'utf8');
        const testCases = JSON.parse(data);
        let result;
        let total = 0;
        testCases.forEach((obj) => {
            result = commandSchemaValidator.validateCommand(obj, 'Log');
            total += result.length;
        });
        expect(total).to.be.equal(0);
    });

    it('should see 3 errors in Log command.', async () => {
        const data = fs.readFileSync(`src/__tests__/commands/Log_errorCases.json`, 'utf8');
        const testCases = JSON.parse(data);
        let result = [];
        testCases.forEach((obj) => {
            result = result.concat(commandSchemaValidator.validateCommand(obj, 'Log'));
        });
        expect(result.length).to.be.equal(4);
        expect(result[0].path).to.equal('/type');
        expect(result[1].path).to.equal('/arguments');
        expect(result[2].path).to.equal('/level');
        expect(result[3].path).to.equal('/level');
    });

    async function verifyCommand(fileName : string, type : string) {
        const data = fs.readFileSync(`src/__tests__/commands/${fileName}`, 'utf8');
        const result = commandSchemaValidator.validateCommand(JSON.parse(data), type);
        expect(result.length).to.be.equal(0);
    }
});
