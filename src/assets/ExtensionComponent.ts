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
        "stringArray": {
            "type": "array",
            "items": {
                "type": "string"
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
        "TickHandlerArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/TickHandler"
            }
        },
        "TickHandler": {
            "properties": {
                "commands": {
                    "$ref": "#/definitions/CommandArray",
                    "description": "Commands to execute if this handler is invoked."
                },
                "description": {
                    "type": "string",
                    "description": "Optional description of this tick handler"
                },
                "minimumDelay": {
                    "type": "number",
                    "description": "Minimum duration in milliseconds that must pass before this handler is invoked again."
                },
                "when": {
                    "type": "boolean",
                    "description": "If true, invoke this handler"
                }
            },
            "additionalProperties": false,
            "required": [
                "commands"
            ]
        },
        "CommandArray": {
            "anyOf": [
                {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Command"
                    }
                },
                {
                    "$ref": "#/definitions/Command"
                }
            ]
        },
        "KeyboardHandlerArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/KeyboardHandler"
            }
        },
        "KeyboardHandler": {
            "properties": {
                "commands": {
                    "$ref": "#/definitions/CommandArray",
                    "description": "Commands to execute if this handler is invoked."
                },
                "propagate": {
                    "type": "boolean",
                    "description": "If true, handled events are bubbled up"
                },
                "when": {
                    "type": "boolean",
                    "description": "If true, invoke this handler"
                }
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
        "url": {
            "type": "string",
            "description": "Optimized for entering URLs"
        },
        "keyboardType": {
            "properties": {
                "decimalPad": {
                    "type": "number",
                    "description": "Numbers and a decimal point"
                },
                "emailAddress": {
                    "type": "string",
                    "description": "Optimized for e-mail addresses, including the “@”, “.”, and space character."
                },
                "normal": {
                    "type": "string",
                    "description": "Default keyboard"
                },
                "numberPad": {
                    "type": "number",
                    "description": "Numbers only (good for PIN codes)"
                },
                "phonePad": {
                    "type": "string",
                    "description": "Numbers and the “*” and “#” characters"
                },
                "url": {
                    "type": "string",
                    "description": "Optimized for entering URLs"
                }
            }
        },
        "Role": commonDefinition.Role,
    },
    "type": "object",
    "properties": {
        "accessibilityLabel": {
            "type": "string",
            "category": Categories.aboutComponent,
            "description": "Voice-over will read this string when the user selects this component"
        },
        "actions": {
            "$ref": "#/definitions/ActionArray",
            "category": Categories.aboutComponent,
            "description": "Programmatic equivalents for complex touch interactions"
        },
        "bind": {
            "$ref": "#/definitions/BindingArray",
            "category": Categories.aboutComponent,
            "description": "Expressions to add to the data binding context"
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
        "entity": {
            "$ref": "#/definitions/EntityArray",
            "category": Categories.aboutComponent,
            "description": "An Array of entities associated with the component"
        },
        "entities": {
            "$ref": "#/definitions/EntityArray",
            "category": Categories.aboutComponent,
            "description": "An Array of entities associated with the component"
        },
        "handleTick": {
            "$ref": "#/definitions/TickHandlerArray",
            "category": Categories.aboutComponent,
            "description": "An Array of entities associated with the component"
        },
        "height": {
            "$ref": "#/definitions/dimension",
            "category": Categories.height,
            "description": "The requested height of the component"
        },
        "id": {
            "type": "string",
            "category": Categories.aboutComponent,
            "description": "Reference name of the component, used for navigation and events"
        },
        "inheritParentState": {
            "type": "boolean",
            "category": Categories.aboutComponent,
            "description": "If true, use the parent’s state"
        },
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
        "maxHeight": {
            "$ref": "#/definitions/dimension",
            "category": Categories.height,
            "description": "The maximum allowed height of this component."
        },
        "maxWidth": {
            "$ref": "#/definitions/dimension",
            "category": Categories.width,
            "description": "The maximum allowed width of this component"
        },
        "minHeight": {
            "$ref": "#/definitions/dimension",
            "category": Categories.height,
            "description": "The minimum allowed height of this component."
        },
        "minWidth": {
            "$ref": "#/definitions/dimension",
            "category": Categories.width,
            "description": "The minimum allowed width of this component"
        },
        "onMount": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.aboutComponent,
            "description": "Command to execute when the component is first displayed"
        },
        "onCursorEnter": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.aboutComponent,
            "description": "Command(s) to execute when a cursor (mouse pointer) enters the component’s active region"
        },
        "onCursorExit": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.aboutComponent,
            "description": "Command(s) to execute when a cursor (mouse pointer) exits the component’s active region"
        },
        "opacity": {
            "type": "number",
            "category": Categories.aboutComponent,
            "description": "Opacity of this component and children"
        },
        "padding": {
            "$ref": "#/definitions/paddingArray",
            "category": Categories.padding,
            "description": "Space to add on the sides of the component."
        },
        "paddingTop": {
            "$ref": "#/definitions/dimension",
            "category": Categories.padding,
            "description": "Space to add to the top of this component"
        },
        "paddingRight": {
            "$ref": "#/definitions/dimension",
            "category": Categories.padding,
            "description": "Space to add to the right of this component"
        },
        "paddingBottom": {
            "$ref": "#/definitions/dimension",
            "category": Categories.padding,
            "description": "Space to add to the bottom of this component"
        },
        "paddingLeft": {
            "$ref": "#/definitions/dimension",
            "category": Categories.padding,
            "description": "Space to add to the left of this component"
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
        "speech": {
            "$ref": "#/definitions/url",
            "category": Categories.aboutComponent,
            "description": "Transformed speech information for audio playback"
        },
        "style": {
            "type": "string",
            "category": Categories.aboutComponent,
            "description": "Named style or styles to apply"
        },
        "transform": {
            "$ref": "#/definitions/TransformArray",
            "category": Categories.aboutComponent,
            "description": "Array of transformations."
        },
        "type": {
            "type": "string",
            "category": Categories.aboutComponent,
            "description": "The type of this component"
        },
        "when": {
            "type": "boolean",
            "category": Categories.aboutComponent,
            "description": "If it evaluates to false, this component does not inflate"
        },
        "width": {
            "$ref": "#/definitions/dimension",
            "category": Categories.width,
            "description": "The requested width of this component"
        },
    },
    "required": [
        "type"
    ],
    "description": "A block of EditText",
    "additionalProperties": true
};
