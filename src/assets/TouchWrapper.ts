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
    "url": {
      "type": "string"
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
    "color": {
      "type": "string"
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
    "KeyHandlerArray": {
      "properties": {
        "commands": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          }
        },
        "propagate": {
          "type": "boolean",
          "description": "If true, handled events are bubbled up.",
          "default": false
        },
        "when": {
          "type": "boolean",
          "description": "If true, invoke this handler.",
          "default": true
        },
      }
    },
    "GestureHandlerArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Gestures"
      }
    },
    "Gestures": {
      "oneOf": [
        {
          "$ref": "#/definitions/DoublePress"
        },
        {
          "$ref": "#/definitions/LongPress"
        },
        {
          "$ref": "#/definitions/SwipeAway"
        }
      ]
    },
    "DoublePress": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Describes the type of gesture"
        },
        "onDoublePress": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute on double press"
        },
        "onSinglePress": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute on single press"
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "LongPress": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Describes the type of gesture"
        },
        "onLongPressStart": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute when a long-press is first detected"
        },
        "onLongPressEnd": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute when a long-press is finished"
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "SwipeAway": {
      "properties": {
        "type": {
          "type": "string",
          "description": "Describes the type of gesture"
        },
        "action": {
          "type": "string",
          "description": "How the original and child component will be displayed",
          "default": "slide",
          "enum": [
            "reveal",
            "slide",
            "cover"
          ]
        },
        "direction": {
          "type": "string",
          "description": "Swipe direction",
          "enum": [
            "left",
            "right",
            "up",
            "down"
          ]
        },
        "item": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Component"
          },
          "description": "Child item to display during the swipe gesture"
        },
        "onSwipeMove": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute as the swipe position changes"
        },
        "onSwipeDone": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          },
          "description": "Commands to execute when the swipe is complete"
        }
      },
      "additionalProperties": false,
      "required": [
        "type",
        "direction"
      ]
    },
    "Component": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of this component. Used to select an appropriate child type for inflation"
        },
        "when": {
          "type": "boolean",
          "description": "If false, this component is omitted."
        },
        "speech": {
          "$ref": "#/definitions/url",
          "description": "The URL to download the audio from"
        },
        "entity": {
          "$ref": "#/definitions/EntityArray",
          "description": "An Array of entities associated with the component"
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ],
      "type": "object"
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
    "handleTick": {
      "$ref":"#/definitions/tickHandlerArray",
      "category": Categories.aboutComponent,
      "description": "An array of Tick Event Handlers to execute as time passes."
    },
    "onMount": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "A list of commands to execute when the component is first displayed."
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
    "accessibilityLabel": {
      "type": "string",
      "category": Categories.aboutComponent,
      "description": "A text string used by a screen reader when the user selects accessibility mode."
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
    "onFocus": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Command to execute when the component receives focus."
    },
    "onBlur": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Command to execute when the component loses focus."
    },
    "handleKeyDown": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.touchWrapper,
      "description": "Keyboard handler(s) to evaluate when the component receives a key down."
    },
    "handleKeyUp": {
      "$ref": "#/definitions/KeyHandlerArray",
      "category": Categories.touchWrapper,
      "description": "Keyboard handler(s) to evaluate when the component receives a key up."
    },
    "gestures": {
      "$ref": "#/definitions/GestureHandlerArray",
      "category": Categories.touchWrapper,
      "description": "Gestures to interpret"
    },
    "onCancel": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when a gesture takes over the pointer."
    },
    "onDown": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when a pointer down event occurs."
    },
    "onMove": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute while moving the pointer."
    },
    "onPress": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute for a pointer down followed by an up."
    },
    "onUp": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.touchWrapper,
      "description": "Commands to execute when releasing the pointer."
    },
    "item": {},
    "items": {}
  },
  "required": [
    "type"
  ],
  "description": "Layout component that wraps a single child and responds to touch events",
  "additionalProperties": false
};
