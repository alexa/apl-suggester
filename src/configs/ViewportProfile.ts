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

import { OrderedMap } from 'immutable';

import * as hubRound from './viewportProfiles/hubRound.json';
import * as hubLandscapeSmall from './viewportProfiles/hubLandscapeSmall.json';
import * as hubLandscapeMedium from './viewportProfiles/hubLandscapeMedium.json';
import * as hubLandscape from './viewportProfiles/hubLandscape.json';
import * as hubLandscapeExtraLarge from './viewportProfiles/hubLandscapeXL.json';
import * as hubLandscapePortraitMedium from './viewportProfiles/hubLandscapePortraitMedium.json';
import * as tvFullscreen from './viewportProfiles/tvFullscreen.json';
import * as mobileSmall from './viewportProfiles/mobileSmall.json';
import * as mobileMedium from './viewportProfiles/mobileMedium.json';
import * as mobileLarge from './viewportProfiles/mobileLarge.json';

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
    TV = 'tv',
    MOBILE = 'mobile'
}

/**
 * Type of viewport profile
 * @export
 * @enum {string}
 */
export enum ViewportType {
    STANDARD = 'standard',
    OVERLAY = 'overlay'
}

/**
 * The interface of a viewport profile
 * @export
 * @interface IViewportProfile
 * @property {string} id - id of the viewport profile such as "hubLandscapeMedium"
 * @property {string} name - name of viewport profile such as 'Hub Landscape Medium"
 * @property {ViewportShape} shape - shape of viewport profile
 * @property {ViewportType} type - type of the viewport profile, optional for custom viewport
 * @property {ViewportMode} mode - mode of viewport profile, optional for custom viewport
 * @property {IViewportProfileSizeRange} dpSizeRange - size range in dp of viewport profile
 * @property {IViewport[]} exampleDevices - default viewports of viewport profile
 * @property {boolean} isCustom - is custom viewport profile
 *
 */
export interface IViewportProfile {
    id : string;
    name : string;
    shape : ViewportShape;
    type? : ViewportType;
    mode? : ViewportMode;
    dpSizeRange : IViewportProfileSizeRange;
    exampleDevices : IViewport[];
    isCustom? : boolean;
    label? : string;
    svgIcon? : string;
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
    fullscreenDeviceId? : string;
    fullscreenHeight? : number;
    fullscreenWidth? : number;
    fullScreenViewportProfile? : string;
    fullScreenViewportProfileLabel? : string;
    svgIcon? : string;
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

const HUB_LANDSCAPE : IViewportProfile = hubLandscape as IViewportProfile;

/**
 * This is a mapping that contains the contents of vieport profiles.
 */
const VIEWPORT_PROFILE_METADATA : OrderedMap<string, IViewportProfile> = OrderedMap({
    hubRound : hubRound as IViewportProfile,
    hubLandscapeSmall : hubLandscapeSmall as IViewportProfile,
    hubLandscapeMedium : hubLandscapeMedium as IViewportProfile,
    hubLandscape : HUB_LANDSCAPE,
    hubLandscapeExtraLarge : hubLandscapeExtraLarge as IViewportProfile,
    hubLandscapePortraitMedium : hubLandscapePortraitMedium as IViewportProfile,
    tvFullscreen : tvFullscreen as IViewportProfile,
    mobileSmall : mobileSmall as IViewportProfile,
    mobileMedium : mobileMedium as IViewportProfile,
    mobileLarge : mobileLarge as IViewportProfile
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
    return HUB_LANDSCAPE;
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
