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
'use strict'
import { IJsonSchema, Categories } from './IJsonSchema';
export const JSON_SCHEMA : IJsonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "dimension": {
      "oneOf": [
        {
          "type": "string",
          "pattern": "^(auto)$|^[+]?[0-9]\\d*(\\.\\d+)?(px|vh|%|dp|vw)?$"
        },
        {
          "type": "number"
        }
      ]
    }
  },
  "type": "object",
  "properties": {
    "numbering": {
      "type": "string",
      "category": Categories.container,
      "description": "Controls assignment of ordinals to the next child.  Defaults to 'normal'.If 'skip', the ordinal is not incremented. If 'reset', the next ordinal is 1.",
      "enum": [
        "normal",
        "reset",
        "skip"
      ]
    },
    "spacing": {
      "$ref": "#/definitions/dimension",
      "category": Categories.container,
      "description": "Space to add between this component and the previous component."
    },
    "grow": {
      "type": "number",
      "category": Categories.container,
      "description": "If positive, this component will stretch if there is extra space. This only applies if the component is inside a container or sequence."
    },
    "shrink": {
      "type": "number",
      "category": Categories.container,
      "description": "If positive, this component will shrink if there is not enought space .This only applies if the component is inside a container or sequence."
    },
    "alignSelf": {
      "type": "string",
      "category": Categories.container,
      "description": "Cross-axis layout position.  Only works in a container or sequence.  Overrides the parent's alignItems property",
      "enum": [
        "auto",
        "start",
        "end",
        "center",
        "baseline",
        "stretch"
      ]
    },
    "position": {
      "type": "string",
      "category": Categories.container,
      "description": "Relative or absolute layout positioning",
      "enum": [
        "relative",
        "absolute"
      ]
    },
    "left": {
      "$ref": "#/definitions/dimension",
      "category": Categories.alignmentAndPosition,
      "description": "Distance to offset the left edge of this component in absolute positioning"
    },
    "top": {
      "$ref": "#/definitions/dimension",
      "category": Categories.alignmentAndPosition,
      "description": "Distance to offset the top edge of this component in absolute positioning"
    },
    "right": {
      "$ref": "#/definitions/dimension",
      "category": Categories.alignmentAndPosition,
      "description": "Distance to offset the right edge of this component in absolute positioning"
    },
    "bottom": {
      "$ref": "#/definitions/dimension",
      "category": Categories.alignmentAndPosition,
      "description": "Distance to offset the bottom edge of this component in absolute positioning"
    }
  },
  "required": [],
  "description": "A child of a Container component",
  "additionalProperties": false
};
