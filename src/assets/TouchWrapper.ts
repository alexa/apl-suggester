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
  "definitions": baseSchema.definitions,
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "onFocus": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Command to execute when the component receives focus."
    },
    "onBlur": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Command to execute when the component loses focus."
    },
    "handleKeyDown": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.touchWrapper,
      "description": "Keyboard handler(s) to evaluate when the component receives a key down."
    },
    "handleKeyUp": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.touchWrapper,
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
    "gestures": {
      "$ref": "#/definitions/GestureHandlerArray",
      "category": Categories.touchWrapper,
      "description": "Gestures to interpret"
    },
    "onCancel": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when a gesture takes over the pointer."
    },
    "onDown": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when a pointer down event occurs."
    },
    "onMove": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute while moving the pointer."
    },
    "onPress": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute for a pointer down followed by an up."
    },
    "onUp": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when releasing the pointer."
    },
    "item": {},
    "items": {}
  },
  "required": [
    "type"
  ],
  "description": "Layout component that wraps a single child and responds to touch events",
  "additionalProperties": false
};
