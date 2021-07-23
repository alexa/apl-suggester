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

import * as ajv from 'ajv';
import { JSON_SCHEMA } from './assets/JsonSchema';
import * as AVGJSONSchema from './assets/graphics/AVG';
import { IValidationInfo } from './validation/index.js';
import { ValidationSeed, Seed } from './validation/ValidationSeed';
import { ValidationErrorFilter } from './util/ValidationErrorFilter';
import { NotificationLevel } from './IValidationInfo';
import { AplComponentsExtractor } from './util/AplComponentsExtractor';
import { IAplComponent } from './util/IAplComponent';
import { ComponentSchemaController } from './ComponentSchemaController';
import { ComponentStructureValidator } from './ComponentStructureValidator';
import { ErrorDefinitions } from './errors/IErrorDefinitions';
import { ErrorController } from './errors/ErrorController';
import { CustomComponentsExtractor } from './util/CustomComponentsExtractor';
import { PrimitiveComponentJsonSchemaUtil } from './util/PrimitiveComponentJsonSchemaUtil';
import { AplGraphicsExtractor } from './util/graphics/AplGraphicsExtractor';
import { GraphicSchemaValidator } from './GraphicSchemaValidator';
import { IAplGraphic } from './util/graphics/IAplGraphic';
import { AplCommandsExtractor } from './util/commands/AplCommandsExtractor';
import { CommandSchemaValidator } from './CommandSchemaValidator';
import { IAplCommand } from './util/commands/IAplCommand';
import { containsVariableString } from './util/VariableStringChecker';

/**
 * Static apl json template validator.
 * @export
 * @class StaticAplTemplateValidator
 */
export class StaticAplTemplateValidator {
    /**
     * AJV validation function used for json schema validation.
     * @private
     * @memberof StaticAplTemplateValidator
     */
    private validateFunction;

    /**
     * Instance of ComponentSchemaController.
     * @private
     * @type {ComponentSchemaController}
     * @memberof StaticAplTemplateValidator
     */
    private componentSchemaController : ComponentSchemaController;

    /**
     * Instance of ComponentStructureValidator.
     * @private
     * @type {ComponentStructureValidator}
     * @memberof StaticAplTemplateValidator
     */
    private componentStructureValidator : ComponentStructureValidator;

    /**
     * Instance of AplComponentsExtractor.
     * @private
     * @type {ComponentSchemaController}
     * @memberof StaticAplTemplateValidator
     */
    private aplComponentExtractor : AplComponentsExtractor;

    /**
     * instance of ErrorController
     * @private
     * @type {ErrorController}
     * @memberOf StaticAplTemplateValidator
     */
    private errorController : ErrorController;

    /**
     * Instance of CustomComponentsExtractor.
     *
     * @private
     * @type {CustomComponentsExtractor}
     * @memberof StaticAplTemplateValidator
     */
    private customComponentsExtractor;

    /**
     * Instance of AplGraphicsExtractor.
     *
     * @private
     * @type {AplGraphicsExtractor}
     * @memberof StaticAplTemplateValidator
     */
    private aplGraphicsExtractor;

    /**
     * Instance of GraphicSchemaValidator.
     *
     * @private
     * @type {GraphicSchemaValidator}
     * @memberof StaticAplTemplateValidator
     */
    private graphicSchemaValidator;

    /**
     * Instance of AplCommandsExtractor.
     *
     * @private
     * @type {AplCommandsExtractor}
     * @memberof StaticAplTemplateValidator
     */
    private aplCommandsExtractor;

    /**
     * Instance of CommandSchemaValidator.
     *
     * @private
     * @type {CommandSchemaValidator}
     * @memberof StaticAplTemplateValidator
     */
    private commandSchemaValidator;

    /**
     * Creates an instance of StaticAplTemplateValidator.
     * @memberof StaticAplTemplateValidator
     */
    constructor() {
        this.validateFunction = ajv({
            jsonPointers : true,
            allErrors : true,
            verbose : true
        })
            .addSchema(AVGJSONSchema.JSON_SCHEMA)
            .compile(JSON_SCHEMA);
        this.aplComponentExtractor = AplComponentsExtractor.getInstance();
        this.componentSchemaController = ComponentSchemaController.getInstance();
        this.componentStructureValidator = ComponentStructureValidator.getInstance();
        this.errorController = ErrorController.getInstance();
        this.customComponentsExtractor = CustomComponentsExtractor.getInstance();
        this.aplGraphicsExtractor = AplGraphicsExtractor.getInstance();
        this.graphicSchemaValidator = GraphicSchemaValidator.getInstance();
        this.aplCommandsExtractor = AplCommandsExtractor.getInstance();
        this.commandSchemaValidator = CommandSchemaValidator.getInstance();
    }

    private validateCommands(aplTemplate : object) : IValidationInfo[] {
        const commands : IAplCommand[] = this.aplCommandsExtractor.extractCommands(aplTemplate);

        const standardCommandTypes = Array.from(CommandSchemaValidator.COMMAND_TYPE_TO_JSON_SCHEMA.keys());
        // run schema validation against all standard Commands.
        const schemaErrors = commands
        .filter((c) => standardCommandTypes.includes(c.commandType))
        .map((c) => {
            return this.commandSchemaValidator.validateCommand(c.jsonObject, c.commandType)
            .map((e) => this.getComponentErrorWithFullPath(e, c.jsonPath));
        });

        return schemaErrors
        .reduce((result, nextItem) => result.concat(nextItem), []);
    }

    private validateGraphics(aplTemplate : object) : IValidationInfo[] {
        const graphics : IAplGraphic[] = this.aplGraphicsExtractor.extractGraphics(aplTemplate);

        // run schema validation against all APL Graphics.
        const schemaErrors = graphics
        // filter out the root graphics
        .filter((g) => g.graphicType !== undefined)
        .map((g) => {
            return this.graphicSchemaValidator.validateGraphic(g.jsonObject, g.graphicType)
            .map((e) => this.getComponentErrorWithFullPath(e, g.jsonPath));
        });

        return schemaErrors
        .reduce((result, nextItem) => result.concat(nextItem), []);
    }

    private async validateAllComponents(aplTemplate : object) : Promise<IValidationInfo[]> {
        const components : IAplComponent[] = this.aplComponentExtractor.extractComponents(aplTemplate);

        // run structural validation on APL Components.
        const primitiveComponentTypes = PrimitiveComponentJsonSchemaUtil
        .getPrimitiveComponentTypes(aplTemplate['version']);
        const customComponentTypes = await this.customComponentsExtractor
        .getCustomComponentTypesAndValidate(aplTemplate);
        const availableComponentTypes = primitiveComponentTypes.concat(customComponentTypes);
        const structureErrors = components
        .filter((c) => !this.componentSchemaController.isCustomComponent(c.jsonPath)
        && this.isComponentTypeValid(c, availableComponentTypes))
        .map((c) => {
            const validationSeed = new ValidationSeed(
                new Seed(c.jsonObject, c.jsonPath), new Seed(c.parentComponent));
            return this.componentStructureValidator.validate(validationSeed);
        });

        // run schema validation against all supported APL Component types.
        const schemaErrors = await Promise.all(components
        .filter((c) => primitiveComponentTypes.includes(c.componentType))
        .map(async (c) : Promise<IValidationInfo[]> => {
            const errs : IValidationInfo[] =
                await this.componentSchemaController.validateComponent(
                    aplTemplate, c.jsonObject, c.componentType, c.parentComponentType);
            return errs.map((e) => this.getComponentErrorWithFullPath(e, c.jsonPath));
        }));

        return structureErrors
        .concat(schemaErrors)
        .reduce((result, nextItem) => result.concat(nextItem), []);
    }

    /**
     * Publish validation notification based on given APL template.
     * @param {object} aplTemplate
     * @returns {boolean} to indicate whether given apl template is valid.
     * @memberof StaticAplTemplateValidator
     */
    public async validate(aplTemplate : object) : Promise<IValidationInfo[]> {
        const componentErrors = await this.validateAllComponents(aplTemplate);
        if (this.validateFunction(aplTemplate)) {
            return componentErrors
            .concat(this.validateGraphics(aplTemplate))
            .concat(this.validateCommands(aplTemplate));
        }
        const filteredErrors = ValidationErrorFilter.filterErrors(
            this.validateFunction.errors, ValidationErrorFilter.singleDataPathFilter);
        const jsonSchemaErrors = filteredErrors.map((eachError) => {
            return StaticAplTemplateValidator.asValidationWarnInfo(eachError);
        });
        const uniqueErrors = jsonSchemaErrors.concat(
            componentErrors.filter((componentError) =>
                jsonSchemaErrors.find((schemaError) => schemaError.path === componentError.path) === undefined
            )
        );
        return uniqueErrors;
    }

    /**
     * Publish validation notification based on given DataSources template.
     * @param {object} dataSources
     * @returns {IValidationInfo[]} validation warnings.
     * @memberof StaticAplTemplateValidator
     */
    public async validateDataSources(dataSources : object) : Promise<IValidationInfo[]> {
        return Object.keys(dataSources).filter((key) => !this.isObject(dataSources[key]))
            .map((key) => StaticAplTemplateValidator.asValidationWarnInfo({
                dataPath: `Data.${key}`,
                message: `${key} in DataSources should be an object`
            }));
    }

    /**
     * Publish validation notification based on given sources.
     * @param {object} sources
     * @returns {IValidationInfo[]} validation warnings.
     * @memberof StaticAplTemplateValidator
     */
    public async validateSources(sources : object) : Promise<IValidationInfo[]> {
        if (!this.isObject(sources)) {
            return [
                StaticAplTemplateValidator.asValidationWarnInfo({
                    dataPath: '',
                    message: 'sources should be an object'
                })
            ];
        }
        return Object.keys(sources).filter((key) => !this.isObject(sources[key]))
            .map((key) => StaticAplTemplateValidator.asValidationWarnInfo({
                dataPath: `/${key}`,
                message: `${key} in sources should be an object`
            }));
    }

    private isObject(obj : any) : boolean {
        return (!!obj) && (obj.constructor === Object);
    }

    /**
     * Convert error object to IValidationInfo.
     * @public
     * @param {object} error
     * @returns {IValidationInfo}
     */
    public static asValidationWarnInfo(error : object) : IValidationInfo {
        let message = error['message'];
        switch (error['keyword']) {
            case 'enum' : {
                message = error['message'] + ' : ' + error['params']['allowedValues'];
                break;
            }
            case 'additionalProperties' : {
                message = error['message'] + ' : ' + error['params']['additionalProperty'];
                break;
            }
            case 'pattern' : {
                if (error['schemaPath'].indexOf('dimension') >= 0) {
                    message = 'should be number or one of valid dimension : auto,px,dp,vw,vh,%';
                }
                break;
            }
            default : {
                message = error['message'];
            }
        }
        return {
            path : error['dataPath'] === '' ? '/' : error['dataPath'],
            errorMessage : message,
            level : NotificationLevel.WARN
        };
    }

    private getComponentErrorWithFullPath(componentError : IValidationInfo, componentPath : string) : IValidationInfo {
        if (componentError.path === '/') {
            return { ...componentError, ...{path: componentPath} };
        } else {
            return { ...componentError, ...{path: componentPath + componentError.path} };
        }
    }

    private isComponentTypeValid(component : IAplComponent, availableComponentTypes : string[]) : boolean {
        if (!component.componentType) {
            this.errorController.triggerValidationError(
                ErrorDefinitions.COMPONENT_BUILDER_UNABLE_TO_FIND_TYPE.code,
                {
                    item: component.jsonObject,
                    path: component.jsonPath
                }
            );
            return false;
        }

        // Not a Primitive component and not a data binding expression(any string contains ${})
        if (!availableComponentTypes.includes(component.componentType) &&
            !containsVariableString(component.componentType)) {
            this.errorController.triggerValidationError(
                ErrorDefinitions.META_TEMPLATE_UNABLE_TO_FIND_LAYOUT.code,
                {
                    name: component.componentType,
                    path: component.jsonPath + '/type'
                }
            );
            return false;
        }

        return true;
    }
}
