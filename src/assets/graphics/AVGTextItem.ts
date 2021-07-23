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
        "AVGTextItemFill": {
            "oneOf": [
                {
                    "$ref": "#/definitions/Color"
                },
                {
                    "$ref": "#/definitions/AVGGradient"
                },
                {
                    "$ref": "#/definitions/AVGPattern"
                }
            ]
        },
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
        "bindingArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/binding"
            }
        },
        "binding": {
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
                    "$ref": "#/definitions/filterDropShadow"
                }
            ]
        },
        "filterDropShadow": {
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
        "style": {
            "type": "string",
            "description": "Named style to apply"
        },
        "transform": {
            "type": "string",
            "description": "Transform applied to the contents of the group."
        },
        "ColorArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/color"
            }
        },
        "AVGGradient": {
            "oneOf": [
                {
                    "$ref": "#/definitions/AVGLinearGradient"
                },
                {
                    "$ref": "#/definitions/AVGRadialGradient"
                }
            ]
        },
        "AVGLinearGradient": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Defines the gradient type",
                    "enum": [
                        "linear"
                    ]
                },
                "colorRange": {
                    "$ref": "#/definitions/ColorArray",
                    "description": "The color to assign at each gradient stop."
                },
                "description": {
                    "type": "string",
                    "description": "Optional description of this gradient"
                },
                "inputRange": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "description": "The input stops of the gradient."
                },
                "units": {
                    "type": "string",
                    "description": "The coordinate system for positioning",
                    "enum": [
                        "userSpace",
                        "boundingBox"
                    ]
                },
                "spreadMethod": {
                    "type": "string",
                    "description": "Gradient behavior outside of the defined range",
                    "enum": [
                        "pad",
                        "reflect",
                        "repeat"
                    ]
                },
                "x1": {
                    "type": "number",
                    "description": "Gradient behavior outside of the defined range"
                },
                "x2": {
                    "type": "number",
                    "description": "Gradient behavior outside of the defined range"
                },
                "y1": {
                    "type": "number",
                    "description": "Gradient behavior outside of the defined range"
                },
                "y2": {
                    "type": "number",
                    "description": "Gradient behavior outside of the defined range"
                }
            },
            "required": [
                "type",
                "colorRange"
            ],
            "additionalProperties": false
        },
        "AVGRadialGradient": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Defines the gradient type",
                    "enum": [
                        "radial"
                    ]
                },
                "colorRange": {
                    "$ref": "#/definitions/ColorArray",
                    "description": "The color to assign at each gradient stop."
                },
                "description": {
                    "type": "string",
                    "description": "Optional description of this gradient"
                },
                "inputRange": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "description": "The input stops of the gradient."
                },
                "units": {
                    "type": "string",
                    "description": "The coordinate system for positioning",
                    "enum": [
                        "userSpace",
                        "boundingBox"
                    ]
                },
                "centerX": {
                    "type": "number",
                    "description": "The x-position of the center of the gradient"
                },
                "centerY": {
                    "type": "number",
                    "description": "The y-position of the center of the gradient"
                },
                "radius": {
                    "type": "number",
                    "exclusiveMinimum" : 0,
                    "description": "The radius of the gradient (distance to end)"
                }
            },
            "required": [
                "type",
                "colorRange"
            ],
            "additionalProperties": false
        },
        "AVGPattern": {
            "type": "object",
            "properties": {
                "description": {
                    "type": "string",
                    "description": "Optional description of this pattern."
                },
                "height": {
                    "type": "number",
                    "description": "height"
                },
                "width": {
                    "type": "number",
                    "description": "Width of the pattern"
                },
                "item": {
                    "$ref": "#/definitions/AVGItemArray",
                    "description": "An array of drawing items"
                },
                "items": {
                    "$ref": "#/definitions/AVGItemArray",
                    "description": "An array of drawing items"
                }
            },
            "required": [
                "height",
                "width"
            ],
            "additionalProperties": false
        },
    },
    "type": "object",
    "properties": {
        "bind": {
            "$ref": "#/definitions/bindingArray"
        },
        "filters": {
            "$ref": "#/definitions/AVGFilterArray"
        },
        "type": {
            "type": "string",
            "description": "Indicates this item is a text item.",
            "enum": [
                "text"
            ]
        },
        "fill": {
            "$ref": "#/definitions/AVGTextItemFill",
            "description": "The text fill color, gradient, or pattern"
        },
        "fillOpacity": {
            "type": "number",
            "description": "The opacity of the text fill."
        },
        "fillTransform": {
            "$ref": "#/definitions/transform",
            "description": "Transformation applied against the fill gradient or pattern"
        },
        "fontFamily": {
            "type": "string",
            "description": "The name of the font family"
        },
        "fontSize": {
            "type": "number",
            "description": "The size of the font"
        },
        "fontStyle": {
            "type": "string",
            "description": "The style of the font",
            "enum": [
                "normal",
                "italic"
            ]
        },
        "fontWeight": {
            "type": "string",
            "description": "The weight of the font",
            "enum": [
                "normal",
                "bold",
                "100",
                "200",
                "300",
                "400",
                "500",
                "600",
                "700",
                "800",
                "900"
            ]
        },
        "letterSpacing": {
            "type": "number",
            "description": "Additional space to add between letters"
        },
        "stroke": {
            "$ref": "#/definitions/AVGTextItemFill",
            "description": "The text stroke color, gradient, or pattern."
        },
        "strokeOpacity": {
            "type": "number",
            "description": "The opacity of the text stroke."
        },
        "strokeTransform": {
            "$ref": "#/definitions/transform",
            "description": "Transform applied against the stroke gradient or pattern"
        },
        "strokeWidth": {
            "type": "number",
            "description": "The width of the text stroke."
        },
        "style": {
            "$ref": "#/definitions/style"
        },
        "text": {
            "type": "string",
            "description": "The text to display"
        },
        "textAnchor": {
            "type": "string",
            "description": "Direction the text hangs from the starting point",
            "enum": [
                "start",
                "middle",
                "end"
            ]
        },
        "when": {
            "type": "boolean",
            "description": "If it evaluates to false, this item does not inflate"
        },
        "x": {
            "type": "number",
            "description": "X-coordinate starting point (viewport coordinates)"
        },
        "y": {
            "type": "number",
            "description": "Y-coordinate starting point (viewport coordinates)"
        }
    },
    "required": [
        "type"
    ],
    "additionalProperties": false
};
