import { Machine } from "xstate";
import { base } from "./base";

export const common = (initialState) => {
  return {
    config: {
      id: "standard",
      initial: "away",

      states: {
        away: {
          on: {
            HOVERED: "hovered.released"
          },
          ...base().config
        },
        hovered: {
          ...base().config
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
