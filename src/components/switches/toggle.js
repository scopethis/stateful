import { Machine, assign, interpret } from "xstate";
import { common } from "../buttons/common";

const moveToActive = assign({
  selected: () => {
    return true;
  },
  position: () => {
    return 'active'
  }
});

const moveToInActive = assign({
  selected: () => {
    return false;
  },
  position: () => {
    return 'inactive'
  }
});

const moveToNeutral = assign({
  selected: () => {
    return undefined;
  },
  position: () => {
    return 'neutral'
  }
});

export const toggle = (initialState) => {
  return {
    config: {
      id: "toggle",
      initial: initialState.selected ? 'active' : 'inactive',

      context: {
        // position: "neutral"
        ...initialState,
        position: initialState.selected ? 'active' : 'inactive',
      },

      states: {
        active: {
          on: {
            TOGGLE: { target: "inactive.over", actions: "moveToInActive" },
            OFF: { target: "inactive.over", actions: "moveToInActive" },
            NEUTRAL: { target: "neutral.over", actions: "moveToNeutral" }
          },
          ...common().config
        },
        neutral: {
          on: {
            TOGGLE: { target: "active.over", actions: "moveToActive" },
            ON: { target: "active.over", actions: "moveToActive" },
            OFF: { target: "inactive.over", actions: "moveToInActive" }
          },
          ...common().config
        },
        inactive: {
          on: {
            TOGGLE: { target: "active.over", actions: "moveToActive" },
            ON: { target: "active.over", actions: "moveToActive" },
            NEUTRAL: { target: "neutral.over", actions: "moveToNeutral" }
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

export const makeToggleState = (initialState) => {
  return interpret(makeToggle(initialState)).start()
}
