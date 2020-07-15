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

// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { ThirdPartyComponentLoader } from '../ThirdPartyComponentsLoader';
import * as sinon from 'sinon';
import { PackageLoader, ILoadedResult } from '../PackageLoader';
import { IMPORT_LAYOUT_TEMPLATE } from './template_test_cases/importInternalTemplate';

describe('ThirdPartyComponentLoader', () => {
    const thirdPartyComponentLoader = new ThirdPartyComponentLoader();
    let stub;

    beforeEach(() => {
        stub = sinon.stub(PackageLoader.prototype, 'load').returns(new Promise((resolve) => {
            resolve([{
                json : IMPORT_LAYOUT_TEMPLATE,
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
});
