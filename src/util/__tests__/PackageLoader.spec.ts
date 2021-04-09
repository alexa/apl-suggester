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

'use strict';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { expect } from 'chai';

import { PackageLoader } from '../PackageLoader';
import { IMPORT_GUI_TEMPLATE } from './template_test_cases/importGUITemplate';
import { IMPORT_ALEXA_VIEWPORT_PROFILES, IMPORT_LAYOUT_TEMPLATE_10, IMPORT_STYLES_TEMPLATE }
    from './template_test_cases/importInternalTemplate';
import { INTERNAL_ALEXA_GUI_SOURCE, packageJson } from './template_test_cases/packageJsonTemplate';

describe('PackageLoader', () => {
    let packageLoader : PackageLoader;

    it('should import from internal apl package, depth-first, following the package import order', (done) => {
        let importPackages = [{
            name: 'alexa-gui',
            version: '1.0.0'
        }];
        packageJson['alexa-gui']['document'] = INTERNAL_ALEXA_GUI_SOURCE;
        packageLoader = new PackageLoader(packageJson);
        packageLoader.load(importPackages)
            .then((result) => {
                let packageName = result.map((pkg) => {
                    return pkg.name;
                });
                expect(packageName).to.eql(['alexa-styles-extend', 'anything', 'alexa-styles-classic', 'alexa-gui']);
                done();
            }).catch((error) => {
                done(`load should have been successful. test failing with error ${error}`);
            });
    });

    it('test case 2 should import from internal apl package, following the package import order', (done) => {
        const importPackages = [{
            name: 'alexa-gui',
            version: '1.0.0'
        }, {
            name: 'alexa-style',
            version: '1.0.0'
        }];
        const json = {
            'alexa-gui': {
                document: {
                    type: 'APL',
                    version: '1.0.0'
                }
            },
            'alexa-style': {
                document: {
                    type: 'APL',
                    version: '1.0.0'
                }
            }
        };
        packageLoader = new PackageLoader(json);
        packageLoader.load(importPackages)
            .then((result) => {
                let packageName = result.map((pkg) => {
                    return pkg.name;
                });
                expect(packageName).to.eql(['alexa-style', 'alexa-gui']);
                done();
            }).catch((error) => {
                done(`load should have been successful. test failing with error ${error}`);
            });
    });

    it('should import from predefined apl package, depth-first, following the package import order', (done) => {
        const LAYOUT_URL : string =
            'https://d2na8397m465mh.cloudfront.net/packages/alexa-layouts/1.0.0/document.json';
        const STYLES_URL : string = 'https://d2na8397m465mh.cloudfront.net/packages/alexa-styles/1.0.0/document.json';
        const VIEWPORT_PROFILES_URL : string =
            'https://d2na8397m465mh.cloudfront.net/packages/alexa-viewport-profiles/1.0.0/document.json';
        let importPackages = [{
            name: 'alexa-layouts',
            version: '1.0.0'
        }];

        let mock = new MockAdapter(axios);
        mock.onGet(LAYOUT_URL).reply(200, IMPORT_LAYOUT_TEMPLATE_10);
        mock.onGet(STYLES_URL).reply(200, IMPORT_STYLES_TEMPLATE);
        mock.onGet(VIEWPORT_PROFILES_URL).reply(200, IMPORT_ALEXA_VIEWPORT_PROFILES);
        packageLoader = new PackageLoader({});
        packageLoader.load(importPackages)
            .then((result) => {
                let packageName = result.map((pkg) => {
                    return pkg.name;
                });
                expect(packageName).to.eql(['alexa-viewport-profiles', 'alexa-styles', 'alexa-layouts']);
                done();
            }).catch((error) => {
                done(`load should have been successful. test failing with error ${error}`);
            });
    });

    it('should be able to import from external apl package', (done) => {
        const URL : string = 'https://s3.amazonaws.com/apml-authoring-assets/urlTemplate.json';
        let importPackages = [{
            name: 'alexa-gui',
            version: '1.0.0',
            source: URL
        }];

        let mock = new MockAdapter(axios);
        mock.onGet(URL).reply(200, IMPORT_GUI_TEMPLATE);

        packageLoader = new PackageLoader({});
        packageLoader.load(importPackages)
            .then((result) => {
                let packageName = result.map((pkg) => {
                    return pkg.name;
                });
                expect(packageName).to.eql(['alexa-gui']);
                done();
            }).catch((error) => {
                done(`load should have been successful. test failing with error ${error}`);
            });
    });
});
