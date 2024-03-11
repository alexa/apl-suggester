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
      "KeyboardHandlerArray": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/KeyboardHandler"
        }
      },
      "KeyboardHandler": {
        "properties": {
          "commands": {
          "$ref": "#/definitions/CommandArray",
          "description": "Commands to execute if this handler is invoked."
          },
          "propagate": {
            "type": "boolean",
            "description": "If true, handled events are bubbled up"
          },
          "when": {
            "type": "boolean",
            "description": "If true, invoke this handler"
          }
        }
      },
      "keyboardType": {
        "properties": {
          "decimalPad": {
            "type": "number",
            "description": "Numbers and a decimal point"
          },
          "emailAddress": {
            "type": "string",
            "description": "Optimized for e-mail addresses, including the “@”, “.”, and space character."
          },
          "normal": {
            "type": "string",
            "description": "Default keyboard"
          },
          "numberPad": {
            "type": "number",
            "description": "Numbers only (good for PIN codes)"
          },
          "phonePad": {
            "type": "string",
            "description": "Numbers and the “*” and “#” characters"
          },
          "url": {
            "type": "string",
            "description": "Optimized for entering URLs"
          }
      }
    },
  },
  "type": "object",
  "properties": {
      ...baseSchema.properties,
      "onFocus": {
        "$ref": "#/definitions/CommandArray",
        "category": Categories.aboutComponent,
        "description": "Command to execute when the component receives focus"
      },
      "onBlur": {
        "$ref": "#/definitions/CommandArray",
        "category": Categories.aboutComponent,
        "description": "Command to execute when the component loses focus"
      },
      "handleKeyDown": {
        "$ref": "#/definitions/KeyboardHandlerArray",
        "category": Categories.aboutComponent,
        "description": "Keyboard handler(s) to evaluate when the component receives a key down"
      },
      "handleKeyUp": {
        "$ref": "#/definitions/KeyboardHandlerArray",
        "category": Categories.aboutComponent,
        "description": "Keyboard handler(s) to evaluate when the component receives a key up"
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
      "borderColor": {
        "$ref": "#/definitions/color",
        "category": Categories.frame,
        "description": "Color of the border"
      },
      "borderStrokeWidth": {
        "$ref": "#/definitions/dimension",
        "category": Categories.width,
        "description": "Width of the border stroke"
      },
      "borderWidth": {
        "$ref": "#/definitions/dimension",
        "category": Categories.width,
        "description": "Width of the border"
      },
      "color": {
        "$ref": "#/definitions/color",
        "category": Categories.text,
        "description": "Text color"
      },
      "fontFamily": {
        "type": "string",
        "category": Categories.text,
        "description": "The name of the font family"
      },
      "fontSize": {
        "$ref": "#/definitions/dimension",
        "category": Categories.text,
        "description": "The size of the text"
      },
      "fontStyle": {
        "type": "string",
        "category": Categories.text,
        "description": "The style of the font",
        "enum": [
          "normal",
          "italic"
        ]
      },
      "fontWeight": {
        "type": "string",
        "category": Categories.text,
        "description": "The weight of the font",
        "enum": [
          "normal",
          "bold",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900"
        ]
      },
      "highlightColor": {
        "$ref": "#/definitions/color",
        "category": Categories.text,
        "description": "The highlight color to show behind selected text"
      },
      "hint": {
        "type": "string",
        "category": Categories.text,
        "description": "Hint text to display when no text"
      },
      "hintColor": {
        "$ref": "#/definitions/color",
        "category": Categories.text,
        "description": "The color of the hint text"
      },
      "hintStyle": {
        "type": "string",
        "category": Categories.text,
        "description": "The style of the hint font",
        "enum": [
          "normal",
          "italic"
        ]
      },
      "hintWeight": {
        "type": "string",
        "category": Categories.text,
        "description": "The weight of the hint font",
        "enum": [
          "normal",
          "bold",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900"
        ]
      },
      "keyboardType": {
        "$ref": "#/definitions/keyboardType",
        "category": Categories.aboutComponent,
        "description": "The type of keyboard to display"
      },
      "lang": {
        "type": "string",
        "category": Categories.text,
        "description": "The language of the text"
      },
      "maxLength": {
        "type": "integer",
        "category": Categories.text,
        "description": "Maximum number of lines of text to display."
      },
      "onTextChange": {
        "$ref": "#/definitions/CommandArray",
        "category": Categories.aboutComponent,
        "description": "Command to execute when the text changes from a user event"
      },
      "onSubmit": {
        "$ref": "#/definitions/CommandArray",
        "category": Categories.aboutComponent,
        "description": "Command to execute when the submit button is pressed"
      },
      "secureInput": {
        "type": "boolean",
        "category": Categories.aboutComponent,
        "description": "Hide characters as they are typed if true"
      },
      "selectOnFocus": {
        "type": "boolean",
        "category": Categories.aboutComponent,
        "description": "If true the text will be selected on a focus event"
      },
      "size": {
        "type": "integer",
        "category": Categories.text,
        "description": "Specifies approximately how many characters can be displayed"
      },
      "submitKeyType": {
        "type": "string",
        "category": Categories.aboutComponent,
        "description": "The type of the return key",
        "enum": [
          "done",
          "go",
          "next",
          "search",
          "send"
        ]
      },
      "text": {
        "type": "string",
        "category": Categories.text,
        "description": "The text to display"
      },
      "validCharacters": {
        "type": "string",
        "category": Categories.text,
        "description": "Restrict the characters that can be entered"
      },
  },
  "required": [
    "type"
  ],
  "description": "A block of EditText",
  "additionalProperties": false
};
