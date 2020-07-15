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
      "category": Categories.sequence,
      "description": "Controls assignment of ordinals to the next child.  Defaults to 'normal'.If 'skip', the ordinal is not incremented. If 'reset', the next ordinal is 1.",
      "enum": [
        "normal",
        "reset",
        "skip"
      ]
    },
    "spacing": {
      "$ref": "#/definitions/dimension",
      "category": Categories.sequence,
      "description": "Space to add between this component and the previous component."
    },
    "scaling": {
      "type": "number",
      "exclusiveMinimum": 0,
      "category": Categories.sequence,
      "description": "Scaling factor to apply to the space reserved for this child."
    }
  },
  "required": [],
  "description": "A child of a Sequence component.",
  "additionalProperties": false
};
