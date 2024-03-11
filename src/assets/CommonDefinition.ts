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

export const Role = {
    type: "string",
    description: "Role or purpose of the component.",
    enum: [
        "adjustable",
        "alert",
        "button",
        "checkbox",
        "combobox",
        "header",
        "image",
        "imagebutton",
        "keyboardkey",
        "link",
        "list",
        "listitem",
        "menu",
        "menubar",
        "menuitem",
        "progressbar",
        "radio",
        "radiogroup",
        "scrollbar",
        "search",
        "spinbutton",
        "summary",
        "switch",
        "tab",
        "tablist",
        "text",
        "timer",
        "toolbar"
    ]
};

export const ActionArray = {
    type: "array",
    items: {
        $ref: "#/definitions/Action"
    }
};

export const Action = {
    properties: {
        "command": {
            $ref: "#/definitions/Command",
                description: "A command to execute when this action is triggered"
        },
        "commands": {
            $ref: "#/definitions/CommandArray",
                description: "An array of commands to execute when this action is triggered"
        },
        "enabled": {
            type: "boolean",
                description: "If true this action can be executed by the user"
        },
        "label": {
            type: "string",
                description: "A localized description of this action for presentation to the user"
        },
        "name": {
            type: "string",
                description: "The name of the action to perform"
        }
    },
    additionalProperties: false,
    required: [
        "label",
        "name"
    ]
};
// only do very relax validation on url string by default
export const SimpleUrl = {
    type: "string"
};
export const ExtendedUrl = {
    type: "object",
    properties: {
        "url": SimpleUrl,
        "headers": {
            $ref: "#/definitions/stringArray"
        },
        description: {
            type: "string"
        },
    },
    required: ["url"],
    additionalProperties: false
};
export const Source = {
    "oneOf": [
        SimpleUrl,
        ExtendedUrl,
        {
            type: "array",
            items: {
                "oneOf": [SimpleUrl, ExtendedUrl]
            }
        }
    ]
}
export const Gradient = {
    type: "object",
    properties: {
        angle: {
        type: "number",
        description:
            "Angle of a linear gradient, in degrees. 0 is up, 90 is to the right",
        },
        colorRange: {
        $ref: "#/definitions/ColorArray",
        description: "The color to assign at each gradient step",
        },
        description: {
        type: "string",
        description: "Description of this gradient",
        },
        inputRange: {
        $ref: "#/definitions/numberArray",
        description:
            "The input stops of the gradient. Must be in ascending order with values between 0 and 1",
        },
        type: {
        type: "string",
        description: "The type of the gradient",
        enum: ["linear", "radial"],
        },
    },
    additionalProperties: false,
    required: ["colorRange"],
}

export const ColorArray = {
    type: "array",
    items: {
        $ref: "#/definitions/color"
    }
}

export const numberArray = {
    type: "array",
    items: {
        $ref: "#/definitions/number"
    }
}

export const tickHandler = {
    properties: {
        commands: {
            type: "array",
            description: "Handlers to check on tick events.",
            items: {
                $ref: "#/definitions/Command"
            }
        },
        description: {
            type: "string",
            description: "Optional description of this tick handler.",
            default: ""
        },
        minimumDelay: {
            type: "number",
            description: "Minimum duration in milliseconds that must pass before this handler is invoked again.",
            default: 1000
        },
        when: {
            type: "boolean",
            description: "If true, invoke this handler.",
            default: true
        }
    },
    required: [
        "commands"
    ]
}

export const tickHandlerArray = {
    type: "array",
    description: "An array of Tick Event Handlers to execute as time passes.",
    items: {
        $ref: "#/definitions/tickHandler"
    }
}
