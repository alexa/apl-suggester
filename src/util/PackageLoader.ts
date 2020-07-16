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

const PREDEFINED_HOST : string = 'https://d2na8397m465mh.cloudfront.net/packages';
const PREDEFINED_FILE_NAME : string = 'document.json';
/**
 *
 * Package loading theory.
 * 1. We start with a list of packages required.
 * 2. Each package in the list can be in one of the following states:
 *    a. Unloaded (not started yet)
 *    b. Loading (waiting for a response from the server)
 *    c. Loaded (waiting for a child to load)
 *    d. Finished (all children have loaded)
 *
 * @export
 * @class PackageLoader
 */
export class PackageLoader {
    /**
     * The package json file provided by the user
     * @private
     * @type {object}
     * @memberOf PackageLoader
     */
    private embeddedPackages : object;

    /**
     * The invalid imported packages
     * @private
     * @type {string[]} An array that holds all names of invalid imported packages
     * @memberOf PackageLoader
     */
    private invalidPackages : string[];

    /**
     * The packages map connects package name to data. It stores:
     *     name -> { json: JSON,
     *               state: load|loadChildren|done,
     *               loadSeries: NUMBER,
     *             }
     *
     * @private
     * @type {Map<string, ILoadingProcessData>}
     * @memberOf PackageLoader
     */
    private loadPackages : Map<string, ILoadingProcessData>;

    /**
     * The number of loading times
     * @private
     * @type {number}
     * @memberOf PackageLoader
     */
    private loadSeries : number;

    /**
     * Initialize PackageLoader attributes
     *
     * @param {object} embeddedPackages The package json file provided by the user
     *
     * @memberOf PackageLoader
     */
    constructor(embeddedPackages : object) {
        this.loadPackages = new Map<string, ILoadingProcessData>();
        this.embeddedPackages = embeddedPackages;
        this.invalidPackages = [];
        this.loadSeries = 0;
    }

    /**
     *   Load import packages
     */
    public async load(importPackages : any[]) : Promise<ILoadedResult[]> {
        this.loadSeries += 1;
        if (importPackages) {
            await this.ensureLoaded(importPackages);
            const packageNames = this.orderedPackageNames(importPackages);
            return this.namesToData(packageNames);
        } else {
            return [];
        }
    }

    /**
     * Flush loaded packages
     */
    public flush() {
        this.loadPackages.clear();
        this.invalidPackages = [];
        return;
    }

    /**
     * Walk a list of packages until all of them have been loaded.
     */
    private async ensureLoaded(packageList : any[]) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(packageList)) {
                resolve();
                return;
            }
            let count = packageList.length;

            if (count > 0) {
                packageList.forEach(async (pkg) => {
                    await this.loadPackage(pkg.name, pkg.version, pkg.source, packageList.indexOf(pkg));
                    count -= 1;
                    if (count === 0) {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Execute a package load.  For now we ignore version
     */
    private async loadPackage(name : string, version : string, url : string, idx : number) : Promise<any> {
        if (this.loadPackages.get(name)) {
            const data : ILoadingProcessData = this.loadPackages.get(name);
            if (data.state === LoadState.done) {
                return Promise.resolve();
            }
        } else {
            this.loadPackages.set(name, {
                state: LoadState.load,
                loadSeries: this.loadSeries,
                json: undefined
            });
            const pkg : ILoadingProcessData = this.loadPackages.get(name);

            // If we're trying to load from pre-defined packages, hardcoded url
            // More information:
            // https://wiki.labcollab.net/confluence/pages/viewpage.action?spaceKey=
            // Doppler&title=Adding+or+editing+Alexa-provided+%28APML%29+Packages

            // Pre-defined packages can be override by customer provided package json file
            if (!url && !this.embeddedPackages[name]) {
                url = `${PREDEFINED_HOST}/${name}/${version}/${PREDEFINED_FILE_NAME}`;
            }

            if (url) {
                return axios.get(url).then((response) => {
                    return response.data;
                }).then(async (jsonResponse) => {
                    pkg.json = this.deepFreeze(jsonResponse);
                    pkg.state = LoadState.loadChildren;
                    await this.ensureLoaded(pkg.json['import']);
                    pkg.state = LoadState.done;
                    return Promise.resolve();
                }).catch((error) => {
                    pkg.json = {};
                    pkg.state = LoadState.done;
                    return Promise.resolve();
                });
            } else {
                if (!this.embeddedPackages[name]) {
                    this.invalidPackages.push(name);
                } else {
                    pkg.json = this.deepFreeze(this.embeddedPackages[name]['document']);
                    pkg.state = LoadState.loadChildren;
                    await this.ensureLoaded(this.embeddedPackages[name]['document'].import);
                    pkg.state = LoadState.done;
                    return Promise.resolve();
                }
            }
        }
    }

    /**
     *  Walk a list of packages and return all dependencies in order.
     *  Those two functions are following the depth-first search, following the package import order.
     */
    private orderedPackageNames(packageList : any[]) {
        if (packageList.length === 0) {
            return [];
        }
        // filter out invalid packages first
        packageList = packageList.filter(function (e) {
            return this.indexOf(e.name) < 0;
        }, this.invalidPackages);

        const sorted = [];
        const visited = {};

        for (const pkg of packageList) {
            this.addPackageNames(pkg, [], sorted, visited);
        }

        sorted.reverse();
        return sorted;
    }

    /**
     *   Embeded function for orderedPackageNames.
     *   Depth first search a list of packages and return all dependencies in order.
     */
    private addPackageNames(pkg : any, ancestors : string[], sorted : string[], visited : any) {
        const name = pkg.name;
        ancestors.push(name);
        visited[name] = true;

        const dependentList = this.loadPackages.get(name).json['import'] || [];

        // push the first package into sorted list
        if (sorted.indexOf(name) < 0) {
            sorted.push(name);
        }

        for (const dep of dependentList) {
            // if find a circle import, exit
            if (ancestors.indexOf(dep.name) >= 0 || visited[dep.name]) {
                // if the dep is already visited before, need adjust order
                // to make sure the resources will be loaded in correct order
                const idx = sorted.indexOf(name);
                const childIdx = sorted.indexOf(dep.name);
                if (idx > childIdx) {
                    sorted[childIdx] = name;
                    sorted[idx] = dep.name;
                }
                return;
            }
            if (sorted.indexOf(dep.name) < 0) {
                sorted.push(dep.name);
            }
            this.addPackageNames(dep, ancestors.slice(), sorted, visited);
        }
    }

    /*
     * This is the actual data structure that will be returned by the loader.  In other words,
     * you will receive an array, where each item in the array is of the form:
     *
     * [
     *   { "name": NAME, "json": JSON, justLoaded: true/false },
     *   :
     * ]
     *
     * The list of packages is in resource order; later packages should override earlier.
     */
    private namesToData(packageNames : any[]) : ILoadedResult[] {
        return packageNames.map((name) => {
            return {
                name,
                json: this.loadPackages.get(name).json,
                justLoaded: this.loadPackages.get(name).loadSeries === this.loadSeries
            };
        });
    }

    /**
     *   Deep-freeze object to ensure JSON is never modified
     */
    private deepFreeze(obj : object) {
        return JSON.parse(JSON.stringify(obj));
    }
}

/**
 * During loading packages, use ILoadingProcessData to track loading process
 *
 * @export
 * @interface ILoadingProcessData
 */
export interface ILoadingProcessData {
    json : object;
    state : LoadState;
    loadSeries : number;
}

/**
 * Loading process contains:
 * - load : start loading this package
 * - loadChildren : start loading the children of this package
 * - done : finish loading this package
 *
 * @export
 * @enum {number}
 */
export enum LoadState {
    load = <any> 'load',
    loadChildren = <any> 'loadChildren',
    done = <any> 'done'
}

/**
 * The actual data structure that will be returned by the packageLoader.
 *
 * @export
 * @interface ILoadedResult
 */
export interface ILoadedResult {
    name : string;
    json : object;
    justLoaded : boolean;
}
