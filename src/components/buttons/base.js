import { Machine } from "xstate";

const pressable = (context, event, conditionData) => {
  const states = conditionData.state.toStrings();
  const hasBeenHoveredOver = states.toString().indexOf("hovered") > -1;
  return hasBeenHoveredOver;
};

export const base = (initialState) => {
  return {
    config: {
      id: "basic",
      initial: "released",

      states: {
        released: {
          on: {
            PRESSED: [
              {
                target: "pressed",
                cond: pressable
              },
              {
                target: "released"
              }
            ]
          }
        },
        pressed: {
          on: {
            RELEASED: "released"
          }
        }
      }
    },
    options: {
      guards: {
        pressable
      }
    }
  };
};

export const makeBaseButton = (initialState) => {
  const state = base(initialState);
  return Machine(state.config, state.options);
};
