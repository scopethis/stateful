import { Machine } from "xstate";

const pressable = (context, event, conditionData) => {
  const states = conditionData.state.toStrings();
  const hasBeenHoveredOver = states.toString().indexOf("over") > -1;
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
            DOWN: [
              {
                target: "down",
                cond: pressable
              },
            ],
            CLICK: [
              {
                target: "click",
                cond: pressable
              },
              {
                target: "released"
              }
            ]
          }
        },
        click: {
        },
        down: {
          on: {
            CLICK: "released",
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
