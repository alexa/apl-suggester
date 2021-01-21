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
    "type": "string",
    "description": "Role or purpose of the component.",
    "enum": [
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
    "type": "array",
        "items": {
        "$ref": "#/definitions/Action"
    }
};

export const Action = {
    "properties": {
        "command": {
            "$ref": "#/definitions/Command",
                "description": "A command to execute when this action is triggered"
        },
        "commands": {
            "$ref": "#/definitions/CommandArray",
                "description": "An array of commands to execute when this action is triggered"
        },
        "enabled": {
            "type": "boolean",
                "description": "If true this action can be executed by the user"
        },
        "label": {
            "type": "string",
                "description": "A localized description of this action for presentation to the user"
        },
        "name": {
            "type": "string",
                "description": "The name of the action to perform"
        }
    },
    "additionalProperties": false,
        "required": [
        "label",
        "name"
    ]
};
