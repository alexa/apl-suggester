import * as longTextApl from './templates/long-text-sample.json';
import * as imageRightDetailApl from './templates/image-right-detail-sample.json';
import * as imageLeftDetailApl from './templates/image-left-detail-sample.json';
import * as shortTextApl from './templates/short-text-sample.json';
import * as imageDisplayApl from './templates/image-display-sample.json';
import * as textForwardListApl from './templates/text-forward-list-sample.json';
import * as imageForwardlistApl from './templates/image-forward-list-sample.json';
import * as defaultApl from './templates/default_apl.json';

import * as longTextData from './data/long_text_sample_data.json';
import * as imageRightDetailData from './data/image_right_detail_sample_data.json';
import * as imageLeftDetailData from './data/image_left_detail_sample_data.json';
import * as shortTextData from './data/short_text_sample_data.json';
import * as imageDisplayData from './data/image_display_sample_data.json';
import * as textForwardListData from './data/text_forward_list_sample_data.json';
import * as imageForwardListData from './data/image_forward_list_sample_data.json';
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
