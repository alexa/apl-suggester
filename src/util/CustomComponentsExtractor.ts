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
import { ThirdPartyComponentLoader } from './ThirdPartyComponentsLoader';
import { IJsonSchema } from '../assets/IJsonSchema';
import { CustomComponentJsonSchemaGenerator } from './CustomComponentJsonSchemaGenerator';
import { ILoadedResult } from './PackageLoader';
import { ErrorDefinitions } from '../errors/IErrorDefinitions';
import { ErrorController } from '../errors/ErrorController';

export class AplComponentRepresentation {
    private aplTemplates : object[];
    private componentTypeToJsonSchemaMap : Map<string, IJsonSchema>;

    constructor(aplTemplates : object[]) {
        this.aplTemplates = aplTemplates;
        this.componentTypeToJsonSchemaMap = new Map<string, IJsonSchema>();
        this.fillCustomComponentMap();
    }

    public getCustomComponentNames() : string[] {
        return Array.from(this.componentTypeToJsonSchemaMap.keys());
    }

    private fillCustomComponentMap() {
        this.aplTemplates
        .map((aplTemplate) => Object.entries(getTemplateLayouts(aplTemplate)))
        .reduce((item, nextItem) => item.concat(nextItem), [])
        .forEach((entry) => {
            this.componentTypeToJsonSchemaMap.set(
                entry[0],
                CustomComponentJsonSchemaGenerator.generate(entry[1]['parameters'] || []));
        });
    }

    public getCustomComponentJsonSchema(componentName : string) : IJsonSchema {
        return this.componentTypeToJsonSchemaMap.get(componentName);
    }
}

/**
 * Used to extract custom components including imported packages
 * @export
 * @class CustomComponentsExtractor
 */
export class CustomComponentsExtractor {
    private thirdPartyComponentLoader = ThirdPartyComponentLoader.getInstance();

    /**
     * Instance of CustomComponentsExtractor.
     *
     * @private
     * @static
     * @type {ThirdPartyComponentsExtractor}
     * @memberof ThirdPartyComponentsExtractor
     */
    private static instance : CustomComponentsExtractor;

    private constructor() {
    }

    /**
     * Singleton method.
     *
     * @static
     * @returns {CustomComponentsExtractor}
     * @memberof CustomComponentsExtractor
     */
    public static getInstance() : CustomComponentsExtractor {
        if (!this.instance) {
            this.instance = new CustomComponentsExtractor();
        }
        return this.instance;
    }

    /**
     * Extract custom components including imported packages.
     * @param aplTemplate
     */
    public async extractCustomComponents(aplTemplate : object) : Promise<AplComponentRepresentation> {
        const loadResults : ILoadedResult[] = await this.thirdPartyComponentLoader.load(aplTemplate['import'] || []);
        const aplTemplates = loadResults
        .map((loadResult) => loadResult.json)
        .filter((jsonObject) => Object.entries(getTemplateLayouts(jsonObject)).length !== 0)
        .concat(aplTemplate);
        return new AplComponentRepresentation(aplTemplates);
    }

    /**
     * get custom component types including imported packages and trigger error if there is package not imported
     * @param aplTemplate
     */
    public async getCustomComponentTypesAndValidate(aplTemplate : object) : Promise<string[]> {
        const loadResults : ILoadedResult[] = await this.thirdPartyComponentLoader.load(aplTemplate['import'] || []);
        return loadResults
        .filter(this.isValidLoadResult)
        .map((loadResult) => loadResult.json)
        .concat(aplTemplate)
        .map((jsonObject) => Object.keys(getTemplateLayouts(jsonObject)))
        .reduce((item, nextItem) => item.concat(nextItem), []);
    }

    private isValidLoadResult(loadResult : ILoadedResult) : boolean {
        if (Object.keys(loadResult.json).length === 0) {
            const errorController = ErrorController.getInstance();
            errorController.triggerValidationError(
                ErrorDefinitions.PACKAGE_LOADER_CANNOT_FETCH_URL.code,
                {
                    url: loadResult.name,
                    path: '/import',
                    error: loadResult.error
                }
            );
            return false;
        }

        return true;
    }
}

function getTemplateLayouts(aplTemplate : any) : Object {
    // if document doesn't specify exported layouts we assume that all layouts are available to consumers
    const allLayouts = aplTemplate.layouts || {};
    if (!aplTemplate.export) {
        return allLayouts;
    } else {
        const templates = {};
        aplTemplate.export.layouts?.
          map((exportedLayout) => ((typeof exportedLayout  === 'string') ? exportedLayout : exportedLayout.name)).
          forEach((templateName) => templates[templateName] = allLayouts[templateName]);
        return templates;
    }
}
