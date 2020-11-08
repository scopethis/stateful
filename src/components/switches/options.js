import { Machine, assign } from "xstate";

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
    event.options.forEach((option) => {
      newOptions[option].selected = true;
    });
    return newOptions;
  },
  current: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context.options));
    const newCurrent = [];
    newOptions.forEach((option, i) => {
      const found = event.options.find((element) => {
        return element === i;
      });
      if (option.selected && !found) newCurrent.push(i);
    });
    return [...newCurrent, ...event.options];
  }
});

const deSelectItem = assign({
  options: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context.options));
    event.options.forEach((option) => {
      newOptions[option].selected = false;
    });
    return newOptions;
  },
  current: (context, event) => {
    const newOptions = JSON.parse(JSON.stringify(context.options));
    const newCurrent = [];
    newOptions.forEach((option, i) => {
      const found = event.options.find((element) => {
        return element === i;
      });
      if (option.selected && !found) newCurrent.push(i);
    });
    return [...newCurrent];
  }
});

export const options = (initialState) => {
  return {
    config: {
      id: "radio",
      initial: "main",

      context: {
        // properties with "_" at the start are IMMUTABLE
        _total: initialState.options.length,
        _items: initialState.options,
        options: initialState.options,
        current: initialState.current
      },

      states: {
        main: {
          entry: "toggleItem",
          on: {
            TOGGLE: { actions: "toggleItem" },
            SELECT: { actions: "selectItem" },
            DESELECT: { actions: "deSelectItem" }
          }
        }
      }
    },
    options: {
      actions: {
        toggleItem,
        selectItem,
        deSelectItem
      }
    }
  };
};

export const makeOptions = (initialState) => {
  const state = options(initialState);
  return Machine(state.config, state.options);
};
