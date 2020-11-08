import { interpret } from "xstate";
import { makeText } from "./src/components/input/text";

// const machine = Machine({ ...toggle.config }, { ...toggle.options });
const options = [
  { label: "England", selected: false },
  { label: "Scotland", selected: false },
  { label: "Wales", selected: false },
  { label: "Ireland", selected: false },
  { label: "France", selected: false },
  { label: "Italy", selected: false }
];

const valid1 = (content) => {
  return true;
};

const valid2 = (content) => {
  return false;
};

const machine = makeText({
  validators: [
    { id: "valid1", validate: valid1 },
    { id: "valid2", validate: valid2 }
  ]
});

const machineState = interpret(machine).onTransition((state) =>
  console.log(state.toStrings(), state.context)
);

// console.log(machineState.initialState);
machineState.start();
// machineState.send("TOGGLE", { options: [1] });
// machineState.send("TOGGLE", { options: [4] });
// machineState.send("TOGGLE", { options: [4] });
// machineState.send("TOGGLE", { options: [4] });
// machineState.send("SELECT", { options: [3, 0] });
// machineState.send("SELECT", { options: [5] });
// machineState.send("DESELECT", { options: [5] });
// In away mode, so can't do anything here
// machineState.send("PRESSED");
// machineState.send("RELEASED");

// // Now in hover mode, presses will work
// machineState.send("HOVERED");
// // machineState.send("PRESSED");
// machineState.send("TOGGLE");
// // machineState.send("PRESSED");
// machineState.send("TOGGLE");
// // machineState.send("PRESSED");
// machineState.send("NEUTRAL");
console.log("-------------------");
// console.log([true, false, true, true].toString());
