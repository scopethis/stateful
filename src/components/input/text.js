import { Machine, assign, interpret } from "xstate";

const validate = assign({
  validations: (context, event) => {
    let valid = true;
    valid = context._validators.map((validator) => {
      const result = validator.validate(event.content)
      return {
        id: validator.id,
        valid: result.valid,
        message: result.reason
      };
    }).filter((validation) => !validation.valid);
    return valid;
  },
  valid: (context, event) => {
    let valid = true;
    valid = context._validators.map((validator) => {
      return validator.validate(event.content).valid;
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

export const makeTextState = (initialState, callback) => {
  const interpreter = interpret(makeText(initialState))
  interpreter.onTransition(state => {
    callback({
      valid: state.context.valid,
      validations: state.context.validations
    })
  })
  interpreter.start()
  return {send: interpreter.send}
}