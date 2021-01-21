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

import * as longTextApl from './templates/long-text-sample.json';
import * as imageRightDetailApl from './templates/image-right-detail-sample.json';
import * as imageLeftDetailApl from './templates/image-left-detail-sample.json';
import * as shortTextApl from './templates/short-text-sample.json';
import * as imageDisplayApl from './templates/image-display-sample.json';
import * as textForwardListApl from './templates/text-forward-list-sample.json';
import * as imageForwardlistApl from './templates/image-forward-list-sample.json';
import * as testAplAnimation1 from './templates/test-apl-animation1.json';
import * as testAplAnimation2 from './templates/test-apl-animation2.json';
import * as testAplLayout1 from './templates/test-apl-layout1.json';
import * as testAplLayout2 from './templates/test-apl-layout2.json';
import * as defaultApl from './templates/default_apl.json';

import * as longTextData from './data/long_text_sample_data.json';
import * as imageRightDetailData from './data/image_right_detail_sample_data.json';
import * as imageLeftDetailData from './data/image_left_detail_sample_data.json';
import * as shortTextData from './data/short_text_sample_data.json';
import * as imageDisplayData from './data/image_display_sample_data.json';
import * as textForwardListData from './data/text_forward_list_sample_data.json';
import * as imageForwardListData from './data/image_forward_list_sample_data.json';
import * as testAplAnimation1Data from './data/test_apl_animation1_data.json';
import * as testAplAnimation2Data from './data/test_apl_animation2-data.json';
import * as testAplLayout1Data from './data/test_apl_layout1_data.json';
import * as testAplLayout2Data from './data/test_apl_layout2_data.json';
import * as defaultData from './data/default_data.json';

import { Map } from 'immutable';

/**
 * The interface of sample template
 * @export
 * @interface ISampleTemplate
 * @property {number} apl - apl document of sample template
 * @property {number} data - apl dataSource of sample template
 * @property {number} type - type of sample template
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
    START_FROM_SCRATCH = 'START_FROM_SCRATCH',
    TEST_APL_ANIMATION1_SAMPLE = 'TEST_APL_ANIMATION1_SAMPLE',
    TEST_APL_ANIMATION2_SAMPLE = 'TEST_APL_ANIMATION2_SAMPLE',
    TEST_APL_LAYOUT1_SAMPLE = 'TEST_APL_LAYOUT1_SAMPLE',
    TEST_APL_LAYOUT2_SAMPLE = 'TEST_APL_LAYOUT2_SAMPLE'
}

/**
 * This is a mapping that contains the contents of sample templates.
 */
const SAMPLE_TEMPLATE_METADATA : Map<string, ISampleTemplate> = Map({
    LONG_TEXT_SAMPLE : {
        apl: longTextApl,
        data: longTextData
    },
    IMAGE_RIGHT_DETAIL_SAMPLE : {
        apl: imageRightDetailApl,
        data: imageRightDetailData
    },
    IMAGE_LEFT_DETAIL_SAMPLE : {
        apl: imageLeftDetailApl,
        data: imageLeftDetailData
    },
    SHORT_TEXT_SAMPLE : {
        apl: shortTextApl,
        data: shortTextData
    },
    IMAGE_DISPLAY_SAMPLE : {
        apl: imageDisplayApl,
        data: imageDisplayData
    },
    TEXT_FORWARD_LIST_SAMPLE : {
        apl: textForwardListApl,
        data: textForwardListData
    },
    IMAGE_FORWARD_LIST_SAMPLE : {
        apl: imageForwardlistApl,
        data: imageForwardListData
    },
    START_FROM_SCRATCH : {
        apl: defaultApl,
        data: defaultData
    },
    TEST_APL_ANIMATION1_SAMPLE : {
        apl: testAplAnimation1,
        data: testAplAnimation1Data
    },
    TEST_APL_ANIMATION2_SAMPLE : {
        apl: testAplAnimation2,
        data: testAplAnimation2Data
    },
    TEST_APL_LAYOUT1_SAMPLE : {
        apl: testAplLayout1,
        data: testAplLayout1Data
    },
    TEST_APL_LAYOUT2_SAMPLE : {
        apl: testAplLayout2,
        data: testAplLayout2Data
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
