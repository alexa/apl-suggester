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
        ]
    };

    const aplGraphicsExtractor = AplCommandsExtractor.getInstance();

    it('should be able to extract all commands from requested APL template', () => {
        const commands : IAplCommand[] = aplGraphicsExtractor.extractCommands(APL_DOC);
        // the commands count should be expected
        expect(commands.length).to.be.equal(6);
        // all commands should contain jsonPath
        expect(commands.filter((c) => c.jsonPath === undefined)).to.have.lengthOf(0);
    });
});
