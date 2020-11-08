import { Machine, assign } from "xstate";
import { common } from "../buttons/common";

const moveToActive = assign({
  position: () => {
    return "active";
  }
});

const moveToInActive = assign({
  position: () => {
    return "inactive";
  }
});

const moveToNeutral = assign({
  position: () => {
    return "neutral";
  }
});

export const toggle = (initialState) => {
  return {
    config: {
      id: "toggle",
      initial: "neutral",

      context: {
        // position: "neutral"
        ...initialState
      },

      states: {
        active: {
          on: {
            TOGGLE: { target: "inactive.hovered", actions: "moveToInActive" },
            OFF: { target: "inactive.hovered", actions: "moveToInActive" },
            NEUTRAL: { target: "neutral.hovered", actions: "moveToNeutral" }
          },
          ...common().config
        },
        neutral: {
          on: {
            TOGGLE: { target: "active.hovered", actions: "moveToActive" },
            ON: { target: "active.hovered", actions: "moveToActive" },
            OFF: { target: "inactive.hovered", actions: "moveToInActive" }
          },
          ...common().config
        },
        inactive: {
          on: {
            TOGGLE: { target: "active.hovered", actions: "moveToActive" },
            ON: { target: "active.hovered", actions: "moveToActive" },
            NEUTRAL: { target: "neutral.hovered", actions: "moveToNeutral" }
          },
          ...common().config
        }
      }
    },
    options: {
      ...common().options,
      actions: {
        moveToActive,
        moveToInActive,
        moveToNeutral
      }
    }
  };
};

export const makeToggle = (initialState) => {
  const state = toggle(initialState);
  return Machine(state.config, state.options);
};
