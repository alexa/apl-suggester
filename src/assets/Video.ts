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

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": {
    ...baseSchema.definitions,
    "videoTrack": {
      "properties": {
        "description": {
          "type": "string",
          "description": "Optional description of this source"
        },
        "duration": {
          "type": "integer",
          "description": "Duration of the track in milliseconds"
        },
        "url": {
          "$ref": "#/definitions/urlDefinition",
          "description": "The actual URL to load the video from"
        },
        "textTrack": {"$ref": "#/definitions/textTrack"},
        "textTracks": {"$ref": "#/definitions/textTrack"},
        "repeatCount": {
          "type": "integer",
          "description": "Number of times to repeat. -1 is repeat forever"
        },
        "offset": {
          "type": "integer",
          "description": "Milliseconds from the start of the track to play from"
        }
      },
      "not": {
        "allOf": [
          { "required": ["textTrack"] },
          { "required": ["textTracks"] }
      ]},
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "type": "object"
    },
    "textTrack": {
      "type": "array",
      "description": "Holds data about the text track. \"url\" and \"type\" are required",
      "items": {
        "type": "object",
        "properties": {
          "description": { "type": "string" },
          "url": commonDefinition.SimpleUrl,
          "type": {
            "enum": [
              "caption"
          ]}
        },
        "required": ["url", "type"]
      }
    },
    "videoTrackArray": {
      "type": "array",
      "items": {
        "oneOf": [
          {
            "$ref": "#/definitions/videoTrack"
          },
          commonDefinition.SimpleUrl,
        ]
      }
    },
    "urlDefinition": {
      "oneOf": [
        {
          "type": "array",
          "items": commonDefinition.SimpleUrl
        },
        commonDefinition.SimpleUrl
      ]
    },
    "sourceDefinition": {
      "oneOf": [
        {
          "$ref": "#/definitions/videoTrackArray"
        },
        commonDefinition.SimpleUrl,
        {
          "$ref": "#/definitions/videoTrack"
        }
      ]
    },
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "muted": {
      "type": "boolean",
      "category": Categories.video,
      "description": "If true, mute the video."
    },
    "audioTrack": {
      "type": "string",
      "category": Categories.video,
      "description": "Audio track to play on",
      "enum": [
        "foreground",
        "background",
        "none"
      ]
    },
    "autoplay": {
      "type": "boolean",
      "category": Categories.video,
      "description": "Start playing automatically"
    },
    "source": {
      "$ref": "#/definitions/sourceDefinition",
      "category": Categories.video,
      "description": "The URL to download the image from"
    },
    "scale": {
      "type": "string",
      "category": Categories.video,
      "description": "How the image should be scaled to fill the current box.",
      "enum": [
        "best-fill",
        "best-fit"
      ],
      "default": "best-fit"
    },
    "screenLock": {
      "type": "boolean",
      "category": Categories.video,
      "description": "If a playing video should extend the document lifecycle.",
    },
    "onEnd": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the last video track is finished playing."
    },
    "onPause": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the video switches from playing to paused."
    },
    "onPlay": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the video switches from paused to playing."
    },
    "onTimeUpdate": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the playback position changes."
    },  
    "onTrackUpdate": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the current video track changes."
    },
    "onTrackReady": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when the current track state changes to ready."
    },
    "onTrackFail": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.video,
      "description": "Commands to execute when an error occurs and media cannot be played."
    }
  },
  "required": [
    "type"
  ],
  "description": "Play a video clip",
  "additionalProperties": false
};
