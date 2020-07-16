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

import { IJsonSchema } from '../assets/IJsonSchema';
import * as ContainerJSONSchema from '../assets/Container';
import * as FrameJSONSchema from '../assets/Frame';
import * as ImageJSONSchema from '../assets/Image';
import * as ScrollViewJSONSchema from '../assets/ScrollView';
import * as SequenceJSONSchema from '../assets/Sequence';
import * as TextJSONSchema from '../assets/Text';
import * as VideoJSONSchema from '../assets/Video';
import * as TouchWrapperJSONSchema from '../assets/TouchWrapper';
import * as PagerJSONSchema from '../assets/Pager';
import * as VectorGraphicJSONSchema from '../assets/VectorGraphic';
import * as ContainerChildJSONSchema from '../assets/ContainerChild';
import * as SequenceChildJSONSchema from '../assets/SequenceChild';
import * as GridSequenceJSONSchema from '../assets/GridSequence';
import * as GridSequenceChildJSONSchema from '../assets/GridSequenceChild';
import * as EditTextJSONSchema from '../assets/EditText';

/**
 * PrimitiveComponentJsonSchemaUtil.
 * @export
 * @class PrimitiveComponentJsonSchemaUtil
 */
export class PrimitiveComponentJsonSchemaUtil {
    /**
     * APL 1.0 version string.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static APL_1_0_VERSION = '1.0';

    /**
     * All supported primitive component type in APL 1.0 to json schema mapping.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static COMPONENT_TYPE_TO_JSON_SCHEMA_APL_1_0 = new Map<string, IJsonSchema>([
        ['Container', ContainerJSONSchema.JSON_SCHEMA],
        ['Frame', FrameJSONSchema.JSON_SCHEMA],
        ['Image', ImageJSONSchema.JSON_SCHEMA],
        ['ScrollView', ScrollViewJSONSchema.JSON_SCHEMA],
        ['Sequence', SequenceJSONSchema.JSON_SCHEMA],
        ['Text', TextJSONSchema.JSON_SCHEMA],
        ['TouchWrapper', TouchWrapperJSONSchema.JSON_SCHEMA],
        ['Video', VideoJSONSchema.JSON_SCHEMA],
        ['Pager', PagerJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * All supported primitive component type to json schema mapping.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static COMPONENT_TYPE_TO_JSON_SCHEMA = new Map<string, IJsonSchema>([
        ['Container', ContainerJSONSchema.JSON_SCHEMA],
        ['Frame', FrameJSONSchema.JSON_SCHEMA],
        ['Image', ImageJSONSchema.JSON_SCHEMA],
        ['ScrollView', ScrollViewJSONSchema.JSON_SCHEMA],
        ['Sequence', SequenceJSONSchema.JSON_SCHEMA],
        ['Text', TextJSONSchema.JSON_SCHEMA],
        ['TouchWrapper', TouchWrapperJSONSchema.JSON_SCHEMA],
        ['Video', VideoJSONSchema.JSON_SCHEMA],
        ['Pager', PagerJSONSchema.JSON_SCHEMA],
        ['VectorGraphic', VectorGraphicJSONSchema.JSON_SCHEMA],
        ['GridSequence', GridSequenceJSONSchema.JSON_SCHEMA],
        ['EditText', EditTextJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * All supported mixin type to json schema mapping.
     * The extra properties for their child components.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static COMPONENT_TYPE_TO_MIXIN_JSON_SCHEMA = new Map<string, IJsonSchema>([
        ['Container', ContainerChildJSONSchema.JSON_SCHEMA],
        ['Sequence', SequenceChildJSONSchema.JSON_SCHEMA],
        ['GridSequence', GridSequenceChildJSONSchema.JSON_SCHEMA]
    ]);

    /**
     * properties are added after APL 1.0.
     * @static
     * @memberof PrimitiveComponentJsonSchemaUtil
     */
    private static COMPONENT_TYPE_TO_PROPERTIES = new Map<string, string[]>([
        ['Container', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['Frame', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['Image', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel']],
        ['ScrollView', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['Sequence', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['Text', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['TouchWrapper', ['description', 'checked', 'display', 'onMount', 'transform',
        'accessibilityLabel', 'opacity']],
        ['Video', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform', 'onTimeUpdate',
        'accessibilityLabel', 'opacity']],
        ['Pager', ['description', 'checked', 'disabled', 'display', 'onMount', 'transform', 'onPageChanged',
        'accessibilityLabel', 'opacity']]
    ]);

    public static getPrimitiveComponentSchema(
        componentType : string,
        aplVersion : string,
        parentComponentType? : string) : IJsonSchema {
        const componentSchema = this.getJsonSchemaMap(aplVersion).get(componentType);
        if (!componentSchema) {
            return componentSchema;
        }

        const copiedSchema = JSON.parse(JSON.stringify(componentSchema));
        const result = parentComponentType ?
        this.merge(copiedSchema, this.getMixinJsonSchema(parentComponentType)) : copiedSchema;
        if (this.APL_1_0_VERSION === aplVersion) {
            this.filterBlacklistedProperty(componentType, result);
        }
        return result;
    }

    public static getPrimitiveComponentTypes(aplVersion? : string) : string[] {
        return Array.from(this.getJsonSchemaMap(aplVersion).keys());
    }

    private static getJsonSchemaMap(aplVersion : string) : Map<string, IJsonSchema> {
        if (this.APL_1_0_VERSION === aplVersion) {
            return this.COMPONENT_TYPE_TO_JSON_SCHEMA_APL_1_0;
        }

        return this.COMPONENT_TYPE_TO_JSON_SCHEMA;
    }

    /**
     * Find minin Json schema.
     * @param component component name
     */
    private static getMixinJsonSchema(component : string) : IJsonSchema {
        if (!this.COMPONENT_TYPE_TO_MIXIN_JSON_SCHEMA.has(component)) {
            console.warn('No mixin for component : ' + component);
            return undefined;
        }

        const result = this.COMPONENT_TYPE_TO_MIXIN_JSON_SCHEMA.get(component);
        if (!result) {
            console.warn(`Failed to find layoutType for component : ${component}`);
        }
        return result;
    }

    /**
     * Merge mixin json schema to component json schema.
     * @param originalSchema orginal component json schema.
     * @param mixin json schema to mixin.
     */
    private static merge(originalSchema : IJsonSchema, mixin : IJsonSchema) : IJsonSchema {
        if (!mixin) {
            return originalSchema;
        }
        const mixinProperties = mixin.properties;
        const originalProperties = originalSchema.properties;
        originalSchema.properties = { ...originalProperties, ...mixinProperties };
        return originalSchema;
    }

    private static filterBlacklistedProperty(
        componentType : string,
        jsonSchema : IJsonSchema) {
        const blacklistedProperties : string[] = this.COMPONENT_TYPE_TO_PROPERTIES
        .get(componentType);
        Object.keys(jsonSchema.properties).forEach((element) => {
            if (blacklistedProperties && blacklistedProperties.includes(element)) {
                delete jsonSchema.properties[element];
            }
        });
    }
}
