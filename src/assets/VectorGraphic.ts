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
          "description": "If true, handled events are bubbled up.",
          "default": false
        },
        "when": {
          "type": "boolean",
          "description": "If true, invoke this handler",
          "default": true
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
    "GestureHandlerArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Gestures"
      }
    },
    "Gestures": {
      "oneOf": [
        {
          "$ref": "#/definitions/DoublePress"
        },
        {
          "$ref": "#/definitions/LongPress"
        }
      ]
    },
    "DoublePress": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Describes the type of gesture"
        },
        "onDoublePress": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute on double press"
        },
        "onSinglePress": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute on single press"
        }
      },
      "additionalProperties": true,
      "required": [
        "type"
      ]
    },
    "LongPress": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Describes the type of gesture"
        },
        "onLongPressStart": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute when a long-press is first detected"
        },
        "onLongPressEnd": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute when a long-press is finished"
        }
      },
      "additionalProperties": true,
      "required": [
        "type"
      ]
    },
    "Source": {
      "oneOf": [ commonDefinition.ExtendedUrl, { "type": "string" } ],
    },
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "align": {
      "type": "string",
      "category": Categories.alignmentAndPosition,
      "description": "How the graphic should be aligned in the current box",
      "enum": [
        "left",
        "right",
        "center",
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
      ]
    },
    "source": {
      "category": Categories.vectorGraphic,
      "$ref": "#/definitions/Source",
      "description": "The URL or direct reference to a vector graphic."
    },
    "scale": {
      "type": "string",
      "category": Categories.vectorGraphic,
      "description": "How the image should be scaled to fill the current box.",
      "enum": [
        "none",
        "fill",
        "best-fill",
        "best-fit"
      ]
    },
    "parameter": {
      "type": "object",
      "category": Categories.vectorGraphic,
      "description": "Optional map of parameters to pass to the vector graphic.",
    },
    "parameters": {
      "type": "object",
      "category": Categories.vectorGraphic,
      "description": "Optional map of parameters to pass to the vector graphic.",
    },
    "onFocus": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command to execute when the component receives focus."
    },
    "onBlur": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command to execute when the component loses focus."
    },
    "handleKeyDown": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.aboutComponent,
      "description": "Keyboard handler(s) to evaluate when the component receives a key down."
    },
    "handleKeyUp": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.aboutComponent,
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
      "category": Categories.aboutComponent,
      "description": "Gestures to interpret"
    },
    "onCancel": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Commands to execute when a gesture takes over the pointer."
    },
    "onDown": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Commands to execute when a pointer down event occurs."
    },
    "onMove": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Commands to execute while moving the pointer."
    },
    "onPress": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Commands to execute for a pointer down followed by an up."
    },
    "onUp": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Commands to execute when releasing the pointer."
    },
    "onLoad": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command(s) to execute when all sources have loaded"
    },
    "onFail": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command(s) to execute if any source fails to load"
    }
  },
  "required": [
    "type"
  ],
  "description": "Draw a vector graphic on the screen.",
  "additionalProperties": true
};
