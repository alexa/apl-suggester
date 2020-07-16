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

import * as bt1Apl from './templates/ask_body1_apl.json';
import * as bt2Apl from './templates/ask_body2_apl.json';
import * as bt3Apl from './templates/ask_body3_apl.json';
import * as bt6Apl from './templates/ask_body6_apl.json';
import * as bt7Apl from './templates/ask_body7_apl.json';
import * as lt1Apl from './templates/ask_list1_apl.json';
import * as lt2Apl from './templates/ask_list2_apl.json';
import * as defaultApl from './templates/default_apl.json';

import * as bt1data from './data/ask_body1_data.json';
import * as bt2data from './data/ask_body2_data.json';
import * as bt3data from './data/ask_body3_data.json';
import * as bt6data from './data/ask_body6_data.json';
import * as bt7data from './data/ask_body7_data.json';
import * as lt1data from './data/ask_list1_data.json';
import * as lt2data from './data/ask_list2_data.json';
import * as defaultData from './data/default_data.json';

import { Map } from 'immutable';

/**
 * The interface of sample template
 * @export
 * @interface ISampleTemplate
 * @property {number} apl - apl document of sample template
 * @property {number} data - apl dataSource of sample template
 *
 */
export interface ISampleTemplate {
    apl : object;
    data : object;
}

/**
 * This is a enum that contains the names of sample templates.
 */
export enum SampleTemplateName {
    LONG_TEXT_SAMPLE = 'LONG_TEXT_SAMPLE',
    IMAGE_RIGHT_DETAIL_SAMPLE = 'IMAGE_RIGHT_DETAIL_SAMPLE',
    IMAGE_LEFT_DETAIL_SAMPLE = 'IMAGE_LEFT_DETAIL_SAMPLE',
    SHORT_TEXT_SAMPLE = 'SHORT_TEXT_SAMPLE',
    IMAGE_DISPLAY_SAMPLE = 'IMAGE_DISPLAY_SAMPLE',
    TEXT_FORWARD_LIST_SAMPLE = 'TEXT_FORWARD_LIST_SAMPLE',
    IMAGE_FORWARD_LIST_SAMPLE = 'IMAGE_FORWARD_LIST_SAMPLE',
    START_FROM_SCRATCH = 'START_FROM_SCRATCH'
}

/**
 * This is a mapping that contains the contents of sample templates.
 */
const SAMPLE_TEMPLATE_METADATA : Map<string, ISampleTemplate> = Map({
    LONG_TEXT_SAMPLE : {
        apl: bt1Apl,
        data: bt1data
    },
    IMAGE_RIGHT_DETAIL_SAMPLE : {
        apl: bt2Apl,
        data: bt2data
    },
    IMAGE_LEFT_DETAIL_SAMPLE : {
        apl: bt3Apl,
        data: bt3data
    },
    SHORT_TEXT_SAMPLE : {
        apl: bt6Apl,
        data: bt6data
    },
    IMAGE_DISPLAY_SAMPLE : {
        apl: bt7Apl,
        data: bt7data
    },
    TEXT_FORWARD_LIST_SAMPLE : {
        apl: lt1Apl,
        data: lt1data
    },
    IMAGE_FORWARD_LIST_SAMPLE : {
        apl: lt2Apl,
        data: lt2data
    },
    START_FROM_SCRATCH : {
        apl: defaultApl,
        data: defaultData
    }
});

export function getDefaultAplDocument() : object {
    return defaultApl;
}

export function getSampleTemplates() : Map<string, ISampleTemplate> {
    return SAMPLE_TEMPLATE_METADATA;
}

export function getSampleTemplate(name : SampleTemplateName) : ISampleTemplate {
    return SAMPLE_TEMPLATE_METADATA.get(name);
}
