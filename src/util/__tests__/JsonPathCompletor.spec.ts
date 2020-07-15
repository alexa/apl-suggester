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

import { expect } from 'chai';
import { JsonPathCompletor } from '../JsonPathCompletor';

describe('Template Json Path Completor', () => {
    let templateCompletor : JsonPathCompletor;
    const APL_DOC = {
        mainTemplate : {
            items : {
                type : 'Container',
                items : [
                    {
                        type : 'Image'
                    },
                    {
                        type : 'AlexaHeader'
                    }
                ]
            }
        },
        layouts : {
            ListTemplate1 : {
                item : [
                    {
                        type : 'Container',
                        items : [
                            {
                                type : 'Image'
                            },
                            {
                                type : 'AlexaHeader'
                            },
                            {
                                type : 'Sequence',
                                items : [
                                    {
                                        type : 'VerticalListItem'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            VerticalListItem : {
                item : {
                    type : 'Container',
                    items : [
                        '${listItem}'
                    ]
                }
            }
        }
    };

    it('should add path to different level json object', () => {
        templateCompletor = new JsonPathCompletor(APL_DOC);
        const result = templateCompletor.addJsonPath();
        expect(result['layouts']['ListTemplate1'].JSON_PATH).to.be.equal('/layouts/ListTemplate1');
        expect(result['layouts']['ListTemplate1']['item'][0].JSON_PATH).to.be.equal('/layouts/ListTemplate1/item/0');
        expect(result['layouts']['ListTemplate1']['item'][0]['items'][0].JSON_PATH).
        to.be.equal('/layouts/ListTemplate1/item/0/items/0');
        expect(result['layouts']['ListTemplate1']['item'][0]['items'][1].JSON_PATH).
        to.be.equal('/layouts/ListTemplate1/item/0/items/1');
        expect(result['layouts']['ListTemplate1']['item'][0]['items'][2].JSON_PATH).
        to.be.equal('/layouts/ListTemplate1/item/0/items/2');

        expect(result['layouts']['VerticalListItem'].JSON_PATH).to.be.equal('/layouts/VerticalListItem');
        expect(result['layouts']['VerticalListItem']['item'].JSON_PATH)
        .to.be.equal('/layouts/VerticalListItem/item');

        expect(result['mainTemplate'].JSON_PATH).to.be.equal('/mainTemplate');
        expect(result['mainTemplate']['items'].JSON_PATH).to.be.equal('/mainTemplate/items');
        expect(result['mainTemplate']['items']['items'][0].JSON_PATH).to.be.equal('/mainTemplate/items/items/0');
        expect(result['mainTemplate']['items']['items'][1].JSON_PATH).to.be.equal('/mainTemplate/items/items/1');

        expect(APL_DOC.hasOwnProperty('JSON_SCHEMA')).to.be.equal(false); // Orginal JSON object is not being modified.
    });
});
