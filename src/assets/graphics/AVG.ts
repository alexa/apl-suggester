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
import { IJsonSchema, SCHEMA_URI } from '../IJsonSchema';
export const JSON_SCHEMA : IJsonSchema = {
    "$schema": SCHEMA_URI,
    "$id": "Graphics.json",
    "definitions": {
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
        "anyArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/any"
            }
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
        "GraphicItems": {
            "oneOf": [
                {
                    "type": "string"
                },
                {
                    "$ref": "#/definitions/AVGItem"
                },
                {
                    "$ref": "#/definitions/AVGItemArray"
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
                    "description": "Indicates this item is a path.",
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
                "pathData": {
                    "type": "string",
                    "description": "The path drawing data."
                },
                "fillOpacity": {
                    "type": "number",
                    "description": "The opacity of the path fill."
                },
                "pathLength": {
                    "type": "number",
                    "description": "If defined, specifies the “length” of the path"
                },
                "strokeDashArray": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "description": "Pattern of dashes and gaps"
                },
                "strokeDashOffset": {
                    "type": "number",
                    "description": "Offset into dash array pattern"
                },
                "strokeLineCap": {
                    "type": "string",
                    "description": "Shape to be used at the end of open paths",
                    "enum": [
                        "butt",
                        "round",
                        "square"
                    ]
                },
                "strokeLineJoin": {
                    "type": "string",
                    "description": "How path corners are drawn",
                    "enum": [
                        "bevel",
                        "miter",
                        "round"
                    ]
                },
                "strokeMiterLimit": {
                    "type": "number",
                    "description": "When sharp path corners are beveled"
                },
                "strokeOpacity": {
                    "type": "number",
                    "description": "The opacity of the path stroke."
                },
                "strokeWidth": {
                    "type": "number",
                    "description": "The width of the path stroke."
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
                "x": {
                    "type": "number",
                    "description": "X-coordinate starting point (viewport coordinates)"
                },
                "y": {
                    "type": "number",
                    "description": "Y-coordinate starting point (viewport coordinates)"
                },
                "clipPath": {
                    "type": "string",
                    "description": "Clipping path."
                },
                "data": {
                    "$ref": "#/definitions/anyArray",
                    "description": "Data to bind into the child items."
                },
                "opacity": {
                    "type": "number",
                    "description": "The opacity of the group."
                },
                "rotation": {
                    "type": "number",
                    "description": "Rotation angle of the group, in degrees."
                },
                "pivotX": {
                    "type": "number",
                    "description": "X-coordinate of the rotation pivot point (viewport coordinates)."
                },
                "pivotY": {
                    "type": "number",
                    "description": "Y-coordinate of the rotation pivot point (viewport coordinates)."
                },
                "scaleX": {
                    "type": "number",
                    "description": "Scaling factor on the X-axis."
                },
                "scaleY": {
                    "type": "number",
                    "description": "Scaling factor on the Y-axis."
                },
                "translateX": {
                    "type": "number",
                    "description": "X-coordinate translation (viewport coordinates)"
                },
                "translateY": {
                    "type": "number",
                    "description": "Y-coordinate translation (viewport coordinates)"
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
        "AVGFilterArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/AVGFilter"
            }
        },
        "AVGFilter": {
            "anyOf": [
                {
                    "$ref": "#/definitions/FilterDropShadow"
                }
            ]
        },
        "FilterDropShadow": {
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
        "GraphicResourcesBlockArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/GraphicResourcesBlock"
            }
        },
        "GraphicResourcesBlock": {
            "properties": {
                "booleans": {
                    "patternProperties": {
                        "^.*$": {
                            "type": "boolean"
                        }
                    },
                    "description": "A mapping from boolean name to boolean value"
                },
                "boolean": {
                    "patternProperties": {
                        "^.*$": {
                            "type": "boolean"
                        }
                    },
                    "description": "A mapping from boolean name to boolean value"
                },
                "colors": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/color"
                        }
                    },
                    "description": "A mapping from color name to color value"
                },
                "color": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/color"
                        }
                    },
                    "description": "A mapping from color name to color value"
                },
                "description": {
                    "type": "string",
                    "description": "A description of this resource block."
                },
                "easings": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/Easing"
                        }
                    },
                    "description": "Map from easing name to easing definition"
                },
                "easing": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/Easing"
                        }
                    },
                    "description": "Map from easing name to easing definition"
                },
                "gradients": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/AVGGradient"
                        }
                    },
                    "description": "Map from gradient name to gradient definition"
                },
                "gradient": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/AVGGradient"
                        }
                    },
                    "description": "Map from gradient name to gradient definition"
                },
                "numbers": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/number"
                        }
                    },
                    "description": "A mapping from a name to a number"
                },
                "number": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/number"
                        }
                    },
                    "description": "A mapping from a name to a number"
                },
                "patterns": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/AVGPattern"
                        }
                    },
                    "description": "A mapping from name to a pattern"
                },
                "pattern": {
                    "patternProperties": {
                        "^.*$": {
                            "$ref": "#/definitions/AVGPattern"
                        }
                    },
                    "description": "A mapping from name to a pattern"
                },
                "strings": {
                    "patternProperties": {
                        "^.*$": {
                            "type": "string"
                        }
                    },
                    "description": "A mapping from a name to a string"
                },
                "string": {
                    "patternProperties": {
                        "^.*$": {
                            "type": "string"
                        }
                    },
                    "description": "A mapping from a name to a string"
                },
                "when": {
                    "type": "boolean",
                    "description": "If true, this resource block will be included. Defaults to true"
                },
            }
        },
        "color": {
            "type": "string"
        },
        "ColorArray": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/color"
            }
        },
        "Value": {
            "properties": {
                "when": {
                    "type": "boolean",
                    "description": "If true, this resource block will be included. Defaults to true"
                },
            },
            "additionalProperties": true,
        },
        "Easing": {
            "type": "string"
        },
        "number": {
            "type": "number"
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
                    "$ref": "#/definitions/GraphicItems",
                    "description": "An array of drawing items"
                },
                "items": {
                    "$ref": "#/definitions/GraphicItems",
                    "description": "An array of drawing items"
                }
            },
            "required": [
                "height",
                "width"
            ],
            "additionalProperties": false
        },
        "GraphicStyles": {
            "properties": {
                "description": {
                    "type": "string",
                    "description": "A description of this style"
                },
                "extend": {
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/stringArray"
                        }
                    ]
                },
                "extends": {
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/stringArray"
                        }
                    ]
                },
                "values": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Value"
                    }
                },
                "value": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Value"
                    }
                }
            },
            "additionalProperties": false
        },
        "stringArray": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "GraphicParameterArray": {
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "type": "string"
                    },
                    {
                        "$ref": "#/definitions/GraphicParameter"
                    }
                ]
            }
        },
        "GraphicParameter": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name of the parameter"
                },
                "description": {
                    "type": "string",
                    "description": "An optional description of this parameter and the purpose it serves."
                },
                "type": {
                    "type": "string",
                    "description": "The type of the parameter.",
                    "enum": [
                        "any",
                        "color",
                        "number",
                        "string"
                    ]
                },
                "default": {
                    "$ref": "#/definitions/any",
                    "description": "Default value to assign if not provided."
                }
            },
            "additionalProperties": true,
            "required": [
                "name"
            ]
        },
        "ScaleType": {
            "type": "string",
            "enum": [
                "none",
                "grow",
                "shrink",
                "stretch"
            ]
        },
    },
    "type": "object",
    "properties": {
        "data": {
            "$ref": "#/definitions/anyArray",
            "description": "Data to bind into the child items."
        },
        "description": {
            "type": "string",
            "description": "Optional description of this vector graphic."
        },
        "height": {
            "$ref": "#/definitions/dimension",
            "description": "The height of the graphic."
        },
        "item": {
            "$ref": "#/definitions/GraphicItems"
        },
        "items": {
            "$ref": "#/definitions/GraphicItems"
        },
        "resources": {
            "$ref": "#/definitions/GraphicResourcesBlockArray",
            "description": "Local graphic-specific resources"
        },
        "styles": {
            "patternProperties": {
                "^.*$": {
                    "$ref": "#/definitions/GraphicStyles"
                }
            },
            "description": "Local graphic-specific styles"
        },
        "parameters": {
            "$ref": "#/definitions/GraphicParameterArray",
            "description": "An array of parameter values that can be set on the AVG object."
        },
        "scaleTypeHeight": {
            "$ref": "#/definitions/ScaleType",
            "description": "How the viewport height changes as the height scales."
        },
        "scaleTypeWidth": {
            "$ref": "#/definitions/ScaleType",
            "description": "How the viewport width changes as the width scales."
        },
        "type": {
            "type": "string",
            "description": "The type of vector graphic.",
            "enum": [
                "AVG"
            ]
        },
        "version": {
            "type": "string",
            "description": "The current release version of the AVG standard.",
            "enum": [
                "1.0",
                "1.1",
                "1.2"
            ]
        },
        "viewportHeight": {
            "type": "number",
            "description": "	The height of the viewport."
        },
        "viewportWidth": {
            "type": "number",
            "description": "	The width of the viewport."
        },
        "width": {
            "$ref": "#/definitions/dimension",
            "description": "The width of the graphic."
        },
    },
    "required": [
        "height",
        "type",
        "version",
        "width"
    ],
    "additionalProperties": false
};
