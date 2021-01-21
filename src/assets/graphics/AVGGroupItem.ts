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
import { IJsonSchema } from '../IJsonSchema';
export const JSON_SCHEMA : IJsonSchema = {
  "definitions": {
    "anyArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/any"
      }
    },
    "any": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        },
        {
          "type": "object"
        }
      ]
    },
  },
  "type": "object",
  "properties": {
    "bind": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/BindingArray"
    },
    "filters": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGFilterArray"
    },
    "type": {
      "type": "string",
      "description": "Indicates this item is a path.",
      "enum": [
        "group"
      ]
    },
    "clipPath": {
      "type": "string",
      "description": "Clipping path."
    },
    "data": {
      "$ref": "#/definitions/anyArray",
      "description": "Data to bind into the child items."
    },
    "item": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGItemArray"
    },
    "items": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGItemArray"
    },
    "opacity": {
      "type": "number",
      "description": "The opacity of the group."
    },
    "style": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/Style"
    },
    "transform": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/Transform"
    },
    "rotation": {
      "type": "number",
      "description": "Rotation angle of the group, in degrees."
    },
    "pivotX": {
      "type": "number",
      "description": "X-coordinate of the rotation pivot point (viewport coordinates)."
    },
    "pivotY": {
      "type": "number",
      "description": "Y-coordinate of the rotation pivot point (viewport coordinates)."
    },
    "scaleX": {
      "type": "number",
      "description": "Scaling factor on the X-axis."
    },
    "scaleY": {
      "type": "number",
      "description": "Scaling factor on the Y-axis."
    },
    "translateX": {
      "type": "number",
      "description": "X-coordinate translation (viewport coordinates)"
    },
    "translateY": {
      "type": "number",
      "description": "Y-coordinate translation (viewport coordinates)"
    },
    "when": {
      "type": "boolean",
      "description": "If it evaluates to false, this item does not inflate"
    }
  },
  "required": [
    "type"
  ],
  "additionalProperties": false
};
