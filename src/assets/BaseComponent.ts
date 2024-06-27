/* tslint:disable */
import {Categories, IJsonSchema} from './IJsonSchema';
import * as commonDefinition from "./CommonDefinition";

export const JSON_SCHEMA : IJsonSchema = {
  type: "object",
  definitions: {
    url: {
      type: "string"
    },
    ActionArray: commonDefinition.ActionArray,
    Action: commonDefinition.Action,
    anyArray: {
      type: "array",
      items: {
        $ref: "#/definitions/any"
      }
    },
    ComponentArray: {
        type: "array",
        items: {
            $ref: "#/definitions/Component"
        }
    },
    dimension: {
      oneOf: [
        {
          type: "string",
          pattern: "^(auto)$|^[+]?[0-9]\\d*(\\.\\d+)?(px|vh|%|dp|vw)?$"
        },
        {
          type: "number"
        }
      ]
    },
    absoluteDimension: {
      type: ["string","number"],
      if: {
        type: "string"
      },
      then: {
        pattern: "^[+]?[0-9]\\d*(\\.\\d+)?(px|vh|%|dp|vw)?$"
      },
      else: {
        minimum: 0
      }
    },
    absoluteDistance: {
      oneOf: [
        {
          type: "string",
          pattern: "^[+-]?[0-9]\\d*(\\.\\d+)?(px|vh|%|dp|vw)?$"
        },
        {
          type: "number"
        }
      ]
    },
    paddingArray: {
      oneOf: [
      {
        type: "array",
        items: {
        $ref: "#/definitions/dimension",
        }
      },
      {
        $ref: "#/definitions/dimension",
      }
      ]
    },
    EntityArray: {
      type: "array"
    },
    tickHandler: commonDefinition.tickHandler,
    tickHandlerArray: commonDefinition.tickHandlerArray,
    VisibilityChangeHandlerArray: {
      type: "array",
      items: {
        $ref: "#/definitions/VisibilityChangeHandler",
      },
    },
    VisibilityChangeHandler: {
      properties: {
        commands: {
          $ref: "#/definitions/CommandArray",
          description: "Commands to execute if this handler is invoked.",
        },
        description: {
          type: "string",
          description: "Optional description of the handler",
        },
        when: {
          type: "boolean",
          description: "If true, invoke this handler",
        },
      },
      additionalProperties: false,
      required: ["commands"],
    },
    stringArray: {
      type: "array",
      items: {
      type: "string"
      }
    },
    BindingArray: {
      type: "array",
      items: {
      $ref: "#/definitions/Binding"
      }
    },
    Binding: {
      properties: {
        name: {
          type: "string",
          description: "The name to add to data-binding"
        },
        value: {
          $ref: "#/definitions/any",
          description: "The value to add to data-binding. May be a data-bound expression"
        },
        type: {
          description: "The type of value to add to data-binding.",
          enum: [
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
        },
        onChange: {
	        $ref: "#/definitions/CommandArray",
	        description:
	          "A list of commands to execute when this binding changes value.",
	      }
      },
      additionalProperties: false,
      required: [
      "name",
      "value"
      ]
    },
    any: {
      oneOf: [
      {
        type: "string"
      },
      {
        type: "number"
      },
      {
        type: "object"
      },
      {
        type: "array"
      },
      {
        type: "boolean"
      },
      {
        type: "null"
      }
      ]
    },
    color: {
      type: "string"
    },
    Display: {
      type: "string",
      description: "The type of value to add to data-binding.",
      enum: [
      "invisible",
      "none",
      "normal"
      ]
    },
    CommandArray: {
      type: "array",
      items: {
      $ref: "#/definitions/Command"
      }
    },
    KeyHandlerArray: {
      properties: {
      commands: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        }
      },
      propagate: {
        type: "boolean",
        description: "If true, handled events are bubbled up.",
        default: false
      },
      when: {
        type: "boolean",
        description: "If true, invoke this handler.",
        default: true
      },
      }
    },
    GestureHandlerArray: {
      type: "array",
      items: {
      $ref: "#/definitions/Gestures"
      }
    },
    Gestures: {
      oneOf: [
      {
        $ref: "#/definitions/DoublePress"
      },
      {
        $ref: "#/definitions/LongPress"
      },
      {
        $ref: "#/definitions/SwipeAway"
      },
      {
        $ref: "#/definitions/Tap"
      }
      ]
    },
    DoublePress: {
      properties: {
      type: {
        type: "string",
        description: "Describes the type of gesture"
      },
      onDoublePress: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute on double press"
      },
      onSinglePress: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute on single press"
      }
      },
      additionalProperties: false,
      required: [
      "type"
      ]
    },
    LongPress: {
      properties: {
      type: {
        type: "string",
        description: "Describes the type of gesture"
      },
      onLongPressStart: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute when a long-press is first detected"
      },
      onLongPressEnd: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute when a long-press is finished"
      }
      },
      additionalProperties: false,
      required: [
      "type"
      ]
    },
    SwipeAway: {
      properties: {
      type: {
        type: "string",
        description: "Describes the type of gesture"
      },
      action: {
        type: "string",
        description: "How the original and child component will be displayed",
        default: "slide",
        enum: [
        "reveal",
        "slide",
        "cover"
        ]
      },
      direction: {
        type: "string",
        description: "Swipe direction",
        enum: [
        "left",
        "right",
        "up",
        "down",
        "forward",
        "backward"
        ]
      },
      item: {
        type: "array",
        items: {
        $ref: "#/definitions/Component"
        },
        description: "Child item to display during the swipe gesture"
      },
      onSwipeMove: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute as the swipe position changes"
      },
      onSwipeDone: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute when the swipe is complete"
      }
      },
      additionalProperties: false,
      required: [
      "type",
      "direction"
      ]
    },
    Tap: {
      properties: {
      type: {
        type: "string",
        description: "Describes the type of gesture"
      },
      onTap: {
        type: "array",
        items: {
        $ref: "#/definitions/Command"
        },
        description: "Commands to execute when a tap occurs"
      }
      },
      additionalProperties: false,
      required: [
      "type"
      ]
    },
    Component: {
      properties: {
      type: {
        type: "string",
        description: "The type of this component. Used to select an appropriate child type for inflation"
      },
      when: {
        type: "boolean",
        description: "If false, this component is omitted."
      },
      speech: {
        $ref: "#/definitions/url",
        description: "The URL to download the audio from"
      },
      entity: {
        $ref: "#/definitions/EntityArray",
        description: "An Array of entities associated with the component"
      },
      entities: {
          $ref: "#/definitions/EntityArray",
          description: "An Array of entities associated with the component"
      }
      },
      additionalProperties: false,
      required: [
      "type"
      ],
      type: "object"
    },
    Command: {
      properties: {
      type: {
        type: "string",
        description: "The type of the command."
      },
      description: {
        type: "string",
        description: "An optional description for this command"
      },
      delay: {
        type: "number",
        description: "Delay time in milliseconds before this event fires"
      },
      screenLock: {
        type: "boolean",
        description: "If true, disable the Interaction Timer",
        default: true
      },
      sequencer: {
        type: "string",
        description: "Specify the sequencer that should execute this command."
      },
      when: {
        type: "boolean",
        description: "If this evaluates to false, the command is skipped"
      }
      },
      additionalProperties: true,
      required: [
      "type"
      ]
    },
    Role: commonDefinition.Role,
    TransformArray: {
      type: "array",
      items: {
      $ref: "#/definitions/Transform"
      }
    },
    Transform: {
      properties: {
      rotate: {
        type: "number",
        description: "Rotation angle, in degrees. Positive angles rotate in the clockwise direction."
      },
      scale: {
        type: "number",
        description: "Uniform scaling in both X and Y."
      },
      scaleX: {
        type: "number",
        description: "Scaling in the X direction (overrides “scale” if in same group)."
      },
      scaleY: {
        type: "number",
        description: "Scaling in the Y direction (overrides “scale” if in same group)."
      },
      skewX: {
        type: "number",
        description: "Skew angle for the X-axis, in degrees. X-axis lines remain horizontal."
      },
      skewY: {
        type: "number",
        description: "Skew angle for the Y-axis, in degrees. Y-axis lines remain vertical."
      },
      translateX: {
        $ref: "#/definitions/dimension",
        description: "Distance to translate the object to the right."
      },
      translateY: {
        $ref: "#/definitions/dimension",
        description: "Distance to translate the object down."
      },
      },
      additionalProperties: false
    },
  },
  properties: {
    accessibilityLabel: {
      type: "string",
      category: Categories.aboutComponent,
      description: "A text string used by a screen reader when the user selects accessibility mode."
    },
    actions: {
        $ref: "#/definitions/ActionArray",
        category: Categories.aboutComponent,
        description: "Programmatic equivalents for complex touch interactions"
    },
    bind: {
        $ref: "#/definitions/BindingArray",
        category: Categories.aboutComponent,
        description: "Named values to add to the data-binding context"
    },
    description: {
        type: "string",
        category: Categories.aboutComponent,
        description: "An Optional description of this component."
    },
    checked: {
      type: "boolean",
      category: Categories.aboutComponent,
      description: "If true, this component has the checked state set."
    },
    disabled: {
        type: "boolean",
        category: Categories.aboutComponent,
        description: "If true, this component does not respond to touch or focus."
    },
    display: {
      $ref: "#/definitions/Display",
      category: Categories.aboutComponent,
      description: "Control if the component is displayed on the screen."
    },
    entity: {
      $ref: "#/definitions/EntityArray",
      category: Categories.aboutComponent,
      description: "An Array of entities associated with the component"
    },
    entities: {
      $ref: "#/definitions/EntityArray",
      category: Categories.aboutComponent,
      description: "An Array of entities associated with the component"
    },
    handleTick: {
      $ref: "#/definitions/tickHandlerArray",
      category: Categories.aboutComponent,
      description: "An array of Tick Event Handlers to execute as time passes."
    },
    handleVisibilityChange: {
      $ref: "#/definitions/VisibilityChangeHandlerArray",
      category: Categories.aboutComponent,
      description:
        "An array of Visibility Change Event Handlers to execute when visibility (visible region or overall opacity) of the component changes",
    },
    height: {
      $ref: "#/definitions/dimension",
      category: Categories.height,
      description: "Height of this component"
    },
    id: {
      type: "string",
      category: Categories.aboutComponent,
      description: "Name of the component. This value will be reported in events and can be used in navigation commands."
    },
    inheritParentState: {
      type: "boolean",
      category: Categories.aboutComponent,
      description: "Inherit the display state from the parent component"
    },
    layoutDirection: {
      type: "string",
      description: "The layoutDirection of this component and children.",
      default: "inherit",
      enum: [
        "inherit",
        "LTR",
        "RTL"
      ]
    },
    minWidth: {
      $ref: "#/definitions/dimension",
      category: Categories.width,
      description: "Minimum width of this component"
    },
    maxWidth: {
      $ref: "#/definitions/dimension",
      category: Categories.width,
      description: "Maximum width of this component"
    },
    minHeight: {
      $ref: "#/definitions/dimension",
      category: Categories.height,
      description: "Minimum height of this component"
    },
    maxHeight: {
        $ref: "#/definitions/dimension",
        category: Categories.height,
        description: "Maximum height of this component"
    },
    onMount: {
      $ref: "#/definitions/CommandArray",
      category: Categories.aboutComponent,
      description: "A list of commands to execute when the component is first displayed."
    },
    onCursorEnter: {
        $ref: "#/definitions/CommandArray",
        category: Categories.aboutComponent,
        description: "Command(s) to execute when a cursor (mouse pointer) enters the component’s active region"
    },
    onSpeechMark: {
      $ref: "#/definitions/CommandArray",
      description: "A list of commands to execute when speech specified audio reaches the position defined by a SpeechMark."
    },
    onCursorExit: {
      $ref: "#/definitions/CommandArray",
      category: Categories.aboutComponent,
      description: "Command(s) to execute when a cursor (mouse pointer) exits the component’s active region"
    },
    onLayout: {
      $ref: "#/definitions/CommandArray",
      category: Categories.aboutComponent,
      description: "Command(s) to execute when change to the layout calculation for the component occur.",
    },
    opacity: {
      type: "number",
      category: Categories.aboutComponent,
      description: "Opacity of this component.  Also applies to children."
    },
    padding: {
      $ref: "#/definitions/paddingArray",
      category: Categories.padding,
      description: "Space to add on the sides of the component."
    },
    paddingLeft: {
      $ref: "#/definitions/absoluteDimension",
      category: Categories.padding,
      description: "Space to add to the left of this object."
    },
    paddingTop: {
        $ref: "#/definitions/absoluteDimension",
        category: Categories.padding,
        description: "Space to add to the top this object."
    },
    paddingRight: {
      $ref: "#/definitions/absoluteDimension",
      category: Categories.padding,
      description: "Space to add to the right of this object."
    },
    paddingBottom: {
      $ref: "#/definitions/absoluteDimension",
      category: Categories.padding,
      description: "Space to add to the bottom of this object."
    },
    paddingStart: {
      $ref: "#/definitions/absoluteDimension",
      category: Categories.padding,
      description: "Space to add to the start edge of this component."
    },
    paddingEnd: {
      $ref: "#/definitions/absoluteDimension",
      category: Categories.padding,
      description: "Space to add to the end edge of this component."
    },
    pointerEvents: {
      type: "string",
      category: Categories.aboutComponent,
      description: "Controls whether the component can be the target of touch events.",
      default: "auto",
      enum: ["auto", "none"],
    },
    preserve: {
      category: Categories.aboutComponent,
      description: "Properties preserved through reinflation.",
      oneOf: [
        {
          type: "array",
          items: {
            type: "string"
          }
        },
        {
          type: "string"
        }
      ]
    },
    role: {
        $ref: "#/definitions/Role",
        category: Categories.aboutComponent,
        description: "Role or purpose of the component."
    },
    shadowColor: {
        $ref: "#/definitions/color",
        category: Categories.container,
        description: "Shadow color"
    },
    shadowHorizontalOffset: {
        $ref: "#/definitions/absoluteDistance",
        category: Categories.container,
        description: "Horizontal offset of the shadow"
    },
    shadowRadius: {
        $ref: "#/definitions/absoluteDimension",
        category: Categories.container,
        description: "Shadow blur radius"
    },
    shadowVerticalOffset: {
        $ref: "#/definitions/absoluteDistance",
        category: Categories.container,
        description: "Vertical offset of the shadow"
    },
    speech: {
        $ref: "#/definitions/url",
        category: Categories.aboutComponent,
        description: "The URL to download the audio from"
    },
    style: {
        type: "string",
        category: Categories.aboutComponent,
        description: "Style to apply to the component"
    },
    transform: {
        $ref: "#/definitions/TransformArray",
        category: Categories.aboutComponent,
        description: "Array of transformations."
    },
    type: {
        type: "string",
        category: Categories.aboutComponent,
        description: "The type of this component. Used to select an appropriate child type for inflation"
    },
    when: {
        type: "boolean",
        category: Categories.aboutComponent,
        description: "If false, this component is omitted."
    },
    width: {
        $ref: "#/definitions/dimension",
        category: Categories.width,
        description: "Width of this component"
    }
  },
  required: [
    "type"
  ]
};
