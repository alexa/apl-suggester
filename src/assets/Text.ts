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
    "textAlign": {
      "type": "string",
      "category": Categories.text,
      "description": "Alignment of text in a fixed width or multiline text block",
      "enum": [
        "auto",
        "left",
        "center",
        "right",
        "start",
        "end"
      ]
    },
    "textAlignVertical": {
      "type": "string",
      "category": Categories.text,
      "description": "Vertical alignment",
      "enum": [
        "auto",
        "top",
        "center",
        "bottom"
      ]
    },
    "color": {
      "$ref": "#/definitions/color",
      "category": Categories.text,
      "description": "Base color of the text"
    },
    "fontStyle": {
      "type": "string",
      "category": Categories.text,
      "description": "Font style of the text",
      "enum": [
        "normal",
        "italic"
      ]
    },
    "fontFamily": {
      "type": "string",
      "category": Categories.text,
      "description": "Font family for the text"
    },
    "maxLines": {
      "type": "integer",
      "category": Categories.text,
      "description": "Maximum number of lines of text to display."
    },
    "fontSize": {
      "$ref": "#/definitions/dimension",
      "category": Categories.text,
      "description": "Size of the text, expressed in dp"
    },
    "text": {
      "type": "string",
      "category": Categories.text,
      "description": "Text to display.  The text supports a limited form of markup."
    },
    "fontWeight": {
      "type": "string",
      "category": Categories.text,
      "description": "Font weight to display",
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
    "lang": {
      "type": "string",
      "category": Categories.text,
      "description": "The language of the text"
    },
    "letterSpacing": {
      "$ref": "#/definitions/dimension",
      "category": Categories.text,
      "description": "Additional space between letters"
    },
    "lineHeight": {
      "type": "number",
      "category": Categories.text,
      "description": "Multiplier for line spacing"
    }
  },
  "required": [
    "type"
  ],
  "description": "A block of text",
  "additionalProperties": false
};
