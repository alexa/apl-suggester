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

import { PackageLoader, ILoadedResult } from './PackageLoader';

/**
 * Loader to load third party custom components to internal data model.
 * Cache duplicatd fetching by using url as unique key.
 */
export class ThirdPartyComponentLoader {
    /**
     * Key (url/name) to IAplComonent[] map, used as cache.
     * @private
     * @memberof ThirdPartyComponentLoader
     */
    private packageToComponentPromiseMap : Map<string, Promise<ILoadedResult[]>>;

    private static instance : ThirdPartyComponentLoader;

    /**
     * Creates an instance of ThirdPartyComponentLoader.
     * Make it public only for testing.
     * @memberof ThirdPartyComponentLoader
     */
    public constructor() {
        this.packageToComponentPromiseMap = new Map<string, Promise<ILoadedResult[]>>();
    }

    /**
     * Singleton method.
     * @static
     * @returns
     * @memberof ThirdPartyComponentLoader
     */
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ThirdPartyComponentLoader();
        }
        return this.instance;
    }

    /**
     * Load packages.
     * @param {any[]} importPackages
     * @returns {Promise<IAplComponent[]>}
     * @memberof ThirdPartyComponentLoader
     */
    public async load(importPackages : any[]) : Promise<ILoadedResult[]> {
        if (!importPackages) {
            return [];
        }

        const result = await Promise.all(importPackages.map((eachPackage) => {
            return this.loadSinglePackage(eachPackage);
        }));
        return [].concat(...result);
    }

    private loadSinglePackage(singlePackage : object) : Promise<ILoadedResult[]> {
        let uniqueKey = singlePackage['name'];
        if (singlePackage['source']) {
            uniqueKey = singlePackage['source'];
        }
        if (singlePackage['version']) {
            uniqueKey += '_' + singlePackage['version'];
        }
        const promiseForGivenPackage = this.packageToComponentPromiseMap.get(uniqueKey);
        if (promiseForGivenPackage) {
            return promiseForGivenPackage;
        } else {
            const packageList = new PackageLoader({}).load([singlePackage]);
            this.packageToComponentPromiseMap.set(uniqueKey, packageList);
            return packageList;
        }
    }
}
