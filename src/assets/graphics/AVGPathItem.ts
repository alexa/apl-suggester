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
    "AVGPathItemFillOrStroke": {
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
    "Color": {
      "type": "string"
    },
    "ColorArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Color"
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
          "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGItemArray",
          "description": "An array of drawing items"
        },
        "items": {
          "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGItemArray",
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
      "$ref": "AVGBasedItemDefinitions.json#/definitions/BindingArray"
    },
    "filters": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/AVGFilterArray"
    },
    "when": {
      "type": "boolean",
      "description": "If it evaluates to false, this item does not inflate"
    },
    "type": {
      "type": "string",
      "description": "Indicates this item is a path.",
      "enum": [
        "path"
      ]
    },
    "fill": {
      "$ref": "#/definitions/AVGPathItemFillOrStroke",
      "description": "The fill color, gradient, or pattern."
    },
    "fillOpacity": {
      "type": "number",
      "description": "The opacity of the path fill."
    },
    "fillTransform": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/Transform",
      "description": "Transformation applied against the fill gradient or pattern"
    },
    "pathData": {
      "type": "string",
      "description": "The path drawing data."
    },
    "pathLength": {
      "type": "number",
      "description": "If defined, specifies the “length” of the path"
    },
    "stroke": {
      "$ref": "#/definitions/AVGPathItemFillOrStroke",
      "description": "The stroke color, gradient, or pattern."
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
    "strokeTransform": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/Transform",
      "description": "Transform applied against the stroke gradient or pattern"
    },
    "strokeWidth": {
      "type": "number",
      "description": "The width of the path stroke."
    },
    "style": {
      "$ref": "AVGBasedItemDefinitions.json#/definitions/Style"
    }
  },
  "required": [
    "type",
    "pathData"
  ],
  "additionalProperties": false
};
