/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

/* tslint:disable */
'use strict'
import { IJsonSchema } from '../IJsonSchema';
export const JSON_SCHEMA : IJsonSchema = {
  "definitions": {
    "AVGItemArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/AVGItem"
      }
    },
    "AVGItem": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Indicates this item is a AVG item.",
          "enum": [
              "path",
              "group",
              "text"
          ]
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": true,
      "type": "object"
    },
    "Transform": {
      "type": "string",
      "description": "Transform applied to the contents of the group."
    }
  },
  "type": "object",
  "properties": {
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
    "item": {
      "$ref": "#/definitions/AVGItemArray"
    },
    "items": {
      "$ref": "#/definitions/AVGItemArray"
    },
    "opacity": {
      "type": "number",
      "description": "The opacity of the group."
    },
    "style": {
      "type": "string",
      "description": "Named style to apply"
    },
    "transform": {
      "$ref": "#/definitions/Transform"
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
    }
  },
  "required": [
    "type"
  ],
  "additionalProperties": false
};
