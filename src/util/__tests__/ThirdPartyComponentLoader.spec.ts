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

// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { ThirdPartyComponentLoader } from '../ThirdPartyComponentsLoader';
import * as sinon from 'sinon';
import { PackageLoader, ILoadedResult } from '../PackageLoader';
import {
    IMPORT_LAYOUT_TEMPLATE_13,
    IMPORT_ALLOF_ONEOF_PACKAGE_IMPORT
} from './template_test_cases/importInternalTemplate';

describe('ThirdPartyComponentLoader', () => {
    const thirdPartyComponentLoader = new ThirdPartyComponentLoader();
    let stub;

    beforeEach(() => {
        stub = sinon.stub(PackageLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json : IMPORT_LAYOUT_TEMPLATE_13,
                justLoaded : true,
                name : 'alexa-layouts'
            } as ILoadedResult]);
        }));
    });

    afterEach(() => {
        stub.restore();
    });

    it('should load user defined component correctly.', async () => {
        let importPackages = [{
            name: 'alexa-layouts',
            version: '1.0.0'
        }];
        const result = await thirdPartyComponentLoader.load(importPackages);
        expect(result.length).to.be.equal(1);
        expect(stub.called).to.be.true;
        // Reload with the same package and version
        stub.resetHistory();
        const reloadResult = await thirdPartyComponentLoader.load(importPackages);
        expect(reloadResult.length).to.be.equal(1);
        expect(stub.called).to.be.false;
        // Reload with the same package but different version
        stub.resetHistory();
        let reloadPackages = [{
            name: 'alexa-layouts',
            version: '1.1.0'
        }];
        const differentVersionResult = await thirdPartyComponentLoader.load(reloadPackages);
        expect(differentVersionResult.length).to.be.equal(1);
        expect(stub.called).to.be.true;
    });

    it('should only load root level "package" type import', async () => {
        let importPackages = IMPORT_ALLOF_ONEOF_PACKAGE_IMPORT;
        const result = await thirdPartyComponentLoader.load(importPackages);
        expect(result.length).to.be.equal(3);
        expect(stub.called).to.be.true;
    });
});
