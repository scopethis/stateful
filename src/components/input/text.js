import { Machine, assign } from "xstate";

const validate = assign({
  validations: (context, event) => {
    let valid = true;
    valid = context._validators.map((validator) => {
      return {
        id: validator.id,
        result: validator.validate(event.content)
      };
    });
    return valid;
  },
  valid: (context, event) => {
    let valid = true;
    valid = context._validators.map((validator) => {
      return validator.validate(event.content);
    });
    return valid.toString().indexOf("false") < 0;
  }
});

export const text = (initialState) => {
  return {
    config: {
      id: "text",
      initial: "main",

      context: {
        validations: [],
        valid: true,
        _validators: [...initialState.validators]
      },

      states: {
        main: {
          entry: "validate",
          on: {
            CHANGE: { actions: "validate" }
          }
        }
      }
    },
    options: {
      actions: {
        validate
      }
    }
  };
};

export const makeText = (initialState) => {
  const state = text(initialState);
  return Machine(state.config, state.options);
};
