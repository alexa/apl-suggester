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
import { AplCommandsExtractor } from '../AplCommandsExtractor';
import { IAplCommand } from '../IAplCommand';

describe('AplCommandsExtractor tests', () => {
    const APL_DOC = {
        commands: {
            SoftStagger: {
                description: 'General soft-stagger sliding objects from the left or right',
                parameters: [
                    'delay',
                    'duration',
                    'distance'
                ],
                commands: [
                    {
                        type: 'SetValue',
                        property: 'opacity',
                        value: 0
                    },
                    {
                        type: 'AnimateItem',
                        easing: 'ease-in-out',
                        delay: '${delay}',
                        duration: '${duration}',
                        values: [
                            {
                                property: 'opacity',
                                from: 0,
                                to: 1
                            },
                            {
                                property: 'transformX',
                                from: '${distance}',
                                to: 0
                            }
                        ]
                    }
                ]
            },
            SoftStagger1: {
                command: {
                    type: 'SoftStagger',
                    delay: 0,
                    duration: 666,
                    distance: 40
                }
            }
        },
        onMount: [
            {
                type: 'Idle',
                delay: 30000,
                screenLock: true,
                sequencer: 'MAIN'
            },
            {
                type: 'Sequential',
                commands: [
                    {
                        type: 'Parallel',
                        commands: '<COMPONENT_ON_MOUNT_COMMANDS>'
                    }
                ],
                finally: '<DOCUMENT_ON_MOUNT_COMMAND>'
            }
        ],
        onConfigChange: [
            {
              type: 'SendEvent',
              sequencer: 'ConfigSendEvent',
              arguments: ['reinflating the APL document']
            },
            {
              type: 'Reinflate',
              preservedSequencers: [ 'SpeakListSequencer' ]
            }
        ]
    };

    const aplCommandsExtractor = AplCommandsExtractor.getInstance();

    it('should be able to extract all commands from requested APL template', () => {
        const commands : IAplCommand[] = aplCommandsExtractor.extractCommands(APL_DOC);
        // the commands count should be expected
        expect(commands.length).to.be.equal(8);
        // all commands should contain jsonPath
        expect(commands.filter((c) => c.jsonPath === undefined)).to.have.lengthOf(0);
    });
});
