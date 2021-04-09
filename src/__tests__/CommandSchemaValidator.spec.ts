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

    it('should validate SetFocus command.', async () => {
        await verifyCommand('SetFocusCommand.json', 'SetFocus');
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

    it('should validate PlayMedia command.', async () => {
        await verifyCommand('PlayMediaCommand.json', 'PlayMedia');
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

    it('should received correct amount of validation errors.', async () => {
        const data = fs.readFileSync(`src/__tests__/commands/ErrorCommand.json`, 'utf8');
        const result =  commandSchemaValidator.validateCommand(JSON.parse(data), 'SetState');
        expect(result.length).to.be.equal(2);
        expect(result[0].path).to.be.equal('/state');
        expect(result[0].level).to.be.equal(NotificationLevel.WARN);
        expect(result[1].path).to.be.equal('/');
        expect(result[1].level).to.be.equal(NotificationLevel.WARN);
        expect(result[1].errorMessage.indexOf('value') > 0).to.be.equal(true);
    });

    async function verifyCommand(fileName : string, type : string) {
        const data = fs.readFileSync(`src/__tests__/commands/${fileName}`, 'utf8');
        const result = commandSchemaValidator.validateCommand(JSON.parse(data), type);
        expect(result.length).to.be.equal(0);
    }
});
