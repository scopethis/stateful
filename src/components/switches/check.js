import { Machine } from "xstate";
import { toggle } from "./toggle";
import { common } from "../buttons/common";

export const check = (initialState) => {
  return {
    config: {
      id: "check",
      initial: "inactive",

      context: {
        ...initialState
      },

      states: {
        active: {
          on: {
            TOGGLE: { target: "inactive.hovered", actions: "moveToInActive" },
            OFF: { target: "inactive.hovered", actions: "moveToInActive" }
          },
          ...common().config
        },
        inactive: {
          on: {
            TOGGLE: { target: "active.hovered", actions: "moveToActive" },
            ON: { target: "active.hovered", actions: "moveToActive" }
          },
          ...common().config
        }
      }
    },

    options: {
      ...common().options,
      actions: {
        moveToActive: toggle().options.actions.moveToActive,
        moveToInActive: toggle().options.actions.moveToInActive
      }
    }
  };
};

export const makeCheck = (initialState) => {
  const state = check(initialState);
  return Machine(state.config, state.options);
};
