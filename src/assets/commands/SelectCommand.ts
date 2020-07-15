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
"use strict";
import { IJsonSchema } from "../IJsonSchema";
export const JSON_SCHEMA: IJsonSchema = {
  definitions: {
    dataArray: {
      type: "array",
      items: {
        $ref: "#/definitions/data"
      }
    },
    data: {
      oneOf: [
        {
          type: "string"
        },
        {
          type: "number"
        },
        {
          type: "object"
        }
      ]
    }
  },
  type: "object",
  properties: {
    type: {
      type: "string",
      description: "The type of the command."
    },
    description: {
      type: "string",
      description: "Optional documentation for this command"
    },
    delay: {
      type: "number",
      description: "Delay time in milliseconds before this command executes. Must be non-negative"
    },
    screenLock: {
      type: "boolean",
      description: "If true, disable the Interaction Timer"
    },
    sequencer: {
      type: "string",
      description: "Specify the sequencer that should execute this command."
    },
    when: {
      type: "boolean",
      description: "Conditional expression. If this evaluates to false, the command is skipped"
    },
    commands: {
      description: "An ordered list of commands to select from"
    },
    data: {
      $ref: "#/definitions/dataArray",
      description: "A list of data to map against the commands"
    },
    otherwise: {
      description: "Commands to execute if nothing else runs"
    }
  },
  required: ["type", "commands"],
  additionalProperties: false
};
