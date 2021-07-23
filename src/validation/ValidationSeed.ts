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

/**
 * Seed containing all components need to be validated.
 * @export
 * @class Validator
 */
export class ValidationSeed {
    /**
     * Current component.
     */
    private seedComponent : Seed;
    /**
     * Parent component.
     */
    private parentComponent : Seed;

    /**
     * Constructor.
     * @param seedComponent current component.
     * @param childComponents child components.
     * @param parentComponent parent component.
     */
    constructor(seedComponent : Seed, parentComponent? : Seed) {
        this.seedComponent = seedComponent;
        this.parentComponent = parentComponent;
    }
    /**
     * Return current component.
     */
    public getSeedComponent() : Seed {
        return this.seedComponent;
    }

    public getParentComponet() : Seed {
        return this.parentComponent;
    }
}

/**
 * Seed class containing raw seed and actual values.
 */
export class Seed {
    /**
     * Raw seed.
     * @private
     * @memberof Seed
     */
    private actualSeed;
    /**
     * Json path.
     * @private
     * @memberof Seed
     */
    private jsonPath;

    constructor(actualSeed : object, jsonPath? : string) {
        this.actualSeed = actualSeed;
        this.jsonPath = jsonPath;
    }

    /**
     * Fetch value
     * @param {string} key
     * @returns {*}
     * @memberof Seed
     */
    public getValue(key : string) : any {
        return this.actualSeed[key];
    }

    /**
     * Fetch Json path
     * @returns {string} json path
     * @memberof Seed
     */
    public getJsonPath() : string {
        return this.jsonPath;
    }
}
