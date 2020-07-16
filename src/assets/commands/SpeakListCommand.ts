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
    "align": {
      "type": "string",
      "description": "The alignment of the item after scrolling.",
      "enum": [
        "first",
        "center",
        "last",
        "visible"
      ]
    },
    "componentId": {
      "type": "string",
      "description": "The id of the component."
    },
    "highlightMode": {
      "type": "string",
      "description": "How Karaoke is applied: on a line-by-line basis, or to the entire block.",
      "enum": [
        "line",
        "block"
      ]
    },
    "count": {
      "type": "integer",
      "description": "The number of items to speak."
    },
    "minimumDwellTime": {
      "type": "integer",
      "description": "The minimum number of milliseconds that an item will be highlighted for."
    },
    "start": {
      "type": "integer",
      "description": "The 0-based index of the first item to speak"
    }
  },
  "required": [
    "type",
    "count",
    "start"
  ],
  "additionalProperties": false
};
