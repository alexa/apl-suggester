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

import { OrderedMap } from 'immutable';

import * as hubRound from './viewporProfiles/hubRound.json';
import * as hubLandscapeSmall from './viewporProfiles/hubLandscapeSmall.json';
import * as hubLandscapeMedium from './viewporProfiles/hubLandscapeMedium.json';
import * as hubLandscape from './viewporProfiles/hubLandscape.json';
import * as tvFullscreen from './viewporProfiles/tvFullscreen.json';

/**
 * Shape of viewport profile
 * Reference: https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-viewport-property.html#shape
 * @export
 * @enum {string}
 */
export enum ViewportShape {
    ROUND = 'round',
    RECTANGLE = 'rectangle'
}

/**
 * Mode of viewport profile
 * Reference:
 * Reference:https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-viewport-property.html
 * #viewport_mode_property
 * @export
 * @enum {string}
 */
export enum ViewportMode {
    HUB = 'hub',
    TV = 'tv'
}

/**
 * The interface of a viewport profile
 * @export
 * @interface IViewportProfile
 * @property {string} id - id of the viewport profile such as "hubLandscapeMedium"
 * @property {string} name - name of viewport profile such as 'Hub Landscape Medium"
 * @property {string} shape - shape of viewport profile
 * @property {string} mode - mode of viewport profile, optional for custom viewport
 * @property {string} dpSizeRange - size range in dp of viewport profile
 * @property {string} exampleDevices - default viewports of viewport profile
 * @property {boolean} isCustom - is custom viewport profile
 *
 */
export interface IViewportProfile {
    id : string;
    name : string;
    shape : ViewportShape;
    mode? : ViewportMode;
    dpSizeRange : IViewportProfileSizeRange;
    exampleDevices : IViewport[];
    isCustom? : boolean;
}

/**
 * The interface of a viewport
 * @export
 * @interface IViewport
 * @property {string} id - id of the viewport
 * @property {string} name - name of viewport
 * @property {number} width - width of viewport in dp
 * @property {number} height - height of viewport in dp
 * @property {number} dpi - dpi of viewport
 * @property {ViewportShape} shape - shape of viewport, optional for viewport profile defaults
 *
 */
export interface IViewport {
    id : string;
    name : string;
    width : number;
    height : number;
    dpi : number;
    shape? : ViewportShape;
}

/**
 * The interface of a viewport profile size range
 * @export
 * @interface IViewportProfileSizeRange
 * @property {number} minWidth - minimun width of viewport profile in dp
 * @property {number} maxWidth - maximum width of viewport profile in dp
 * @property {number} minHeight - minimun height of viewport profile in dp
 * @property {number} maxHeight - maximum width of viewport profile in dp
 *
 */
interface IViewportProfileSizeRange {
    minWidth : number;
    maxWidth : number;
    minHeight : number;
    maxHeight : number;
}

const HUB_LANDSCAPE_MEDIUM : IViewportProfile = hubLandscapeMedium as IViewportProfile;

/**
 * This is a mapping that contains the contents of vieport profiles.
 */
const VIEWPORT_PROFILE_METADATA : OrderedMap<string, IViewportProfile> = OrderedMap({
    hubRound : hubRound as IViewportProfile,
    hubLandscapeSmall : hubLandscapeSmall as IViewportProfile,
    hubLandscapeMedium : HUB_LANDSCAPE_MEDIUM,
    hubLandscape : hubLandscape as IViewportProfile,
    tvFullscreen : tvFullscreen as IViewportProfile
});

/**
 * Get viewport profiles.
 * @returns {OrderedMap<string, IViewportProfile>}
 */
export function getViewportProfiles() : OrderedMap<string, IViewportProfile> {
    return VIEWPORT_PROFILE_METADATA;
}

/**
 * Default viewport profile
 * @export
 */
export function getDefaultViewportProfile() : IViewportProfile {
    return HUB_LANDSCAPE_MEDIUM;
}

/**
 * Default viewport
 * @export
 */
export function getDefaultViewport() : IViewport {
    return {
        ...getDefaultViewportProfile().exampleDevices[0],
        shape: getDefaultViewportProfile().shape
    };
}
