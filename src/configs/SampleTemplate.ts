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

import * as detailImageRightApl from './templates/detail-image-right.json';
import * as detailImageLeftApl from './templates/detail-image-left.json';
import * as gridListDarkApl from './templates/grid-list-dark.json';
import * as headlineDarkApl from './templates/headline-dark.json';
import * as imageListDarkApl from './templates/image-list-dark.json';
import * as paginatedListDarkApl from './templates/paginated-list-dark.json';
import * as textListDarkApl from './templates/text-list-dark.json';
import * as detailImageRightLightApl from './templates/detail-image-right-light.json';
import * as gridListLightApl from './templates/grid-list-light.json';
import * as headlineLightApl from './templates/headline-light.json';
import * as imageListLightApl from './templates/image-list-light.json';
import * as paginatedListLightApl from './templates/paginated-list-light.json';
import * as textListLightApl from './templates/text-list-light.json';
import * as videoPlayerApl from './templates/video-player.json';
import * as imageDisplayApl from './templates/image-display.json';
import * as longTextApl from './templates/long-text.json';
import * as checkListApl from './templates/check-list.json';
import * as aplAnalogClockApl from './templates/apl-analog-clock.json';
import * as aplEqualizerApl from './templates/apl-equalizer.json';
import * as aplAnimateLeafsBgApl from './templates/apl-animate-leafs-bg.json';
import * as parallaxEffectApl from './templates/parallax-effect.json';
import * as animationApl from './templates/animation.json';
import * as defaultApl from './templates/default_apl.json';

import * as fullscreenVideoPlayerApl from './templates/apl-video.json';
import * as cardsLayoutApl from './templates/apl-cards-layout.json';
import * as audioPlayerApl from './templates/apl-audio.json';
import * as multipleChoiceApl from './templates/apl-multiple-choice.json';
import * as simpleTextApl from './templates/apl-simple-text.json';
import * as mrbHeadlineApl from './templates/mrb-headline.json';

import * as detailImageRightData from './data/detail_image_right_data.json';
import * as detailImageLeftData from './data/detail_image_left_data.json';
import * as gridListDarkData from './data/grid_list_dark_data.json';
import * as headlineDarkData from './data/headline_dark_data.json';
import * as imageListDarkData from './data/image_list_dark_data.json';
import * as paginatedListDarkData from './data/paginated_list_dark_data.json';
import * as textListDarkData from './data/text_list_dark_data.json';
import * as detailImageRightLightData from './data/detail_image_right_light_data.json';
import * as grigListLightData from './data/grid_list_light_data.json';
import * as headlineLightData from './data/headline_light_data.json';
import * as imageListLightData from './data/image_list_light_data.json';
import * as paginatedListLightData from './data/paginated_list_light_data.json';
import * as textListLightData from './data/text_list_light_data.json';
import * as videoPlayerData from './data/video_player_data.json';
import * as imageDisplayData from './data/image_display_data.json';
import * as longTextData from './data/long_text_data.json';
import * as checkListData from './data/check_list_data.json';
import * as aplAnalogClockData from './data/apl_analog_clock_data.json';
import * as aplEqualizerData from './data/apl_equalizer_data.json';
import * as aplAnimateLeafsBgData from './data/apl_animate_leafs_bg_data.json';
import * as parallaxEffectData from './data/parallax_effect_data.json';
import * as animationData from './data/animation_data.json';

import * as fullscreenVideoPlayerData from './data/apl_video_data.json';
import * as cardsLayoutData from './data/apl_cards_layout_data.json';
import * as audioPlayerData from './data/apl_audio_data.json';
import * as multipleChoiceData from './data/apl_multiple_choice_data.json';
import * as simpleTextData from './data/apl_simple_text_data.json';
import * as mrbGridListData from './data/mrb_grid_list_data.json';
import * as mrbHeadlineData from './data/mrb_headline_data.json';
import * as mrbImageListData from './data/mrb_image_list_data.json';
import * as mrbPaginatedListData from './data/mrb_paginated_list_data.json';
import * as mrbTextListData from './data/mrb_text_list_data.json';

import * as defaultData from './data/default_data.json';

import * as longTextSampleApl from './templates/long-text-sample.json';
import * as imageRightDetailApl from './templates/image-right-detail-sample.json';
import * as imageLeftDetailApl from './templates/image-left-detail-sample.json';
import * as shortTextApl from './templates/short-text-sample.json';
import * as imageDisplaySampleApl from './templates/image-display-sample.json';
import * as textForwardListApl from './templates/text-forward-list-sample.json';
import * as imageForwardlistApl from './templates/image-forward-list-sample.json';

import * as longTextSampleData from './data/long_text_sample_data.json';
import * as imageRightDetailData from './data/image_right_detail_sample_data.json';
import * as imageLeftDetailData from './data/image_left_detail_sample_data.json';
import * as shortTextData from './data/short_text_sample_data.json';
import * as imageDisplaySampleData from './data/image_display_sample_data.json';
import * as textForwardListData from './data/text_forward_list_sample_data.json';
import * as imageForwardListData from './data/image_forward_list_sample_data.json';

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
    IMAGE_RIGHT_DETAIL = 'IMAGE_RIGHT_DETAIL',
    IMAGE_LEFT_DETAIL = 'IMAGE_LEFT_DETAIL',
    GRID_LIST = 'GRID_LIST',
    HEADLINE = 'HEADLINE',
    IMAGE_LIST = 'IMAGE_LIST',
    PAGINATED_LIST = 'PAGINATED_LIST',
    TEXT_LIST = 'TEXT_LIST',
    DETAILS = 'DETAILS',
    GRID = 'GRID',
    SHORT_TEXT = 'SHORT_TEXT',
    HORIZONTAL_LIST = 'HORIZONTAL_LIST',
    FULL_SCREEN_LIST = 'FULL_SCREEN_LIST',
    VERTICAL_LIST = 'VERTICAL_LIST',
    VIDEO_PLAYER = 'VIDEO_PLAYER',
    IMAGE_DISPLAY = 'IMAGE_DISPLAY',
    FULL_TEXT = 'FULL_TEXT',
    CHECK_LIST = 'CHECK_LIST',
    ANALOG_CLOCK = 'ANALOG_CLOCK',
    DANCING_EQUALIZER_BARS = 'DANCING_EQUALIZER_BARS',
    PARALLAX_EFFECT = 'PARALLAX_EFFECT',
    ANIMATED_BACKGROUND = 'ANIMATED_BACKGROUND',
    ANIMATION = 'ANIMATION',
    START_FROM_SCRATCH = 'START_FROM_SCRATCH',
    LONG_TEXT_SAMPLE = 'LONG_TEXT_SAMPLE',
    IMAGE_RIGHT_DETAIL_SAMPLE = 'IMAGE_RIGHT_DETAIL_SAMPLE',
    IMAGE_LEFT_DETAIL_SAMPLE = 'IMAGE_LEFT_DETAIL_SAMPLE',
    SHORT_TEXT_SAMPLE = 'SHORT_TEXT_SAMPLE',
    IMAGE_DISPLAY_SAMPLE = 'IMAGE_DISPLAY_SAMPLE',
    TEXT_FORWARD_LIST_SAMPLE = 'TEXT_FORWARD_LIST_SAMPLE',
    IMAGE_FORWARD_LIST_SAMPLE = 'IMAGE_FORWARD_LIST_SAMPLE',
    CARDS_LAYOUT = 'CARDS_LAYOUT',
    SIMPLE_TEXT_AND_IMAGE = 'SIMPLE_TEXT_AND_IMAGE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    FULLSCREEN_VIDEO_PLAYER = 'FULLSCREEN_VIDEO_PLAYER',
    AUDIO_PLAYER = 'AUDIO_PLAYER',
    MRB_GRID_LIST = 'MRB_GRID_LIST',
    MRB_HEADLINE = 'MRB_HEADLINE',
    MRB_IMAGE_LIST = 'MRB_IMAGE_LIST',
    MRB_PAGINATED_LIST = 'MRB_PAGINATED_LIST',
    MRB_TEXT_LIST = 'MRB_TEXT_LIST'
}

/**
 * This is a mapping that contains the contents of sample templates.
 */
const SAMPLE_TEMPLATE_METADATA : Map<string, ISampleTemplate> = Map({
    IMAGE_RIGHT_DETAIL : {
        apl: detailImageRightApl,
        data: detailImageRightData
    },
    IMAGE_LEFT_DETAIL : {
        apl: detailImageLeftApl,
        data: detailImageLeftData
    },
    GRID_LIST : {
        apl: gridListDarkApl,
        data: gridListDarkData
    },
    HEADLINE : {
        apl: headlineDarkApl,
        data: headlineDarkData
    },
    IMAGE_LIST : {
        apl: imageListDarkApl,
        data: imageListDarkData
    },
    PAGINATED_LIST : {
        apl: paginatedListDarkApl,
        data: paginatedListDarkData
    },
    TEXT_LIST : {
        apl: textListDarkApl,
        data: textListDarkData
    },
    DETAILS : {
        apl: detailImageRightLightApl,
        data: detailImageRightLightData
    },
    GRID : {
        apl: gridListLightApl,
        data: grigListLightData
    },
    SHORT_TEXT : {
        apl: headlineLightApl,
        data: headlineLightData
    },
    HORIZONTAL_LIST : {
        apl: imageListLightApl,
        data: imageListLightData
    },
    FULL_SCREEN_LIST : {
        apl: paginatedListLightApl,
        data: paginatedListLightData
    },
    VERTICAL_LIST : {
        apl: textListLightApl,
        data: textListLightData
    },
    VIDEO_PLAYER : {
        apl: videoPlayerApl,
        data: videoPlayerData
    },
    IMAGE_DISPLAY : {
        apl: imageDisplayApl,
        data: imageDisplayData
    },
    FULL_TEXT : {
        apl: longTextApl,
        data: longTextData
    },
    CHECK_LIST : {
        apl: checkListApl,
        data: checkListData
    },
    ANALOG_CLOCK : {
        apl: aplAnalogClockApl,
        data: aplAnalogClockData
    },
    DANCING_EQUALIZER_BARS : {
        apl: aplEqualizerApl,
        data: aplEqualizerData
    },
    ANIMATED_BACKGROUND : {
        apl: aplAnimateLeafsBgApl,
        data: aplAnimateLeafsBgData
    },
    PARALLAX_EFFECT : {
        apl: parallaxEffectApl,
        data: parallaxEffectData
    },
    ANIMATION : {
        apl: animationApl,
        data: animationData
    },
    START_FROM_SCRATCH : {
        apl: defaultApl,
        data: defaultData
    },
    LONG_TEXT_SAMPLE : {
        apl: longTextSampleApl,
        data: longTextSampleData
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
        apl: imageDisplaySampleApl,
        data: imageDisplaySampleData
    },
    TEXT_FORWARD_LIST_SAMPLE : {
        apl: textForwardListApl,
        data: textForwardListData
    },
    IMAGE_FORWARD_LIST_SAMPLE : {
        apl: imageForwardlistApl,
        data: imageForwardListData
    },
    CARDS_LAYOUT: {
        apl: cardsLayoutApl,
        data: cardsLayoutData
    },
    SIMPLE_TEXT_AND_IMAGE: {
        apl: simpleTextApl,
        data: simpleTextData
    },
    MULTIPLE_CHOICE: {
        apl: multipleChoiceApl,
        data: multipleChoiceData
    },
    FULLSCREEN_VIDEO_PLAYER: {
        apl: fullscreenVideoPlayerApl,
        data: fullscreenVideoPlayerData
    },
    AUDIO_PLAYER: {
        apl: audioPlayerApl,
        data: audioPlayerData
    },
    MRB_GRID_LIST: {
        apl: gridListDarkApl,
        data: mrbGridListData
    },
    MRB_HEADLINE: {
        apl: mrbHeadlineApl,
        data: mrbHeadlineData
    },
    MRB_IMAGE_LIST: {
        apl: imageListDarkApl,
        data: mrbImageListData
    },
    MRB_PAGINATED_LIST : {
        apl: paginatedListDarkApl,
        data: mrbPaginatedListData
    },
    MRB_TEXT_LIST : {
        apl: textListDarkApl,
        data: mrbTextListData
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
