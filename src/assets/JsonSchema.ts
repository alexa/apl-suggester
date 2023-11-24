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
import { IJsonSchema, SCHEMA_URI } from './IJsonSchema';
import * as commonDefinition from "./CommonDefinition";

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "$id": "JsonSchema",
  "definitions": {
    "UserDefinedCommand": {
      "properties": {
        "parameters": {
          "$ref": "#/definitions/CommandParameterArray",
          "description": "Optional named parameters to add to the data-binding context."
        },
        "commands": {
          "oneOf": [
            {
              "$ref": "#/definitions/Command"
            },
            {
              "$ref": "#/definitions/CommandArray"
            },
            {
              "type": "string"
            }
          ]
        },
        "command": {
          "oneOf": [
            {
              "$ref": "#/definitions/Command"
            },
            {
              "$ref": "#/definitions/CommandArray"
            },
            {
              "type": "string"
            }
          ]
        },
        "description": {
          "type": "string",
          "description": "Description of this command."
        }
      },
      "additionalProperties": false,
      "oneOf": [
        {
          "required": [
            "command"
          ]
        },
        {
          "required": [
            "commands"
          ]
        }
      ]
    },
    "CommandParameterArray": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/definitions/CommandParameter"
          }
        ]
      }
    },
    "CommandParameter": {
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
            "array",
            "boolean",
            "color",
            "dimension",
            "integer",
            "map",
            "number",
            "object",
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
    "CommandArray": {
      "anyOf": [
        {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Command"
          }
        },
        {
          "$ref": "#/definitions/Command",
        }
      ]
    },
    "Command": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of the command."
        }
      },
      "additionalProperties": true,
      "required": [
        "type"
      ],
      "type": "object"
    },
    "Graphic": {
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
        "lang": {
          "type": "string",
          "description": "The language specified for the AVG object."
        },
        "layoutDirection": {
          "type": "string",
          "description": "The layoutDirection specified for the AVG object.",
          "default": "LTR",
          "enum": [
            "LTR",
            "RTL"
          ]
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
    "ScaleType": {
      "type": "string",
      "enum": [
        "none",
        "grow",
        "shrink",
        "stretch"
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
    "Setting": {
      "$ref": "#/definitions/any"
    },
    "ImportArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Import"
      }
    },
    "Import": {
      "type": "object",
      "properties": {
        "loadAfter": {
          "type": [
            "array",
            "string"
          ],
          "description": "The list of the import names this import should load after.",
            "items": {
              "type": "string"
            }
        },
        "when": {
            "type": "boolean",
            "description": "If it evaluates to false, this import is not included."
        },
        "type": {
          "type": "string",
          "description": "Import type. “package” by default.",
          "enum": [
            "allOf", "oneOf", "package"
          ]
        },
      },
      "unevaluatedProperties": false,
      "if": {
            "properties": {
              "type": {
                "const": "package"
                }
            }
      },
      "then": {
        "$ref": "#/definitions/ImportPackage",
          "required": [
            "name",
            "version"
          ],
      },
      "else": {
        "if": {
          "properties": {
            "type": {
              "const": "allOf"
            }
          }
        },
        "then": {
          "$ref": "#/definitions/ImportAllOf",
        },
        "else": {
          "if": {
            "properties": {
              "type": {
                "const": "oneOf"
                }
            }
          },
          "then": {
            "$ref": "#/definitions/ImportOneOf"
          },
          else: {
            "$ref": "#/definitions/ImportPackage",
            "required": [
              "name",
              "version"
            ],
          }
          
        }
      }
    },
    "ImportAllOf": {
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "description": "An ordered array of imports to select from.",
          "$ref": "#/definitions/ImportArray"
        }
      }
    },
    "ImportPackage": {
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the import."
        },
        "source": {
          "type": "string",
          "description": "A downloadable URL containing the contents of the package."
        },
        "version": {
          "type": "string",
          "description": "The version of the import."
        }
      }
    },
    "ImportOneOf": {
      "required": [
        "items"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "description": "Array of imports to process if none were selected from items array."
        },
        "otherwise": {
          "description": "Array of imports to process if none were selected from items array.",
          "type": "array"
        },
        "version": {
          "type": "string",
          "description": "The version of the import."
        }
      }
    },
    "Layout": {
      "properties": {
        "bind": {
          "$ref": "#/definitions/BindingArray",
          "description": "Named values to add to the data-binding context"
        },
        "parameters": {
          "$ref": "#/definitions/LayoutParameterArray",
          "description": "Named parameters that can be passed to this layout from another layout."
        },
        "items": {
          "oneOf": [
            {
              "$ref": "#/definitions/Component"
            },
            {
              "$ref": "#/definitions/ComponentArray"
            }
          ]
        },
        "item": {
          "oneOf": [
            {
              "$ref": "#/definitions/Component"
            },
            {
              "$ref": "#/definitions/ComponentArray"
            }
          ]
        },
        "description": {
          "type": "string",
          "description": "An optional description of this layout and the purpose it serves."
        }
      },
      "additionalProperties": true,
      "oneOf": [
        {
          "required": [
            "item"
          ]
        },
        {
          "required": [
            "items"
          ]
        }
      ]
    },
    "LayoutParameterArray": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/definitions/LayoutParameter"
          }
        ]
      }
    },
    "LayoutParameter": {
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
            "array",
            "string",
            "number",
            "integer",
            "color",
            "boolean",
            "dimension",
            "component",
            "map",
            "object"
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
        }
      },
      "additionalProperties": true,
      "required": [
        "type"
      ],
      "type": "object"
    },
    "ResourceBlockArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/ResourceBlock"
      }
    },
    "ResourceBlock": {
      "properties": {
        "description": {
          "type": "string",
          "description": "Description of this resource block"
        },
        "when": {
          "type": "boolean",
          "description": "Conditional definition.  If true, this resource block will be inflated"
        },
      },
      "patternProperties": {
        "^color(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "$ref": "#/definitions/color"
            }
          },
          "description": "Map of color name to value"
        },
        "^dimension(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "$ref": "#/definitions/dimension"
            }
          },
          "description": "Map of dimension name to value"
        },
        "^number(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "number"
            }
          },
          "description": "Map of names to numbers"
        },
        "^boolean(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "boolean"
            }
          },
          "description": "Map of names to booleans"
        },
        "^string(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "string"
            }
          },
          "description": "Map of names to strings"
        },
        "^easing(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "$ref": "#/definitions/Easing"
            }
          },
          "description": "Map from easing name to easing definition"
        },
        "^gradient(s?)$": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "$ref": "#/definitions/AVGGradient"
            }
          },
          "description": "Map from gradient name to gradient definition"
        },
      },
      "additionalProperties": false
    },
    "color": {
      "type": "string"
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
    "dimension": {
      "type": ["string","number"],
      "if": {
        "type": "string"
      },
      "then": {
        "pattern": "^(auto)$|^[+]?[0-9]\\d*(\\.\\d+)?(px|vh|%|dp|vw)?$"
      }
  },
    "Style": {
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
          "anyOf": [
            {
              "$ref": "#/definitions/StyleBlock"
            },
            {
              "$ref": "#/definitions/StyleBlockArray"
            },
            {
              "type": "string"
            }
          ]
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
    "StyleBlockArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/StyleBlock"
      }
    },
    "StyleBlock": {
      "patternProperties": {
        "when": {
          "type": "boolean",
          "description": "When true, include this in the style"
        },
        "^.*$": {
          "$ref": "#/definitions/any",
          "description": "Any other style property"
        }
      }
    },
    "TestCaseArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/TestCase"
      }
    },
    "TestCase": {
      "properties": {
        "label": {
          "type": "string",
          "description": "Human-readable label for the test case"
        },
        "command": {
          "$ref": "#/definitions/CommandArray",
          "description": "Command or set of commands to exeucte"
        }
      },
      "additionalProperties": false,
      "required": [
        "label",
        "command"
      ]
    },
    "ColorArray": commonDefinition.ColorArray,
    "dimensions": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/dimension"
        }
      }
    },
    "anyArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/any"
      }
    },
    "number": {
      "type": "number"
    },
    "numberArray": commonDefinition.numberArray,
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
    "BindingArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Binding"
      }
    },
    "EntityArray": {
      "type": "array"
    },
    "Gradient": commonDefinition.Gradient,
    "ExtensionArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Extension"
      }
    },
    "Extension": {
      "properties": {
        "name": {
          "type": "string",
          "description": "The local name/namespace of the extension"
        },
        "uri": {
          "type": "string",
          "description": "The URI of the requested extension"
        },
        "required": {
          "type": "boolean",
          "description":
            "Fail the document if the extension fails to register, default to false"
        }
      },
      "additionalProperties": false,
      "required": [
        "name",
        "uri"
      ]
    },
    "Environment": {
      "properties": {
        "lang": {
          "type": "string",
          "description": "Document level language."
        },
        "layoutDirection": {
          "type": "string",
          "description": "Document level layout direction.",
          "enum": [
            "LTR",
            "RTL"
          ]
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "background": {
      "anyOf": [
        {
          "$ref": "#/definitions/color"
        },
        {
          "$ref": "#/definitions/Gradient"
        }
      ],
      "description": "Override standard background color."
    },
    "commands": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/UserDefinedCommand"
        }
      },
      "description": "A map of user-defined command."
    },
    "description": {
      "type": "string",
      "description": "An optional description of this document."
    },
    "handleTick": {
      "$ref":"#/definitions/tickHandlerArray",
      "description": "An array of Tick Event Handlers to execute as time passes."
    },
    "graphics": {
      "patternProperties": {
        "^.*$": {
          "$ref": "Graphics.json#"
        }
      },
      "description": "A map of vector graphic."
    },
    "import": {
      "$ref": "#/definitions/ImportArray",
      "description": "A list of references to external packages."
    },
    "environment": {
      "$ref": "#/definitions/Environment",
      "description": "The environment property is used to override system default environment settings."
    },
    "mainTemplate": {
      "$ref": "#/definitions/Layout",
      "description": "The main layout to inflate for this document."
    },
    "onConfigChange": {
      "$ref": "#/definitions/CommandArray",
      "description": "A list of commands to execute when the document configuration changes."
    },
    "onDisplayStateChange": {
      "$ref": "#/definitions/CommandArray",
      "description": "A list of the commands to execute whenever the display state of the document changes"
    },
    "onMount": {
      "$ref": "#/definitions/CommandArray",
      "description": "A list of commands to execute when the document is first displayed."
    },
    "onSpeechMark": {
      "$ref": "#/definitions/CommandArray",
      "description": "A list of commands to execute when speech specified audio reaches the position defined by a SpeechMark."
    },
    "resources": {
      "$ref": "#/definitions/ResourceBlockArray",
      "description": "A list of one or more resource groups"
    },
    "settings": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/Setting"
        }
      },
      "description": "A map of document-wide settings."
    },
    "styles": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/Style"
        }
      },
      "description": "A map of style name to style definition"
    },
    "layouts": {
      "patternProperties": {
        "^.*$": {
          "$ref": "#/definitions/Layout"
        }
      },
      "description": "A map of name to layout."
    },
    "type": {
      "type": "string",
      "description": "The document type.",
      "enum": [
        "APL"
      ]
    },
    "version": {
      "type": "string",
      "description": "Version of the specification this document follows.",
      "enum": [
        "1.0",
        "1.1",
        "1.2",
        "1.3",
        "1.4",
        "1.5",
        "1.6",
        "1.7",
        "1.8",
        "1.9",
        "2022.1",
        "2022.2",
        "2023.1",
        "2023.2",
        "2023.3"
      ]
    },
    "license": {
      "type": "string",
      "description": "The sample templates are under Amazon Software License"
    },
    "tests": {
      "$ref": "#/definitions/TestCaseArray",
      "description": "Internal test cases - not part of the official APML definition"
    },
    "theme": {
      "type": "string",
      "description": "Reflects the basic color scheme in use on the device.",
      "enum": [
        "dark",
        "light"
      ]
    },
    "extensions": {
      "$ref": "#/definitions/ExtensionArray",
      "description": "An optional list of APL extensions requested by the document"
    }
  },
  "additionalProperties": false,
  "required": [
    "mainTemplate",
    "type",
    "version"
  ]
};
