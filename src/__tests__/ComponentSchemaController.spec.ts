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
import * as sinon from 'sinon';
import { ComponentSchemaController } from '../ComponentSchemaController';
import { NotificationLevel } from '../IValidationInfo';
import { PackageLoader, ILoadedResult } from '../util/PackageLoader';
import { IMPORT_LAYOUT_TEMPLATE_13 } from '../util/__tests__/template_test_cases/importInternalTemplate';
import { getSampleTemplate, SampleTemplateName } from '../configs';
import * as aplTemplate from '../configs/templates/default_apl.json';

describe('ComponentSchemaController.', () => {
    let stub;
    let componentSchemaController;

    beforeEach(() => {
        componentSchemaController = ComponentSchemaController.getInstance();
        stub = sinon.stub(PackageLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json : IMPORT_LAYOUT_TEMPLATE_13,
                justLoaded : true,
                name : 'alexa-layouts'
            } as ILoadedResult]);
        }));
    });

    afterEach(() => {
        stub.restore();
    });

    it('should validate Container component.', async () => {
        const containerDefinitions = fs.readdirSync(`src/__tests__/components/`)
            .filter((fileName) => fileName.startsWith('Container'));
        for (const fileName of containerDefinitions) {
            await verifyComponent(fileName, 'Container');
        }
    });

    it('should validate Frame component.', async () => {
        await verifyComponent('Frame.json', 'Frame');
    });

    it('should validate Image component.', async () => {
        // TODO add it back to Image.json when mixin is implemented. "position": "absolute",
        await verifyComponent('Image.json', 'Image');
    });

    it('should validate ScrollView component.', async () => {
        await verifyComponent('ScrollView.json', 'ScrollView');
    });

    it('should validate Sequence component.', async () => {
        await verifyComponent('Sequence.json', 'Sequence');
    });

    it('should validate Text component.', async () => {
        await verifyComponent('Text.json', 'Text');
    });

    it('should received correct amount of validation errors.', async () => {
        const data = fs.readFileSync(`src/__tests__/components/ErrorComponent.json`, 'utf8');
        const result = await componentSchemaController.validateComponent({}, JSON.parse(data), 'Image');
        expect(result.length).to.be.equal(6);
        expect(result[0].path).to.be.equal('/');
        expect(result[0].level).to.be.equal(NotificationLevel.WARN);
        expect(result[0].errorMessage.indexOf('position') > 0).to.be.equal(true);
        expect(result[1].path).to.be.equal('/');
        expect(result[1].level).to.be.equal(NotificationLevel.WARN);
        expect(result[1].errorMessage.indexOf('scrim') > 0).to.be.equal(true);
        expect(result[2].path).to.be.equal('/width');
        expect(result[2].level).to.be.equal(NotificationLevel.WARN);
        expect(result[3].path).to.be.equal('/actions/0');
        expect(result[3].errorMessage.indexOf('name') > 0).to.be.equal(true);
        expect(result[3].level).to.be.equal(NotificationLevel.WARN);
        expect(result[4].path).to.be.equal('/actions/1/enabled');
        expect(result[4].errorMessage.indexOf('boolean') > 0).to.be.equal(true);
        expect(result[4].level).to.be.equal(NotificationLevel.WARN);
        expect(result[5].path).to.be.equal('/role');
        expect(result[5].level).to.be.equal(NotificationLevel.WARN);
    });

    it('should validate Image component correctly with mixin support.', async () => {
        const data = fs.readFileSync(`src/__tests__/components/ImageWithMixin.json`, 'utf8');
        const result = await componentSchemaController.validateComponent({}, JSON.parse(data), 'Image', 'Container');
        expect(result.length).to.be.equal(0);
    });

    it('should get custom component json schema correctly.', async () => {
        const apl = getSampleTemplate(SampleTemplateName.TEXT_FORWARD_LIST_SAMPLE).apl;
        const result = await componentSchemaController.getComponentSchema(apl, 'AlexaHeader', undefined);
        expect(Object.keys(result.properties)).to.have.length(10);
        expect(result.properties.type.type).to.be.equal('string');
    });

    it('should validate Image component correctly with mixin support.', async () => {
        const data = fs.readFileSync(`src/__tests__/components/ImageWithMixinError.json`, 'utf8');
        const result = await componentSchemaController.validateComponent({}, JSON.parse(data), 'Image', 'Container');
        expect(result.length).to.be.equal(2);
        expect(result[0].path).to.be.equal('/');
    });

    it('should return a list of supported components.', async () => {
        const apl = getSampleTemplate(SampleTemplateName.TEXT_FORWARD_LIST_SAMPLE).apl;
        let result = await componentSchemaController.getAvailableComponents(apl);
        expect(result.length).to.be.equal(14);
        expect(result.includes('Image')).to.be.equal(true);
        expect(result.includes('AlexaHeader')).to.be.equal(true);
        result = await componentSchemaController.getAvailableComponents();
        expect(result.length).to.be.equal(12);
    });

    it('should check whether component can contain other components correctly.', async () => {
        expect(componentSchemaController.isLayoutComponent('Image')).to.be.equal(false);
        expect(componentSchemaController.isLayoutComponent('Container', 'whateverpath')).to.be.equal(true);
        expect(componentSchemaController.isLayoutComponent('mainTemplate', '/mainTemplate')).to.be.equal(true);
        expect(componentSchemaController.isLayoutComponent(
            'customComponent', '/layouts/customComponent')).to.be.equal(true);
        expect(componentSchemaController.isLayoutComponent(
            'anyothercustomComponent', '/mainTemplate/items/0/customComponent')).to.be.equal(false);
    });

    it('should validate TouchWrapper component.', async () => {
        await verifyComponent('TouchWrapper.json', 'TouchWrapper');
    });

    it('should validate VectorGraphic component.', async () => {
        await verifyComponent('VectorGraphic.json', 'VectorGraphic');
    });

    it('should validate GridSequence component.', async () => {
        await verifyComponent('GridSequence.json', 'GridSequence');
    });

    it('should validate EditText component.', async () => {
        await verifyComponent('EditText.json', 'EditText');
    });

    async function verifyComponent(fileName : string, componentType : string) {
        const data = fs.readFileSync(`src/__tests__/components/${fileName}`, 'utf8');
        const result =
         await componentSchemaController.validateComponent
         (aplTemplate, JSON.parse(data), componentType);
        expect(result.length).to.be.equal(0);
    }
});
