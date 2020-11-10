import { Machine, assign, interpret } from "xstate";

const getPosition = (context, event) => {
  const selected = event.options || context.current;
  return selected > context._total ? context.current : selected;
};

const toggleItem = assign({
  options: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context._items));
    const position = getPosition(context, event);
    newOptions[position].selected = !context.options[position].selected;
    return newOptions;
  },
  current: (context, event) => {
    return getPosition(context, event);
  }
});

const selectItem = assign({
  options: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context.options));
    const list = event.options || context.current
    list.forEach((option) => {
      const isSelected = newOptions[option].selected
      newOptions[option].selected = isSelected ? false : true;
    });
    return newOptions;
  },
  current: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context.options));
    const newCurrent = [];
    const list = event.options || context.current
    newOptions.forEach((option, i) => {
      const found = list.find((element) => {
        return element === i;
      });
      if (option.selected && !found) newCurrent.push(i);
    });
    return [...newCurrent, ...list];
  }
});

const options = (initialState) => {
  return {
    config: {
      id: "radio",
      initial: initialState.initial,

      context: {
        // properties with "_" at the start are IMMUTABLE
        _total: initialState.options.length,
        _items: JSON.parse(JSON.stringify(initialState.options)),
        options: JSON.parse(JSON.stringify(initialState.options)),
        current: JSON.parse(JSON.stringify(initialState.current))
      },

      states: {
        single: {
          entry: ["toggleItem"],
          on: {
            TOGGLE: { actions: "toggleItem" },
          }
        },
        multiple: {
          entry: ["selectItem"],
          on: {
            SELECT: { actions: "selectItem" }
          }
        }
      }
    },
    options: {
      actions: {
        toggleItem,
        selectItem
      }
    }
  };
};

export const makeOptions = (initialState) => {
  const state = options(initialState);
  return Machine(state.config, state.options);
};


export const makeOptionsState = (initialState, callback) => {
  const interpreter = interpret(makeOptions(initialState))
  interpreter.onTransition(state => {
    callback({
      context: JSON.parse(JSON.stringify(state.context.options)), 
      current: state.context.current
    })
  })
  interpreter.start()
  return {send: interpreter.send}
}