import { Machine, interpret } from "xstate";
import { base } from "./base";

export const common = (initialState) => {
  return {
    config: {
      id: "common",
      initial: initialState,

      states: {
        over: {
          on: {
            DOWN: "down",
            DISABLED: "disabled",
            OFF: "off",
            CLICKED: "clicked"
          },
        },
        down: {
          on: {
            DISABLED: "disabled",
            CLICKED: "clicked",
            OFF: "off",
          },
        },
        clicked: {
          on: {
            DISABLED: "disabled",
            OVER: "over",
            OFF: "off",
            DOWN: "down"
          }
        },
        disabled: {
          on: {
            ENABLED: "enabled"
          }
        },
        enabled: {
          on: {
            OVER: "over",
            OFF: "off",
            CLICKED: "clicked"
          }
        },
        off: {
          on: {
            DISABLED: "disabled",
            OVER: "over"
          },
        }
      }
    },
    options: {
      ...base().options
    }
  };
};

export const makeCommonButton = (initialState) => {
  const state = common(initialState);
  return Machine(state.config, state.options);
};

export const makeButtonState = (initialState) => {
  return interpret(makeCommonButton(initialState)).start()
}