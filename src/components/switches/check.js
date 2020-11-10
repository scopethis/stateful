import { Machine, interpret } from "xstate";
import { toggle } from "./toggle";
import { common } from "../buttons/common";

export const check = (initialState) => {
  return {
    config: {
      id: "check",
      initial: initialState.selected ? 'active' : 'inactive',

      context: {
        ...initialState,
        position: initialState.selected ? 'active' : 'inactive',
      },

      states: {
        active: {
          on: {
            TOGGLE: { target: "inactive.over", actions: "moveToInActive" },
            OFF: { target: "inactive.over", actions: "moveToInActive" }
          },
          ...common().config
        },
        inactive: {
          on: {
            TOGGLE: { target: "active.over", actions: "moveToActive" },
            ON: { target: "active.over", actions: "moveToActive" }
          },
          ...common().config
        }
      }
    },

    options: {
      ...common().options,
      actions: {
        moveToActive: toggle(initialState).options.actions.moveToActive,
        moveToInActive: toggle(initialState).options.actions.moveToInActive
      }
    }
  };
};

export const makeCheck = (initialState) => {
  const state = check(initialState);
  return Machine(state.config, state.options);
};

export const makeCheckState = (initialState, callback) => {
  const interpreter = interpret(makeCheck(initialState))
  interpreter.onTransition(state => {
    callback({
      context: JSON.parse(JSON.stringify(state.context)), 
      style: state.context.position
    })
  })
  interpreter.start()
  return {send: interpreter.send}
}
