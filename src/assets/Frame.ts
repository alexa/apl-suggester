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

export const JSON_SCHEMA: IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": {
    ...baseSchema.definitions,
    "ColorArray": commonDefinition.ColorArray,
    "Gradient": commonDefinition.Gradient,
    "number": {
      "type": "number"
    },
    "numberArray": commonDefinition.numberArray,
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "item": {},
    "items": {},
    "background": {
      "anyOf": [
        {
          "$ref": "#/definitions/color"
        },
        {
          "$ref": "#/definitions/Gradient"
        }
      ],
      "category": Categories.frame,
      "description": "Background color or gradient of the shape"
    },
    "backgroundColor": {
      "$ref": "#/definitions/color",
      "category": Categories.frame,
      "deprecated": true,
      "deprecationMessage": "Deprecated from APL 2023.3. Please use background instead."
    },
    "borderColor": {
      "$ref": "#/definitions/color",
      "category": Categories.frame,
      "description": "Border color of this component"
    },
    "borderRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Common radius of the corners of the shape."
    },
    "borderStrokeWidth": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Width of the border stroke."
    },
    "borderWidth": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Width of the border."
    },
    "borderTopLeftRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Radius of the top-left corner. Overrides borderRadius"
    },
    "borderTopRightRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Radius of the top-right corner. Overrides borderRadius"
    },
    "borderBottomLeftRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Radius of the bottom-left corner. Overrides borderRadius"
    },
    "borderBottomRightRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.frame,
      "description": "Radius of the bottom-right corner. Overrides borderRadius"
    }
  },
  "required": [
    "type"
  ],
  "description": "Display a border and background",
  "additionalProperties": false
};
