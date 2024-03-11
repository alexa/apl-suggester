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
import { Categories, IJsonSchema, SCHEMA_URI } from './IJsonSchema';
import { JSON_SCHEMA as baseSchema } from "./BaseComponent";

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": {
    ...baseSchema.definitions,
    "KeyHandler": {
      "properties": {
        "commands": {
          "$ref": "#/definitions/CommandArray",
          "description": "Commands to execute if this handler is invoked."
        },
        "description": {
          "type": "string",
          "description": "Optional description of this key handler.",
          "default": ""
        },
        "propagate": {
          "type": "boolean",
          "description": "If true, handled events are bubbled up."
        },
        "when": {
          "type": "boolean",
          "description": "If true, invoke this handler"
        }
      },
      "additionalProperties": false
    },
    "KeyHandlerArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/KeyHandler"
      }
    },
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "data": {
      "$ref": "#/definitions/anyArray",
      "category": Categories.sequence,
      "description": "Data to bind into this container.  This should be an array of data items. Each item will be bound to the 'data' global variable and the 'item' component will be inflated using that data item.  The 'index' global variable will be assigned the 0-based array offset of the item. The 'ordinal' global variable will be assigned for each 'numbered' child"
    },
    "firstItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.sequence,
      "description": "A child component to put at the beginning of the layout."
    },
    "lastItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.sequence,
      "description": "A child component to put at the end of the layout"
    },
    "numbered": {
      "type": "boolean",
      "category": Categories.sequence,
      "description": "If true, assign ordinal numbers to the children"
    },
    "scrollDirection": {
      "type": "string",
      "category": Categories.sequence,
      "description": "The direction to scroll this sequence.",
      "enum": [
        "horizontal",
        "vertical"
      ]
    },
    "snap": {
      "type": "string",
      "category": Categories.sequence,
      "description": "The alignment of the child component when user scrolls through the content, releases the pointer, and allows the grid sequence to slow to a stop",
      "enum": [
        "none",
        "start",
        "center",
        "end",
        "forceStart",
        "forceEnd",
        "forceCenter"
      ]
    },
    "onScroll": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.sequence,
      "description": "Command to execute during scrolling"
    },
    "onFocus": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.sequence,
      "description": "Command to execute when the component receives focus."
    },
    "onBlur": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.sequence,
      "description": "Command to execute when the component loses focus."
    },
    "onChildrenChanged": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.sequence,
      "description": "Command to execute when the children were inserted or removed from the component."
    },
    "handleKeyDown": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.sequence,
      "description": "Keyboard handler(s) to evaluate when the component receives a key down."
    },
    "handleKeyUp": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.sequence,
      "description": "Keyboard handler(s) to evaluate when the component receives a key up."
    },
    "nextFocusDown": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The component to focus if the down key is pressed."
    },
    "nextFocusForward": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The component to focus if the tab key is pressed."
    },
    "nextFocusLeft": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The component to focus if the left key is pressed."
    },
    "nextFocusRight": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The component to focus if the right key is pressed."
    },
    "nextFocusUp": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The component to focus if the up key is pressed."
    },
    "item": {},
    "items": {}
  },
  "required": [
    "type"
  ],
  "description": "A list of items displayed in order.",
  "additionalProperties": false
};
