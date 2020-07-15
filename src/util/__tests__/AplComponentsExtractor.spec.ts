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
import { AplComponentsExtractor } from '../AplComponentsExtractor';
import { IAplComponent } from '../IAplComponent';

describe('AplComponentsExtractor tests', () => {
    const APL_DOC = {
        mainTemplate : {
            items : {
                type : 'ListTemplate1'
            }
        },
        layouts : {
            ListTemplate1 : {
                item : [
                    {
                        type : 'Sequence',
                        items : [
                            {
                                type : 'VerticalListItem'
                            }
                        ]
                    }
                ]
            },
            VerticalListItem : {
                item : {
                    type : 'Container',
                    items : [
                        {
                            type : 'Text'
                        }
                    ]
                }
            },
            UnusedItem : {
                item : {
                    type : 'Image'
                }
            }
        }
    };

    const aplComponentsExtractor = AplComponentsExtractor.getInstance();

    it('should be able to extract all components from requested APL template', () => {
        const components : IAplComponent[] = aplComponentsExtractor.extractComponents(APL_DOC);
        // the component count should be expected
        expect(components.length).to.be.equal(10);
        // all components should contain jsonPath
        expect(components.filter((c) => c.jsonPath === undefined)).to.have.lengthOf(0);
        // the component parent should be expected.
        expect(components.filter((c) => c.parentComponentType === undefined)).to.have.lengthOf(0);
        expect(components.filter((c) => c.componentType === 'Text')[0].parentComponentType).to.be.equal('Container');
        expect(components.filter((c) => c.componentType === 'Sequence')[0].parentComponentType)
        .to.be.equal('mainTemplate');
        expect(components.filter((c) => c.componentType === 'Container')[0].parentComponentType)
        .to.be.equal('Sequence');
    });

    it('should still success for undefined layout or mainTemplate', () => {
        const aplWithoutMainTemplate = JSON.parse(JSON.stringify(APL_DOC));
        delete aplWithoutMainTemplate.mainTemplate;
        const componentsWithoutMainTemplate = aplComponentsExtractor.extractComponents(aplWithoutMainTemplate);
        expect(componentsWithoutMainTemplate.length).to.be.equal(8);

        const aplWithoutLayout = JSON.parse(JSON.stringify(APL_DOC));
        delete aplWithoutLayout.layouts;
        const componentsWithoutLayout = aplComponentsExtractor.extractComponents(aplWithoutLayout);
        expect(componentsWithoutLayout.length).to.be.equal(2);
    });
});
