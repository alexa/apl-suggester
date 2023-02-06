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
 * JsonSchema definition.
 */
export interface IJsonSchema extends Object {
    /**
     * Id of the JSON schema.
     */
    $id? : string;

    /**
     * Reference of the JSON schema.
     */
    $ref? : string;
    /**
     * It is recommended that the meta-schema is
     * included in the root of any JSON Schema
     */
    $schema? : string;

    /**
     * Schema description.
     */
    description? : string;
    /**
     * Default json for the object represented by
     * this schema
     */
    default? : any;

    /**
     * Required fields.
     */
    required? : string[];
    /**
     * Holds simple JSON Schema definitions for
     * referencing from elsewhere.
     */
    definitions? : {[property : string] : IJsonSchema};
    /**
     * The keys that can exist on the object with the
     * json schema that should validate their value
     */
    properties? : {[key : string] : IJsonSchema};

    /**
     * The basic type of this schema, can be one of
     * [string, number, object, array, boolean, null]
     * or an array of the acceptable types
     */
    type? : string | string[] | object;

    /**
     * Indicate whether additional properties is allowed.
     */
    additionalProperties? : boolean;

    /**
     * Optional items fields containing all children items.
     */
    items? : IJsonSchema;

    /**
     * Combining Schema.
     */
    anyOf? : IJsonSchema[];
    oneOf? : IJsonSchema[];
    allOf? : IJsonSchema[];
    not? : IJsonSchema;

    /**
     * Enumerates the values that this schema can be
     * e.g.
     * {"type": "string",
     *  "enum": ["red", "green", "blue"]}
     */
    enum? : any[];

    /**
     * The key of this object is a regex for which
     * properties the schema applies to
     */
    patternProperties? : {[pattern : string] : IJsonSchema};

    /**
     * This is a regex string that the value must conform to.
     */
    pattern? : string;

    /**
     * minimum value that should be exclusive
     */
    exclusiveMinimum? : number;
    minimum? : number;

    /**
     * Categorization support for formUI.
     */
    category? : Categories;

    /**
     * If-Then in JSON Schema
     */
    if? : IJsonSchema;

    then? : IJsonSchema;
    else? : IJsonSchema;
}

export enum Categories {
    container = 'Container',
    image = 'Image',
    text = 'Text',
    video = 'Video',
    sequence = 'Sequence',
    scrollView = 'ScrollView',
    frame = 'Frame',
    touchWrapper = 'TouchWrapper',
    pager = 'Pager',
    vectorGraphic = 'VectorGraphic',
    aboutComponent = 'About Component',
    width = 'Width',
    height = 'Height',
    padding = 'Padding',
    alignmentAndPosition = 'Alignment and Position',
    gridSequence = 'GridSequence',
    editText = 'EditText',
    extension = 'ExtensionComponent'
}
