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

export const IMPORT_LAYOUT_TEMPLATE_10 = {
  "type": "APL",
  "version": "1.0.0",
  "import": [
    {
      "name": "alexa-styles",
      "version": "1.0.0"
    }
  ],
  "resources": [
    {
      "description": "Public resource definitions for header spacing - defaults",
      "dimensions": {
        "headerBackAsset": "68",
        "headerBackAssetMarginLeft": "20",
        "headerBackAssetMarginTop": "36",
        "headerMarginTop": "48",
        "headerMarginBottom": "36",
        "headerAttributionMaxWidth": "160dp",
        "headerAttributionMaxHeight": "56dp",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-round-small",
      "when": "${@viewportProfile == @hubRoundSmall}",
      "dimensions": {
        "headerBackAsset": "0",
        "headerBackAssetMarginLeft": "0",
        "headerBackAssetMarginTop": "0",
        "headerMarginTop": "59",
        "headerMarginBottom": "24",
        "headerAttributionMaxWidth": "160dp",
        "headerAttributionMaxHeight": "56dp",
        "headerSpacer": "0"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-landscape-medium",
      "when": "${@viewportProfile == @hubLandscapeMedium}",
      "dimensions": {
        "headerBackAsset": "68",
        "headerBackAssetMarginLeft": "4",
        "headerBackAssetMarginTop": "18",
        "headerMarginTop": "32",
        "headerMarginBottom": "16",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "46",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-landscape-large",
      "when": "${@viewportProfile == @hubLandscapeLarge}",
      "dimensions": {
        "headerBackAsset": "68dp",
        "headerBackAssetMarginLeft": "20",
        "headerBackAssetMarginTop": "32",
        "headerMarginTop": "48",
        "headerMarginBottom": "36",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "56",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - tv-landscape-xlarge",
      "when": "${@viewportProfile == @tvLandscapeXLarge}",
      "dimensions": {
        "headerBackAsset": "0",
        "headerBackAssetMarginLeft": "0",
        "headerBackAssetMarginTop": "0",
        "headerMarginTop": "36",
        "headerMarginBottom": "28",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "42",
        "headerSpacer": "28"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - defaults",
      "dimensions": {
        "footerMarginTop": "36",
        "footerMarginBottom": "36"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-round-small",
      "when": "${@viewportProfile == @hubRoundSmall}",
      "dimensions": {
        "footerMarginTop": "40",
        "footerMarginBottom": "100"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-landscape-medium",
      "when": "${@viewportProfile == @hubLandscapeMedium}",
      "dimensions": {
        "footerMarginTop": "18",
        "footerMarginBottom": "36"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-landscape-large",
      "when": "${@viewportProfile == @hubLandscapeLarge}",
      "dimensions": {
        "footerMarginTop": "24",
        "footerMarginBottom": "48"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - tv-landscape-xlarge",
      "when": "${@viewportProfile == @tvLandscapeXLarge}",
      "dimensions": {
        "footerMarginTop": "24",
        "footerMarginBottom": "24"
      }
    }
  ],
  "layouts": {
    "AlexaHeader": {
      "parameters": [
        {
          "name": "headerTitle",
          "description": "Primary text to render in header.",
          "type": "string"
        },
        {
          "name": "headerSubtitle",
          "description": "Secondary text to render in header.",
          "type": "string"
        },
        {
          "name": "headerAttributionText",
          "description": "Attribution text to render in header.  Only shown when no headerAttributionImage is provided, and when headerAttributionPrimacy is true, or on a device that shows Title/Subtitle and Attribution.",
          "type": "string"
        },
        {
          "name": "headerAttributionImage",
          "description": "URL for attribution image source. Only shown when headerAttributionPrimacy is true, or on a device that shows Title/Subtitle and Attribution.",
          "type": "string"
        },
        {
          "name": "headerAttributionPrimacy",
          "description": "On devices that can only display one element due to screen size, Attribution is prioritized. Setting False displays Title/Subtitle.  Defaults to true.",
          "type": "boolean",
          "default": true
        },
        {
          "name": "headerBackButton",
          "description": "Toggle to display back button in header.  Defaults to false.",
          "type": "boolean",
          "default": false
        },
        {
          "name": "headerNavigationAction",
          "description": "DEPRECATED: Argument to pass in SendEvent command when back button is pressed",
          "type": "string"
        },
        {
          "name": "headerBackButtonCommand",
          "description": "Command that is issued when back button is pressed.",
          "type": "any",
          "default": {
            "type": "SendEvent",
            "arguments": [
              "goBack"
            ]
          }
        },
        {
          "name": "headerBackgroundColor",
          "description": "Optional color value to use as background color for Header. Defaults to transparent.",
          "type": "color",
          "default": "transparent"
        }
      ],
      "items": [
        {
          "when": "${@viewportProfile == @hubRoundSmall}",
          "type": "Frame",
          "background": "${headerBackgroundColor}",
          "item": {
            "type": "Container",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "width": "100%",
            "paddingTop": "@headerMarginTop",
            "paddingBottom": "@headerMarginBottom",
            "paddingLeft": "@marginLeft",
            "paddingRight": "@marginRight",
            "items": [
              {
                "when": "${headerAttributionPrimacy && (headerAttributionImage || headerAttributionText)}",
                "type": "AlexaHeaderAttribution",
                "headerAttributionImage": "${headerAttributionImage}",
                "headerAttributionText": "${headerAttributionText}"
              },
              {
                "when": "${!headerAttributionPrimacy || (!headerAttributionImage && !headerAttributionText)}",
                "type": "AlexaHeaderDetails",
                "headerTitle": "${headerTitle}",
                "headerSubtitle": "${headerSubtitle}"
              }
            ]
          }
        },
        {
          "type": "Frame",
          "background": "${headerBackgroundColor}",
          "item": {
            "type": "Container",
            "width": "100%",
            "minHeight": "${headerBackButton == true ? @headerBackAsset : 0}",
            "items": [
              {
                "type": "Container",
                "direction": "row",
                "justifyContent": "spaceBetween",
                "alignItems": "start",
                "width": "100%",
                "paddingTop": "@headerMarginTop",
                "paddingBottom": "@headerMarginBottom",
                "paddingLeft": "@marginLeft",
                "paddingRight": "@marginRight",
                "items": [
                  {
                    "type": "AlexaHeaderDetails",
                    "headerTitle": "${headerTitle}",
                    "headerSubtitle": "${headerSubtitle}",
                    "headerDetailsMaxWidth": "${!headerAttributionText && !headerAttributionImage ? '100%' : '70vw'}",
                    "shrink": 1,
                    "paddingRight": "${!headerAttributionText && !headerAttributionImage ? '0' : '@headerSpacer'}"
                  },
                  {
                    "when": "${(headerAttributionImage || headerAttributionText)}",
                    "type": "AlexaHeaderAttribution",
                    "headerAttributionImage": "${headerAttributionImage}",
                    "headerAttributionText": "${headerAttributionText}"
                  }
                ]
              },
              {
                "when": "${headerBackButton}",
                "type": "Container",
                "position": "absolute",
                "paddingTop": "@headerBackAssetMarginTop",
                "paddingLeft": "@headerBackAssetMarginLeft",
                "item": {
                  "type": "AlexaHeaderBackButton"
                }
              }
            ]
          }
        }
      ]
    },
    "AlexaHeaderDetails": {
      "parameters": [
        {
          "name": "headerTitle",
          "type": "string"
        },
        {
          "name": "headerSubtitle",
          "type": "string"
        },
        {
          "name": "headerDetailsMaxWidth",
          "type": "dimension",
          "default": "100%"
        }
      ],
      "items": [
        {
          "type": "Container",
          "justifyContent": "start",
          "alignItems": "${@viewportProfile == @hubRoundSmall ? 'center' : 'start'}",
          "maxWidth": "${headerDetailsMaxWidth}",
          "items": [
            {
              "type": "Text",
              "when": "${headerTitle && headerTitle != ''}",
              "text": "${headerTitle}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBodyAlt' : 'textStyleDetail'}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}"
            },
            {
              "when": "${headerSubtitle && headerSubtitle != ''}",
              "type": "Text",
              "text": "${headerSubtitle}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBody' : 'textStyleDetailAlt'}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}"
            }
          ]
        }
      ]
    },
    "AlexaHeaderAttribution": {
      "parameters": [
        {
          "name": "headerAttributionText",
          "type": "string"
        },
        {
          "name": "headerAttributionImage",
          "type": "string"
        }
      ],
      "items": [
        {
          "type": "Container",
          "justifyContent": "start",
          "alignItems": "${@viewportProfile == @hubRoundSmall ? 'center' : 'end'}",
          "width": "${@headerAttributionMaxWidth}",
          "grow": 1,
          "shrink": 1,
          "items": [
            {
              "when": "${!headerAttributionImage}",
              "type": "Text",
              "text": "${headerAttributionText}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'right'}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBody' : 'textStyleDetailAlt'}"
            },
            {
              "when": "${headerAttributionImage}",
              "type": "Image",
              "width": "100%",
              "height": "${@headerAttributionMaxHeight}",
              "source": "${headerAttributionImage}",
              "scale": "best-fit",
              "align": "${@viewportProfile == @hubRoundSmall ? 'center' : 'top-right'}"
            }
          ]
        }
      ]
    },
    "AlexaHeaderBackButton": {
      "items": [
        {
          "when": "${headerNavigationAction && (@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge)}",
          "type": "TouchWrapper",
          "onPress": {
            "type": "SendEvent",
            "arguments": [
              "${headerNavigationAction}"
            ]
          },
          "item": {
            "type": "Image",
            "source": "https://arl.assets.apl-alexa.com/packages/alexa-layouts/1.0.0/images/back_button.png",
            "width": "@headerBackAsset",
            "height": "@headerBackAsset",
            "scale": "best-fit",
            "align": "center"
          }
        },
        {
          "when": "${@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge}",
          "type": "TouchWrapper",
          "onPress": "${headerBackButtonCommand}",
          "item": {
            "type": "Image",
            "source": "https://arl.assets.apl-alexa.com/packages/alexa-layouts/1.0.0/images/back_button.png",
            "width": "@headerBackAsset",
            "height": "@headerBackAsset",
            "scale": "best-fit",
            "align": "center"
          }
        },
        {
          "type": "Text"
        }
      ]
    },
    "AlexaFooter": {
      "parameters": [
        {
          "name": "hintText",
          "type": "string",
          "description": "Hint text to display in Footer."
        },
        {
          "name": "footerHint",
          "type": "string",
          "description": "DEPRECATED: Hint text to display in Footer."
        }
      ],
      "items": [
        {
          "type": "Container",
          "direction": "row",
          "width": "100%",
          "paddingTop": "@footerMarginTop",
          "paddingBottom": "@footerMarginBottom",
          "paddingLeft": "@marginLeft",
          "paddingRight": "@marginRight",
          "items": [
            {
              "type": "Text",
              "text": "${footerHint ? footerHint : hintText}",
              "style": "textStyleHint",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}",
              "width": "100%"
            }
          ]
        }
      ]
    }
  }
}

export const IMPORT_LAYOUT_TEMPLATE_13 = {
  "type": "APL",
  "version": "1.3",
  "import": [
    {
      "name": "alexa-styles",
      "version": "1.0.0"
    }
  ],
  "export": {
    "layouts": [
      "AlexaHeader",
      {
        "name": "AlexaFooter"
      }
    ]
  },
  "resources": [
    {
      "description": "Public resource definitions for header spacing - defaults",
      "dimensions": {
        "headerBackAsset": "68",
        "headerBackAssetMarginLeft": "20",
        "headerBackAssetMarginTop": "36",
        "headerMarginTop": "48",
        "headerMarginBottom": "36",
        "headerAttributionMaxWidth": "160dp",
        "headerAttributionMaxHeight": "56dp",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-round-small",
      "when": "${@viewportProfile == @hubRoundSmall}",
      "dimensions": {
        "headerBackAsset": "0",
        "headerBackAssetMarginLeft": "0",
        "headerBackAssetMarginTop": "0",
        "headerMarginTop": "59",
        "headerMarginBottom": "24",
        "headerAttributionMaxWidth": "160dp",
        "headerAttributionMaxHeight": "56dp",
        "headerSpacer": "0"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-landscape-medium",
      "when": "${@viewportProfile == @hubLandscapeMedium}",
      "dimensions": {
        "headerBackAsset": "68",
        "headerBackAssetMarginLeft": "4",
        "headerBackAssetMarginTop": "18",
        "headerMarginTop": "32",
        "headerMarginBottom": "16",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "46",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - hub-landscape-large",
      "when": "${@viewportProfile == @hubLandscapeLarge}",
      "dimensions": {
        "headerBackAsset": "68dp",
        "headerBackAssetMarginLeft": "20",
        "headerBackAssetMarginTop": "32",
        "headerMarginTop": "48",
        "headerMarginBottom": "36",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "56",
        "headerSpacer": "32"
      }
    },
    {
      "description": "Public resource definitions for header spacing - tv-landscape-xlarge",
      "when": "${@viewportProfile == @tvLandscapeXLarge}",
      "dimensions": {
        "headerBackAsset": "0",
        "headerBackAssetMarginLeft": "0",
        "headerBackAssetMarginTop": "0",
        "headerMarginTop": "36",
        "headerMarginBottom": "28",
        "headerAttributionMaxWidth": "160",
        "headerAttributionMaxHeight": "42",
        "headerSpacer": "28"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - defaults",
      "dimensions": {
        "footerMarginTop": "36",
        "footerMarginBottom": "36"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-round-small",
      "when": "${@viewportProfile == @hubRoundSmall}",
      "dimensions": {
        "footerMarginTop": "40",
        "footerMarginBottom": "100"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-landscape-medium",
      "when": "${@viewportProfile == @hubLandscapeMedium}",
      "dimensions": {
        "footerMarginTop": "18",
        "footerMarginBottom": "36"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - hub-landscape-large",
      "when": "${@viewportProfile == @hubLandscapeLarge}",
      "dimensions": {
        "footerMarginTop": "24",
        "footerMarginBottom": "48"
      }
    },
    {
      "description": "Public resource definitions for footer spacing - tv-landscape-xlarge",
      "when": "${@viewportProfile == @tvLandscapeXLarge}",
      "dimensions": {
        "footerMarginTop": "24",
        "footerMarginBottom": "24"
      }
    }
  ],
  "layouts": {
    "AlexaHeader": {
      "parameters": [
        {
          "name": "headerTitle",
          "description": "Primary text to render in header.",
          "type": "string"
        },
        {
          "name": "headerSubtitle",
          "description": "Secondary text to render in header.",
          "type": "string"
        },
        {
          "name": "headerAttributionText",
          "description": "Attribution text to render in header.  Only shown when no headerAttributionImage is provided, and when headerAttributionPrimacy is true, or on a device that shows Title/Subtitle and Attribution.",
          "type": "string"
        },
        {
          "name": "headerAttributionImage",
          "description": "URL for attribution image source. Only shown when headerAttributionPrimacy is true, or on a device that shows Title/Subtitle and Attribution.",
          "type": "string"
        },
        {
          "name": "headerAttributionPrimacy",
          "description": "On devices that can only display one element due to screen size, Attribution is prioritized. Setting False displays Title/Subtitle.  Defaults to true.",
          "type": "boolean",
          "default": true
        },
        {
          "name": "headerBackButton",
          "description": "Toggle to display back button in header.  Defaults to false.",
          "type": "boolean",
          "default": false
        },
        {
          "name": "headerNavigationAction",
          "description": "DEPRECATED: Argument to pass in SendEvent command when back button is pressed",
          "type": "string"
        },
        {
          "name": "headerBackButtonCommand",
          "description": "Command that is issued when back button is pressed.",
          "type": "any",
          "default": {
            "type": "SendEvent",
            "arguments": [
              "goBack"
            ]
          }
        },
        {
          "name": "headerBackgroundColor",
          "description": "Optional color value to use as background color for Header. Defaults to transparent.",
          "type": "color",
          "default": "transparent"
        }
      ],
      "items": [
        {
          "when": "${@viewportProfile == @hubRoundSmall}",
          "type": "Frame",
          "background": "${headerBackgroundColor}",
          "item": {
            "type": "Container",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "width": "100%",
            "paddingTop": "@headerMarginTop",
            "paddingBottom": "@headerMarginBottom",
            "paddingLeft": "@marginLeft",
            "paddingRight": "@marginRight",
            "items": [
              {
                "when": "${headerAttributionPrimacy && (headerAttributionImage || headerAttributionText)}",
                "type": "AlexaHeaderAttribution",
                "headerAttributionImage": "${headerAttributionImage}",
                "headerAttributionText": "${headerAttributionText}"
              },
              {
                "when": "${!headerAttributionPrimacy || (!headerAttributionImage && !headerAttributionText)}",
                "type": "AlexaHeaderDetails",
                "headerTitle": "${headerTitle}",
                "headerSubtitle": "${headerSubtitle}"
              }
            ]
          }
        },
        {
          "type": "Frame",
          "background": "${headerBackgroundColor}",
          "item": {
            "type": "Container",
            "width": "100%",
            "minHeight": "${headerBackButton == true ? @headerBackAsset : 0}",
            "items": [
              {
                "type": "Container",
                "direction": "row",
                "justifyContent": "spaceBetween",
                "alignItems": "start",
                "width": "100%",
                "paddingTop": "@headerMarginTop",
                "paddingBottom": "@headerMarginBottom",
                "paddingLeft": "@marginLeft",
                "paddingRight": "@marginRight",
                "items": [
                  {
                    "type": "AlexaHeaderDetails",
                    "headerTitle": "${headerTitle}",
                    "headerSubtitle": "${headerSubtitle}",
                    "headerDetailsMaxWidth": "${!headerAttributionText && !headerAttributionImage ? '100%' : '70vw'}",
                    "shrink": 1,
                    "paddingRight": "${!headerAttributionText && !headerAttributionImage ? '0' : '@headerSpacer'}"
                  },
                  {
                    "when": "${(headerAttributionImage || headerAttributionText)}",
                    "type": "AlexaHeaderAttribution",
                    "headerAttributionImage": "${headerAttributionImage}",
                    "headerAttributionText": "${headerAttributionText}"
                  }
                ]
              },
              {
                "when": "${headerBackButton}",
                "type": "Container",
                "position": "absolute",
                "paddingTop": "@headerBackAssetMarginTop",
                "paddingLeft": "@headerBackAssetMarginLeft",
                "item": {
                  "type": "AlexaHeaderBackButton"
                }
              }
            ]
          }
        }
      ]
    },
    "AlexaHeaderDetails": {
      "parameters": [
        {
          "name": "headerTitle",
          "type": "string"
        },
        {
          "name": "headerSubtitle",
          "type": "string"
        },
        {
          "name": "headerDetailsMaxWidth",
          "type": "dimension",
          "default": "100%"
        }
      ],
      "items": [
        {
          "type": "Container",
          "justifyContent": "start",
          "alignItems": "${@viewportProfile == @hubRoundSmall ? 'center' : 'start'}",
          "maxWidth": "${headerDetailsMaxWidth}",
          "items": [
            {
              "type": "Text",
              "when": "${headerTitle && headerTitle != ''}",
              "text": "${headerTitle}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBodyAlt' : 'textStyleDetail'}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}"
            },
            {
              "when": "${headerSubtitle && headerSubtitle != ''}",
              "type": "Text",
              "text": "${headerSubtitle}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBody' : 'textStyleDetailAlt'}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}"
            }
          ]
        }
      ]
    },
    "AlexaHeaderAttribution": {
      "parameters": [
        {
          "name": "headerAttributionText",
          "type": "string"
        },
        {
          "name": "headerAttributionImage",
          "type": "string"
        }
      ],
      "items": [
        {
          "type": "Container",
          "justifyContent": "start",
          "alignItems": "${@viewportProfile == @hubRoundSmall ? 'center' : 'end'}",
          "width": "${@headerAttributionMaxWidth}",
          "grow": 1,
          "shrink": 1,
          "items": [
            {
              "when": "${!headerAttributionImage}",
              "type": "Text",
              "text": "${headerAttributionText}",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'right'}",
              "maxLines": 1,
              "style": "${@viewportProfile == @hubRoundSmall ? 'textStyleBody' : 'textStyleDetailAlt'}"
            },
            {
              "when": "${headerAttributionImage}",
              "type": "Image",
              "width": "100%",
              "height": "${@headerAttributionMaxHeight}",
              "source": "${headerAttributionImage}",
              "scale": "best-fit",
              "align": "${@viewportProfile == @hubRoundSmall ? 'center' : 'top-right'}"
            }
          ]
        }
      ]
    },
    "AlexaHeaderBackButton": {
      "items": [
        {
          "when": "${headerNavigationAction && (@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge)}",
          "type": "TouchWrapper",
          "onPress": {
            "type": "SendEvent",
            "arguments": [
              "${headerNavigationAction}"
            ]
          },
          "item": {
            "type": "Image",
            "source": "https://arl.assets.apl-alexa.com/packages/alexa-layouts/1.0.0/images/back_button.png",
            "width": "@headerBackAsset",
            "height": "@headerBackAsset",
            "scale": "best-fit",
            "align": "center"
          }
        },
        {
          "when": "${@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge}",
          "type": "TouchWrapper",
          "onPress": "${headerBackButtonCommand}",
          "item": {
            "type": "Image",
            "source": "https://arl.assets.apl-alexa.com/packages/alexa-layouts/1.0.0/images/back_button.png",
            "width": "@headerBackAsset",
            "height": "@headerBackAsset",
            "scale": "best-fit",
            "align": "center"
          }
        },
        {
          "type": "Text"
        }
      ]
    },
    "AlexaFooter": {
      "parameters": [
        {
          "name": "hintText",
          "type": "string",
          "description": "Hint text to display in Footer."
        },
        {
          "name": "footerHint",
          "type": "string",
          "description": "DEPRECATED: Hint text to display in Footer."
        }
      ],
      "items": [
        {
          "type": "Container",
          "direction": "row",
          "width": "100%",
          "paddingTop": "@footerMarginTop",
          "paddingBottom": "@footerMarginBottom",
          "paddingLeft": "@marginLeft",
          "paddingRight": "@marginRight",
          "items": [
            {
              "type": "Text",
              "text": "${footerHint ? footerHint : hintText}",
              "style": "textStyleHint",
              "textAlign": "${@viewportProfile == @hubRoundSmall ? 'center' : 'left'}",
              "width": "100%"
            }
          ]
        }
      ]
    }
  }
}

export const IMPORT_ALLOF_ONEOF_PACKAGE_IMPORT = [
  {
    "name": "alexa-layouts",
    "version": "1.6.0"
  },
  {
    "name": "alexa-layouts",
    "version": "1.5.0"
  },
  {
    "type": "allOf",
    "items": [
      {
        "name": "hub-styles",
        "version": "1.0"
      },
      {
        "name": "hub-overrides",
        "version": "1.0",
        "loadAfter": [ "hub-styles" ]
      }
    ]
  },
  {
    "type": "oneOf",
    "name": "styles",
    "items": [
      {
        "when": "${viewport.mode == 'hub'}",
        "type": "oneOf",
        "version": "1.0",
        "items": [
          {
            "source": "https://styles.com/hub-landscape.json"
          },
          {
            "source": "https://styles.com/hub-portrait.json"
          }
        ]
      },
      {
        "version": "1.0",
        "source": "https://styles.com/tv.json"
      }
    ],
    "otherwise": [
      {
        "source": "https://styles.com/generic.json"
      }
    ]
  },
  {
    "type": "package",
    "name": "overrides",
    "version": "1.0",
    "loadAfter": "styles",
    "source": "https://URL1"
  }
]

export const IMPORT_STYLES_TEMPLATE = {
    "type": "APL",
    "version": "1.0.0",
    "import": [
        {
            "name": "alexa-viewport-profiles",
            "version": "1.0.0"
        }
    ]
}

export const IMPORT_ALEXA_VIEWPORT_PROFILES = {
    "type": "APL",
    "version": "1.0.0",
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
}
