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
import {Categories, IJsonSchema} from './IJsonSchema';

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
    "Gradient": {
      "properties": {
        "angle": {
          "type": "number",
          "description": "Angle of a linear gradient, in degrees. 0 is up, 90 is to the right"
        },
        "colorRange": {
          "$ref": "#/definitions/colorArray",
          "description": "The color to assign at each gradient step"
        },
        "description": {
          "type": "string",
          "description": "Description of this gradient"
        },
        "inputRange": {
          "$ref": "#/definitions/numberArray",
          "description": "The input stops of the gradient. Must be in ascending order with values between 0 and 1"
        },
        "type": {
          "type": "string",
          "description": "The type of the gradient",
          "enum": [
            "linear",
            "radial"
          ]
        }
      },
      "additionalProperties": false,
      "required": [
        "colorRange"
      ]
    },
    "colorArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/color"
      }
    },
    "numberArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/number"
      }
    },
    "number": {
      "type": "number"
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
    "Source": commonDefinition.Source
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
