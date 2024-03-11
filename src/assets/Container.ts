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

/* tslint:disable */
'use strict';
import * as commonDefinition from "./CommonDefinition";
import { IJsonSchema, Categories, SCHEMA_URI } from './IJsonSchema';
import { JSON_SCHEMA as baseSchema } from "./BaseComponent";

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": baseSchema.definitions,
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "data": {
      "$ref": "#/definitions/anyArray",
      "category": Categories.container,
      "description": "Data to bind into this container.  This should be an array of data items. Each item will be bound to the 'data' global variable and the 'item' component will be inflated using that data item.  The 'index' global variable will be assigned the 0-based array offset of the item. The 'ordinal' global variable will be assigned for each 'numbered' child"
    },
    "firstItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.container,
      "description": "A child component to put at the beginning of the layout."
    },
    "lastItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.container,
      "description": "A child component to put at the end of the layout"
    },
    "onChildrenChanged": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.container,
      "description": "Command to execute when the children were inserted or removed from the component."
    },
    "numbered": {
      "type": "boolean",
      "category": Categories.container,
      "description": "If true, assign ordinal numbers to the children"
    },
    "alignItems": {
      "type": "string",
      "category": Categories.container,
      "description": "Specifies default alignment for children in the cross-axis.",
      "enum": [
        "stretch",
        "center",
        "start",
        "end",
        "baseline"
      ]
    },
    "direction": {
      "type": "string",
      "category": Categories.container,
      "description": "The direction that children will laid out in.",
      "enum": [
        "column",
        "row",
        "columnReverse",
        "rowReverse"
      ]
    },
    "justifyContent": {
      "type": "string",
      "category": Categories.container,
      "description": "Distribute free space when there is room on the main axis.",
      "enum": [
        "start",
        "end",
        "center",
        "spaceBetween",
        "spaceAround",
        "spaceEvenly"
      ]
    },
    "wrap": {
      "type": "string",
      "category": Categories.container,
      "description": "How children will be wrapped to multiple lines",
      "enum": [
        "noWrap",
        "wrap",
        "wrapReverse"
      ]
    },
    "item": {},
    "items": {}
  },
  "required": [
    "type"
  ],
  "description": "A layout that uses Flexbox to position its children.",
  "additionalProperties": false
};
