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
import {
    getViewportProfiles,
    getDefaultViewportProfile,
    getDefaultViewport,
    IViewport,
    IViewportProfile
} from '../ViewportProfile';

describe('ViewportProfile', () => {
    it('should viewporProfiles profile has contents.', () => {
        getViewportProfiles().valueSeq().forEach((viewportProfile : IViewportProfile) => {
            expect(viewportProfile).to.be.an('object');
        });
    });

    it('should default viewporProfile profile has contents.', () => {
        const viewportProfile : IViewportProfile = getDefaultViewportProfile();
        expect(viewportProfile).to.be.an('object');
    });

    it('should viewporProfiles profile has contents.', () => {
        const viewportProfile : IViewport = getDefaultViewport();
        expect(viewportProfile).to.be.an('object');
    });
});
