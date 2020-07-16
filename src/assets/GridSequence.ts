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
import {Categories, IJsonSchema} from './IJsonSchema';

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
        "stringArray": {
            "type": "array",
            "items": {
                "type": "string"
            }
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
        "color": {
            "type": "string"
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
        "dimensionArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/dimension"
            }
        },
        "ComponentArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/Component"
            }
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
        "anyArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/any"
            }
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
                }
            ]
        },
        "KeyHandler": {
            "properties": {
                "commands": {
                    "$ref": "#/definitions/CommandArray",
                    "description": "Commands to execute if this handler is invoked."
                },
                "propagate": {
                    "type": "boolean",
                    "description": "If true, handled events are bubbled up."
                },
                "when": {
                    "type": "boolean",
                    "description": "If true, invoke this handler"
                }
            },
            "additionalProperties": false
        },
        "KeyHandlerArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/KeyHandler"
            }
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
        }
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
        "data": {
            "$ref": "#/definitions/anyArray",
            "category": Categories.gridSequence,
            "description": "Data to bind into this container.  This should be an array of data items. Each item will be bound to the 'data' global variable and the 'item' component will be inflated using that data item.  The 'index' global variable will be assigned the 0-based array offset of the item. The 'ordinal' global variable will be assigned for each 'numbered' child"
        },
        "firstItem": {
            "$ref": "#/definitions/ComponentArray",
            "category": Categories.gridSequence,
            "description": "A child component to put at the beginning of the layout."
        },
        "lastItem": {
            "$ref": "#/definitions/ComponentArray",
            "category": Categories.gridSequence,
            "description": "A child component to put at the end of the layout"
        },
        "onChildAdded": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.gridSequence,
            "description": "Command to execute when a component is added to the multichild component"
        },
        "onChildRemoved": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.gridSequence,
            "description": "Command to execute when a component is removed from the multichild component"
        },
        "onFocus": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.gridSequence,
            "description": "Command to execute when the component receives focus."
        },
        "onBlur": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.gridSequence,
            "description": "Command to execute when the component loses focus."
        },
        "handleKeyDown": {
            "$ref": "#/definitions/KeyHandlerArray",
            "category": Categories.gridSequence,
            "description": "Keyboard handler(s) to evaluate when the component receives a key down."
        },
        "handleKeyUp": {
            "$ref": "#/definitions/KeyHandlerArray",
            "category": Categories.gridSequence,
            "description": "Keyboard handler(s) to evaluate when the component receives a key up."
        },
        "childHeight": {
            "oneOf": [
                {
                    "$ref": "#/definitions/dimension"
                },
                {
                    "$ref": "#/definitions/dimensionArray"
                }
            ],
            "category": Categories.gridSequence,
            "description": "The height of children."
        },
        "childHeights": {
            "oneOf": [
                {
                    "$ref": "#/definitions/dimension"
                },
                {
                    "$ref": "#/definitions/dimensionArray"
                }
            ],
            "category": Categories.gridSequence,
            "description": "The height of children."
        },
        "childWidth": {
            "oneOf": [
                {
                    "$ref": "#/definitions/dimension"
                },
                {
                    "$ref": "#/definitions/dimensionArray"
                }
            ],
            "category": Categories.gridSequence,
            "description": "The width of children."
        },
        "childWidths": {
            "oneOf": [
                {
                    "$ref": "#/definitions/dimension"
                },
                {
                    "$ref": "#/definitions/dimensionArray"
                }
            ],
            "category": Categories.gridSequence,
            "description": "The width of children."
        },
        "numbered": {},
        "onScroll": {
            "$ref": "#/definitions/CommandArray",
            "category": Categories.gridSequence,
            "description": "Command to execute during scrolling",
            "default": false
        },
        "scrollDirection": {
            "type": "string",
            "category": Categories.gridSequence,
            "description": "The direction to scroll this sequence.",
            "enum": [
                "horizontal",
                "vertical"
            ],
            "default": "vertical"
        },
        "snap": {
            "type": "string",
            "category": Categories.gridSequence,
            "description": "The alignment to snap to after scrolling.",
            "enum": [
                "none",
                "start",
                "center",
                "end"
            ],
            "default": "none"
        },
        "item": {},
        "items": {}
    },
    "required": [
        "type",
    ],
    "oneOf": [
        {
            "required": [
                "childWidth",
                "childHeight"
            ]
        },
        {
            "required": [
                "childWidths",
                "childHeight"
            ]
        },
        {
            "required": [
                "childWidth",
                "childHeights"
            ]
        },
        {
            "required": [
                "childWidths",
                "childHeights"
            ]
        }
    ],
    "description": "A grid sequence uses a data set to inflate a repeating set of components and display them in a fixed grid layout that scrolls in a single direction",
    "additionalProperties": false
};
