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

'use strict';
/* tslint:disable */

export const IMPORT_GUI_TEMPLATE = {
    "type": "APL",
    "version": "1.0",
    "resources": [
        {
                "description": "Stock color for the light theme",
                "colors": {
                    "colorTextPrimary": "#151920"
                }
            },
            {
                "description": "Stock color for the dark theme",
                "when": "${viewport.theme == 'dark'}",
                "colors": {
                    "colorTextPrimary": "#f0f1ef"
                }
            },
            {
                "description": "Standard font sizes",
                "dimensions": {
                    "textSizeBody": 48,
                    "textSizePrimary": 27,
                    "textSizeSecondary": 23,
                    "textSizeSecondaryHint": 25
                }
            },
            {
                "description": "Common spacing values",
                "dimensions": {
                    "spacingThin": 6,
                    "spacingSmall": 12,
                    "spacingMedium": 24,
                    "spacingLarge": 48,
                    "spacingExtraLarge": 72
                }
            },
            {
                "description": "Common margins and padding",
                "dimensions": {
                    "marginTop": 40,
                    "marginLeft": 60,
                    "marginRight": 60,
                    "marginBottom": 40
                }
            }
    ]
};
