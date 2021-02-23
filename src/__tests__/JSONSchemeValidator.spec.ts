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
import * as $RefParser from '@apidevtools/json-schema-ref-parser';

import { JSON_SCHEMA as APLDocument } from '../assets/JsonSchema';
import { JSON_SCHEMA as Container } from '../assets/Container';
import { JSON_SCHEMA as ContainerChild } from '../assets/ContainerChild';
import { JSON_SCHEMA as EditText } from '../assets/EditText';
import { JSON_SCHEMA as Frame } from '../assets/Frame';
import { JSON_SCHEMA as GridSequence } from '../assets/GridSequence';
import { JSON_SCHEMA as GridSequenceChild } from '../assets/GridSequenceChild';
import { JSON_SCHEMA as Image } from '../assets/Image';
import { JSON_SCHEMA as Pager } from '../assets/Pager';
import { JSON_SCHEMA as ScrollView } from '../assets/ScrollView';
import { JSON_SCHEMA as Sequence } from '../assets/Sequence';
import { JSON_SCHEMA as SequenceChild } from '../assets/SequenceChild';
import { JSON_SCHEMA as Text } from '../assets/Text';
import { JSON_SCHEMA as TouchWrapper } from '../assets/TouchWrapper';
import { JSON_SCHEMA as VectorGraphic } from '../assets/VectorGraphic';
import { JSON_SCHEMA as Video } from '../assets/Video';

import { JSON_SCHEMA as AVGBaseItem } from '../assets/graphics/AVGBaseItem';
import { JSON_SCHEMA as AVGGroupItem } from '../assets/graphics/AVGGroupItem';
import { JSON_SCHEMA as AVGPathItem } from '../assets/graphics/AVGPathItem';
import { JSON_SCHEMA as AVGTextItem } from '../assets/graphics/AVGTextItem';

import { JSON_SCHEMA as AnimateItemCommand } from '../assets/commands/AnimationItemCommand';
import { JSON_SCHEMA as AutoPageCommand } from '../assets/commands/AutoPageCommand';
import { JSON_SCHEMA as ClearFocusCommand } from '../assets/commands/ClearFocusCommand';
import { JSON_SCHEMA as ControlMediaCommand } from '../assets/commands/ControlMediaCommand';
import { JSON_SCHEMA as FinishCommand } from '../assets/commands/FinishCommand';
import { JSON_SCHEMA as IdleCommand } from '../assets/commands/IdleCommand';
import { JSON_SCHEMA as OpenURLCommand } from '../assets/commands/OpenURLCommand';
import { JSON_SCHEMA as ParallelCommand } from '../assets/commands/ParallelCommand';
import { JSON_SCHEMA as PlayMediaCommand } from '../assets/commands/PlayMediaCommand';
import { JSON_SCHEMA as ScrollCommand } from '../assets/commands/ScrollCommand';
import { JSON_SCHEMA as ScrollToComponentCommand } from '../assets/commands/ScrollToComponentCommand';
import { JSON_SCHEMA as ScrollToIndexCommand } from '../assets/commands/ScrollToIndexCommand';
import { JSON_SCHEMA as SelectCommand } from '../assets/commands/SelectCommand';
import { JSON_SCHEMA as SendEventCommand } from '../assets/commands/SendEventCommand';
import { JSON_SCHEMA as SequentialCommand } from '../assets/commands/SequentialCommand';
import { JSON_SCHEMA as SetFocusCommand } from '../assets/commands/SetFocusCommand';
import { JSON_SCHEMA as SetPageCommand } from '../assets/commands/SetPageCommand';
import { JSON_SCHEMA as SetStateCommand } from '../assets/commands/SetStateCommand';
import { JSON_SCHEMA as SetValueCommand } from '../assets/commands/SetValueCommand';
import { JSON_SCHEMA as SpeakItemCommand } from '../assets/commands/SpeakItemCommand';
import { JSON_SCHEMA as SpeakListCommand } from '../assets/commands/SpeakListCommand';

describe('JSONSchemaValidator.', () => {
    it('should resolve all references in APLDocument.', async () => {
        const result = await $RefParser.dereference(APLDocument);
        expect(result).to.be.an('object');
    });

    it('should resolve all references in Container.', async () => {
        const result = await $RefParser.dereference(Container);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ContainerChild.', async () => {
        const result = await $RefParser.dereference(ContainerChild);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in EditText.', async () => {
        const result = await $RefParser.dereference(EditText);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in GridSequence.', async () => {
        const result = await $RefParser.dereference(GridSequence);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in GridSequenceChild.', async () => {
        const result = await $RefParser.dereference(GridSequenceChild);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in Image.', async () => {
        const result = await $RefParser.dereference(Image);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in Pager.', async () => {
        const result = await $RefParser.dereference(Pager);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ScrollView.', async () => {
        const result = await $RefParser.dereference(ScrollView);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in Sequence.', async () => {
        const result = await $RefParser.dereference(Sequence);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SequenceChild.', async () => {
        const result = await $RefParser.dereference(SequenceChild);
        expect(result).to.be.an('object');
    });

    it('should resolve all references in Text.', async () => {
        const result = await $RefParser.dereference(Text);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in TouchWrapper.', async () => {
        const result = await $RefParser.dereference(TouchWrapper);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in Video.', async () => {
        const result = await $RefParser.dereference(Video);
        expect(result).to.be.an('object');
    });

    it('should resolve all references in VectorGraphic.', async () => {
        const result = await $RefParser.dereference(VectorGraphic);
        expect(result).to.be.an('object');
    });

    it('should resolve all references in Frame.', async () => {
        const result = await $RefParser.dereference(Frame);
        expect(result).to.be.an('object');
    });

    it('should resolve all references in AVGBaseItem.', async () => {
        const result = await $RefParser.dereference(AVGBaseItem);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in AVGGroupItem.', async () => {
        const result = await $RefParser.dereference(AVGGroupItem);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in AVGPathItem.', async () => {
        const result = await $RefParser.dereference(AVGPathItem);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in AVGTextItem.', async () => {
        const result = await $RefParser.dereference(AVGTextItem);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in AnimateItemCommand.', async () => {
        const result = await $RefParser.dereference(AnimateItemCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in AutoPageCommand.', async () => {
        const result = await $RefParser.dereference(AutoPageCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ClearFocusCommand.', async () => {
        const result = await $RefParser.dereference(ClearFocusCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ControlMediaCommand.', async () => {
        const result = await $RefParser.dereference(ControlMediaCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in FinishCommand.', async () => {
        const result = await $RefParser.dereference(FinishCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in IdleCommand.', async () => {
        const result = await $RefParser.dereference(IdleCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in OpenURLCommand.', async () => {
        const result = await $RefParser.dereference(OpenURLCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ParallelCommand.', async () => {
        const result = await $RefParser.dereference(ParallelCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in PlayMediaCommand.', async () => {
        const result = await $RefParser.dereference(PlayMediaCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ScrollCommand.', async () => {
        const result = await $RefParser.dereference(ScrollCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ScrollToComponentCommand.', async () => {
        const result = await $RefParser.dereference(ScrollToComponentCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in ScrollToIndexCommand.', async () => {
        const result = await $RefParser.dereference(ScrollToIndexCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SelectCommand.', async () => {
        const result = await $RefParser.dereference(SelectCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SendEventCommand.', async () => {
        const result = await $RefParser.dereference(SendEventCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SequentialCommand.', async () => {
        const result = await $RefParser.dereference(SequentialCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SetFocusCommand.', async () => {
        const result = await $RefParser.dereference(SetFocusCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SetPageCommand.', async () => {
        const result = await $RefParser.dereference(SetPageCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SetStateCommand.', async () => {
        const result = await $RefParser.dereference(SetStateCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SetValueCommand.', async () => {
        const result = await $RefParser.dereference(SetValueCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SpeakItemCommand.', async () => {
        const result = await $RefParser.dereference(SpeakItemCommand);
        expect(result).to.be.an('object');
    });
    
    it('should resolve all references in SpeakListCommand.', async () => {
        const result = await $RefParser.dereference(SpeakListCommand);
        expect(result).to.be.an('object');
    });
});
