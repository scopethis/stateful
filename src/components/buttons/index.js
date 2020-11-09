import { interpret } from "xstate";
import { makeCommonButton } from "./common";

const button = makeCommonButton()

const machine = interpret(button).onTransition((state) =>
  console.log(state.toStrings())
)

machine.start();
machine.send("DOWN");
machine.send("OVER");
machine.send("DOWN");