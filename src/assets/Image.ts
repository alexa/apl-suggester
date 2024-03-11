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
import {Categories, IJsonSchema, SCHEMA_URI} from './IJsonSchema';
import { JSON_SCHEMA as baseSchema } from "./BaseComponent";

export const JSON_SCHEMA : IJsonSchema = {
  "$schema": SCHEMA_URI,
  "definitions": {
    ...baseSchema.definitions,
    "FilterBlend": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "destination": {
          "type": "integer",
          "description": "Index of the destination image",
          "default": -2
        },
        "mode": {
          "type": "string",
          "description": "Blend mode to apply",
          "default": "normal",
          "enum": [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
            "source-atop",
            "source-in",
            "source-out"
          ]
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterBlur": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "radius": {
          "$ref": "#/definitions/dimension"
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterColor": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "color": {
          "$ref": "#/definitions/color",
          "description": "Solid color",
          "default": "transparent"
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterGradient": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "gradient": {
          "$ref": "#/definitions/Gradient",
          "description": "Gradient",
          "default": "transparent"
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterGrayscale": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "amount": {
          "type": "number",
          "description": "Proportion of the conversion",
          "default": 0.0
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterNoise": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "kind": {
          "type": "string",
          "description": "The probability distribution used to generate the noise.",
          "enum": [
            "gaussian",
            "uniform"
          ],
          "default": "gaussian"
        },
        "useColor": {
          "type": "boolean",
          "description": "If true, colored noise will be used. If false, monochromatic.",
          "default": false
        },
        "sigma": {
          "type": "number",
          "description": "Standard deviation of the noise",
          "default": 10
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterSaturate": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "amount": {
          "type": "number",
          "description": "Proportion of the conversion",
          "default": 1.0
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "FilterExtension": {
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of filter to apply"
        },
        "lower": {
          "type": "number",
          "description": "Lower bound for edge detection",
          "default": 0.1
        },
        "upper": {
          "type": "number",
          "description": "Proportion of the conversion",
          "default": 0.9
        },
        "source": {
          "type": "integer",
          "description": "Index of the source image",
          "default": -1
        }
      },
      "additionalProperties": false,
      "required": [
        "type"
      ]
    },
    "Filter": {
      "anyOf": [
        {
          "$ref": "#/definitions/FilterBlur"
        },
        {
          "$ref": "#/definitions/FilterBlend"
        },
        {
          "$ref": "#/definitions/FilterColor"
        },
        {
          "$ref": "#/definitions/FilterGradient"
        },
        {
          "$ref": "#/definitions/FilterGrayscale"
        },
        {
          "$ref": "#/definitions/FilterSaturate"
        },
        {
          "$ref": "#/definitions/FilterNoise"
        },
        {
          "$ref": "#/definitions/FilterExtension"
        }
      ]
    },
    "FilterArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Filter"
      }
    },
    "Gradient": commonDefinition.Gradient,
    "ColorArray": commonDefinition.ColorArray,
    "numberArray": commonDefinition.numberArray,
    "number": {
      "type": "number"
    },
    "Source": commonDefinition.Source
  },
  "type": "object",
  "properties": {
    ...baseSchema.properties,
    "source": {
      "$ref": "#/definitions/Source",
      "category": Categories.image,
      "description": "The URL to download the image from"
    },
    "scale": {
      "type": "string",
      "category": Categories.image,
      "description": "How the image should be scaled to fill the current box.",
      "enum": [
        "fill",
        "best-fill",
        "best-fit",
        "best-fit-down",
        "none",
      ],
      "default": "best-fit"
    },
    "align": {
      "type": "string",
      "category": Categories.image,
      "description": "How the image should be aligned in the current box",
      "enum": [
        "left",
        "right",
        "center",
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
      ]
    },
    "borderRadius": {
      "$ref": "#/definitions/dimension",
      "category": Categories.image,
      "description": "Radius of the image borders."
    },
    "overlayColor": {
      "$ref": "#/definitions/color",
      "category": Categories.image,
      "description": "Apply an appropropriate scrim to this image."
    },
    "filters": {
      "$ref": "#/definitions/FilterArray",
      "category": Categories.image,
      "description": "One or more filtering operations to apply to the image"
    },
    "overlayGradient": {
      "$ref": "#/definitions/Gradient",
      "category": Categories.image,
      "description": "Apply a colored gradient to this image."
    },
    "onLoad": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command(s) to execute when all sources have loaded"
    },
    "onFail": {
      "$ref": "#/definitions/CommandArray",
      "category": Categories.aboutComponent,
      "description": "Command(s) to execute if any source fails to load"
    }
  },
  "required": [
    "type"
  ],
  "description": "An image downloaded from a URL",
  "additionalProperties": false
};
