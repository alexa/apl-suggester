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
import { IJsonSchema, Categories, SCHEMA_URI } from './IJsonSchema';
import { JSON_SCHEMA as baseSchema } from "./BaseComponent";

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": {
    ...baseSchema.definitions,
    "PageMoveHandler": {
      "properties": {
        "commands": {
          "$ref": "#/definitions/CommandArray",
          "description": "Commands to execute if this handler is invoked."
        },
        "description": {
          "type": "string",
          "description": "Optional description"
        },
        "drawOrder": {
          "type": "string",
          "description": "Stacking order of pages",
          "enum": [
            "nextAbove",
            "nextBelow",
            "higherAbove",
            "higherBelow"
          ]
        },
        "when": {
          "type": "boolean",
          "description": "If true, invoke this handler"
        }
      },
      "additionalProperties": false
    },
    "PageMoveHandlerArray": {
      "type": "array",
      "items": {
          "$ref": "#/definitions/PageMoveHandler"
      }
    },
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "data": {
      "$ref": "#/definitions/anyArray",
      "category": Categories.pager,
      "description": "Data to bind into this container.  This should be an array of data items. Each item will be bound to the 'data' global variable and the 'item' component will be inflated using that data item.  The 'index' global variable will be assigned the 0-based array offset of the item. The 'ordinal' global variable will be assigned for each 'numbered' child"
    },
    "firstItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.pager,
      "description": "A child component to put at the beginning of the layout."
    },
    "lastItem": {
      "$ref": "#/definitions/ComponentArray",
      "category": Categories.pager,
      "description": "A child component to put at the end of the layout"
    },
    "initialPage": {
      "type": "integer",
      "category": Categories.pager,
      "description": "The index of the starting page (0-based)"
    },
    "handlePageMove": {
      "$ref": "#/definitions/PageMoveHandlerArray",
      "category": Categories.pager,
      "description": "Commands to execute when the page changes"
    },
    "onPageChanged": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.pager,
      "description": "Commands to execute when the page changes"
    },
    "navigation": {
      "type": "string",
      "category": Categories.pager,
      "description": "Specifies the allowed navigation direction",
      "enum": [
        "normal",
        "none",
        "wrap",
        "forward-only"
      ]
    },
    "pageDirection": {
      "type": "string",
      "category": Categories.pager,
      "description": "The direction to move pages",
      "enum": [
        "horizontal",
        "vertical"
      ]
    },
    "onFocus": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.pager,
      "description": "Command to execute when the component receives focus."
    },
    "onBlur": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.pager,
      "description": "Command to execute when the component loses focus."
    },
    "handleKeyDown": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.pager,
      "description": "Keyboard handler(s) to evaluate when the component receives a key down."
    },
    "handleKeyUp": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.pager,
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
  "description": "A layout that pages between multiple pages.  Can be inflated in two ways: either provide an 'items' array of pages to show or provide a single 'item' and a 'data' array that is used to repeatedly populate the item",
  "additionalProperties": false
};
