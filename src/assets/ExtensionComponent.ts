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
    },
    "required": [
        "type"
    ],
    "description": "A block of EditText",
    "additionalProperties": true
};
