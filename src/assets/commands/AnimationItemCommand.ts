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
import { IJsonSchema } from '../IJsonSchema';
export const JSON_SCHEMA : IJsonSchema = {
  "definitions": {
    "values": {
      "oneOf": [
        {
          "$ref": "#/definitions/value"
        },
        {
          "$ref": "#/definitions/valueArray"
        }
      ]
    },
    "valueArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/value"
      }
    },
    "value": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/any"
        }
      },
      "description": "animated component properties."
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
          "type": "boolean"
        },
        {
          "type": "object"
        }
      ]
    },
  },
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "description": "The type of the command."
    },
    "description": {
      "type": "string",
      "description": "An optional description for this command"
    },
    "delay": {
      "type": "number",
      "description": "Delay time in milliseconds before this event fires"
    },
    "screenLock": {
      "type": "boolean",
      "description": "If true, disable the Interaction Timer"
    },
    "sequencer": {
      "type": "string",
      "description": "Specify the sequencer that should execute this command."
    },
    "when": {
      "type": "boolean",
      "description": "If this evaluates to false, the command is skipped"
    },
    "componentId": {
      "type": "string",
      "description": "The id of the component."
    },
    "duration": {
      "type": "integer",
      "description": "The duration of the animation (in milliseconds)"
    },
    "easing": {
      "type": "string",
      "description": "Specify an easing curve.",
      "enum": [
        "linear",
        "ease",
        "ease-in",
        "ease-out",
        "ease-in-out"
      ]
    },
    "repeatCount": {
      "type": "number",
      "description": "Number of times to repeat."
    },
    "repeatMode": {
      "type": "string",
      "description": "How repeated animations will play.",
      "enum": [
        "restart",
        "reverse"
      ]
    },
    "value": {
      "$ref": "#/definitions/values",
      "description": "An array of animated component properties."
    },
  },
  "required": [
    "type",
    "duration",
    "value"
  ],
  "additionalProperties": false
};
