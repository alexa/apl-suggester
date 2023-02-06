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
import { IJsonSchema, Categories } from './IJsonSchema';

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "url": commonDefinition.SimpleUrl,
    "ActionArray": commonDefinition.ActionArray,
    "Action": commonDefinition.Action,
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
    },
    "paddingArray": {
      "oneOf": [
        {
          "type": "array",
          "items": {
            "$ref": "#/definitions/dimension",
          }
        },
        {
          "$ref": "#/definitions/dimension",
        }
      ]
    },
    "EntityArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Entity"
      }
    },
    "Entity": {
      "properties": {
        "id": {
          "type": "string",
          "description": "The id of this entity"
        },
        "type": {
          "type": "string",
          "description": "The type of this entity"
        },
        "name": {
          "type": "string",
          "description": "The name of this entity"
        },
        "nameSynonyms": {
          "$ref": "#/definitions/stringArray",
          "description": "Array of synonyms of this entity"
        },
        "targetSlotName": {
          "type": "string",
          "description": "The target slot name of this entity"
        }
      },
      "additionalProperties": false,
      "required": [
        "id",
        "type",
        "name"
      ]
    },
    "tickHandler": {
      "properties": {
        "commands": {
          "type": "array",
          "description": "Handlers to check on tick events.",
          "items": {
            "$ref": "#/definitions/Command"
          }
        },
        "description": {
          "type": "string",
          "description": "Optional description of this tick handler.",
          "default": ""
        },
        "minimumDelay": {
          "type": "number",
          "description": "Minimum duration in milliseconds that must pass before this handler is invoked again.",
          "default": 1000
        },
        "when": {
          "type": "boolean",
          "description": "If true, invoke this handler.",
          "default": true
        }
      },
      "required": [
        "commands"
      ]
    },
    "tickHandlerArray": {
      "type": "array",
      "description": "An array of Tick Event Handlers to execute as time passes.",
      "items": {
        "$ref": "#/definitions/tickHandler"
      }
    },
    "stringArray": {
      "type": "array",
      "items": {
        "type": "string"
      }
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
          "$ref": "#/definitions/any",
          "description": "The value to add to data-binding. May be a data-bound expression"
        },
        "type": {
          "type": "string",
          "description": "The type of value to add to data-binding.",
          "enum": [
            "any",
            "string",
            "number",
            "integer",
            "style",
            "color",
            "boolean",
            "dimension",
            "component",
            "componentArray"
          ]
        }
      },
      "additionalProperties": false,
      "required": [
        "name",
        "value"
      ]
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
        },
        {
          "type": "array"
        },
        {
          "type": "boolean"
        },
        {
          "type": "null"
        }
      ]
    },
    "color": {
      "type": "string"
    },
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
    "Display": {
      "type": "string",
      "description": "The type of value to add to data-binding.",
      "enum": [
        "invisible",
        "none",
        "normal"
      ]
    },
    "CommandArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Command"
      }
    },
    "Command": {
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
        }
      },
      "additionalProperties": true,
      "required": [
        "type"
      ]
    },
    "Role": commonDefinition.Role,
    "TransformArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Transform"
      }
    },
    "Transform": {
      "properties": {
        "rotate": {
          "type": "number",
          "description": "Rotation angle, in degrees. Positive angles rotate in the clockwise direction."
        },
        "scale": {
          "type": "number",
          "description": "Uniform scaling in both X and Y."
        },
        "scaleX": {
          "type": "number",
          "description": "Scaling in the X direction (overrides “scale” if in same group)."
        },
        "scaleY": {
          "type": "number",
          "description": "Scaling in the Y direction (overrides “scale” if in same group)."
        },
        "skewX": {
          "type": "number",
          "description": "Skew angle for the X-axis, in degrees. X-axis lines remain horizontal."
        },
        "skewY": {
          "type": "number",
          "description": "Skew angle for the Y-axis, in degrees. Y-axis lines remain vertical."
        },
        "translateX": {
          "$ref": "#/definitions/dimension",
          "description": "Distance to translate the object to the right."
        },
        "translateY": {
          "$ref": "#/definitions/dimension",
          "description": "Distance to translate the object down."
        },
      },
      "additionalProperties": false
    },
  },
  "type": "object",
  "properties": {
    "layoutDirection": {
      "type": "string",
      "description": "The layoutDirection of this component and children.",
      "default": "inherit",
      "enum": [
        "inherit",
        "LTR",
        "RTL"
      ]
    },
    "description": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "An Optional description of this component."
    },
    "checked": {
      "type": "boolean",
      "category": Categories.aboutComponent,
      "description": "If true, this component has the checked state set."
    },
    "disabled": {
      "type": "boolean",
      "category": Categories.aboutComponent,
      "description": "If true, this component does not respond to touch or focus."
    },
    "display": {
      "$ref": "#/definitions/Display",
      "category": Categories.aboutComponent,
      "description": "Control if the component is displayed on the screen."
    },
    "onMount": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "A list of commands to execute when the component is first displayed."
    },
    "handleTick": {
      "$ref":"#/definitions/tickHandlerArray",
      "category": Categories.aboutComponent,
      "description": "An array of Tick Event Handlers to execute as time passes."
    },
    "transform": {
      "$ref": "#/definitions/TransformArray",
      "category": Categories.aboutComponent,
      "description": "Array of transformations."
    },
    "type": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "The type of this component. Used to select an appropriate child type for inflation"
    },
    "when": {
      "type": "boolean",
      "category": Categories.aboutComponent,
      "description": "If false, this component is omitted."
    },
    "speech": {
      "$ref": "#/definitions/url",
      "category": Categories.aboutComponent,
      "description": "The URL to download the audio from"
    },
    "entity": {
      "$ref": "#/definitions/EntityArray",
      "category": Categories.aboutComponent,
      "description": "An Array of entities associated with the component"
    },
    "id": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "Name of the component. This value will be reported in events and can be used in navigation commands."
    },
    "bind": {
      "$ref": "#/definitions/BindingArray",
      "category": Categories.aboutComponent,
      "description": "Named values to add to the data-binding context"
    },
    "style": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "Style to apply to the component"
    },
    "width": {
      "$ref": "#/definitions/dimension",
      "category": Categories.width,
      "description": "Width of this component"
    },
    "minWidth": {
      "$ref": "#/definitions/dimension",
      "category": Categories.width,
      "description": "Minimum width of this component"
    },
    "maxWidth": {
      "$ref": "#/definitions/dimension",
      "category": Categories.width,
      "description": "Maximum width of this component"
    },
    "height": {
      "$ref": "#/definitions/dimension",
      "category": Categories.height,
      "description": "Height of this component"
    },
    "inheritParentState": {
      "type": "boolean",
      "category": Categories.aboutComponent,
      "description": "Inherit the display state from the parent component"
    },
    "minHeight": {
      "$ref": "#/definitions/dimension",
      "category": Categories.height,
      "description": "Minimum height of this component"
    },
    "maxHeight": {
      "$ref": "#/definitions/dimension",
      "category": Categories.height,
      "description": "Maximum height of this component"
    },
    "opacity": {
      "type": "number",
      "category": Categories.aboutComponent,
      "description": "Opacity of this component.  Also applies to children."
    },
    "preserve": {
      "category": Categories.aboutComponent,
      "description": "Properties preserved through reinflation.",
      "oneOf": [
        {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        {
          "type": "string"
        }
      ],
    },
    "muted": {
      "type": "boolean",
      "category": Categories.video,
      "description": "If true, mute the video."
    },
    "padding": {
      "$ref": "#/definitions/paddingArray",
      "category": Categories.padding,
      "description": "Space to add on the sides of the component."
    },
    "paddingLeft": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the left of this object."
    },
    "paddingTop": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the top this object."
    },
    "paddingRight": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the right of this object."
    },
    "paddingBottom": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the bottom of this object."
    },
    "paddingStart": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the start edge of this component."
    },
    "paddingEnd": {
      "$ref": "#/definitions/dimension",
      "category": Categories.padding,
      "description": "Space to add to the end edge of this component."
    },
    "accessibilityLabel": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "A text string used by a screen reader when the user selects accessibility mode."
    },
    "actions": {
      "$ref": "#/definitions/ActionArray",
      "category": Categories.aboutComponent,
      "description": "Programmatic equivalents for complex touch interactions"
    },
    "role": {
      "$ref": "#/definitions/Role",
      "category": Categories.aboutComponent,
      "description": "Role or purpose of the component."
    },
    "shadowColor": {
      "$ref": "#/definitions/color",
      "category": Categories.container,
      "description": "Shadow color"
    },
    "shadowHorizontalOffset": {
      "$ref": "#/definitions/dimension",
      "category": Categories.container,
      "description": "Horizontal offset of the shadow"
    },
    "shadowRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.container,
      "description": "Shadow blur radius"
    },
    "shadowVerticalOffset": {
      "$ref": "#/definitions/dimension",
      "category": Categories.container,
      "description": "Vertical offset of the shadow"
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
