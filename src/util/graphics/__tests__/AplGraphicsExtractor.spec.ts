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
import { AplGraphicsExtractor } from '../AplGraphicsExtractor';
import { IAplGraphic } from '../IAplGraphic';

describe('AplGraphicsExtractor tests', () => {
    const APL_DOC = {
        graphics: {
            shape1: {
                type: 'AVG',
                items: [
                    {
                        type: 'path'
                    },
                    {
                        type: 'group',
                        item: {
                            type: 'path'
                        }
                    },
                    {
                        type: 'group',
                        items: [
                            {
                                type: 'path'
                            },
                            {
                                type: 'path'
                            }
                        ]
                    }
                ]
            },
            shape2: {
                type: 'AVG',
                item: {
                    type: 'group',
                    item: [
                        {
                            type: 'path'
                        },
                        {
                            type: 'path'
                        }
                    ]
                }
            }
        }
    };

    const aplGraphicsExtractor = AplGraphicsExtractor.getInstance();

    it('should be able to extract all graphics from requested APL template', () => {
        const graphics : IAplGraphic[] = aplGraphicsExtractor.extractGraphics(APL_DOC);
        // the graphic count should be expected
        expect(graphics.length).to.be.equal(9);
        // all graphics should contain jsonPath
        expect(graphics.filter((g) => g.jsonPath === undefined)).to.have.lengthOf(0);
    });
});
