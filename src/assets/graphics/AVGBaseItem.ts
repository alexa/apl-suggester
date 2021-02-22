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
    "$id": "AVGBasedItemDefinitions.json",
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
                },
                "when": {
                    "type": "boolean",
                    "description": "If it evaluates to false, this item does not inflate"
                },
                "filters": {
                    "$ref": "#/definitions/AVGFilterArray",
                    "description": "One or more filtering operations to apply to the vector graphic"
                  },
            },
            "required": [
                "type"
            ],
            "additionalProperties": true,
            "type": "object"
        },
        "BindingArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/Binding"
            }
        },
        "Binding": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name to add to data-binding"
                },
                "value": {
                    "type": "string",
                    "description": "The value to add to data-binding. May be a data-bound expression"
                },
                "type": {
                    "type": "string",
                    "description": "The type of value to add to data-binding.",
                    "enum": [
                        "any",
                        "string",
                        "number",
                        "color",
                        "array",
                        "boolean",
                        "map"
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "name",
                "value"
            ]
        },
        "AVGFilterArray": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/AVGFilter"
            }
        },
        "AVGFilter": {
            "anyOf": [
              {
                "$ref": "#/definitions/FilterDropShadow"
              }
            ]
        },
        "FilterDropShadow": {
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of filter to apply",
                "enum": [
                  "DropShadow"
                ]
              },
              "color": {
                "$ref": "#/definitions/color",
                "description": "Color of the shadow",
                "default": "black"
              },
              "horizontalOffset": {
                "type": "number",
                "description": "Horizontal offset of the shadow",
                "default": 0
              },
              "radius": {
                "type": "number",
                "description": "Blur radius of the shadow",
                "default": 0
              },
              "verticalOffset": {
                "type": "number",
                "description": "Vertical offset of the shadow",
                "default": 0
              },
            },
            "additionalProperties": false,
            "required": [
              "type"
            ]
        },
        "color": {
            "type": "string"
        },
        "Style": {
            "type": "string",
            "description": "Named style to apply"
        },
        "Transform": {
            "type": "string",
            "description": "Transform applied to the contents of the group."
        }
    }
};
