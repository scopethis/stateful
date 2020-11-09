<template>
    <div>
      <Btn :class="style"
        :action="button">
          Yo!
      </Btn>
    </div>
</template>

<style scoped>
  .off {
    background: lightgreen;
  }
  .over {
    background: lightpink;
  }
  .down {
    background: red;
  }
  .clicked {
    background: lightgreen;
  }
</style>

<script>
import Btn from "./Btn";
import { makeButtonState } from "../../common";

export default {
  data () {
    return {
      style: '',
    }
  },

  beforeMount() {
    this.button = makeButtonState('enabled')
    this.button.onTransition((state) => {
      this.style = state.value
      console.log(state.value)
    })
  },

  components: {
    Btn
  }
};
</script>
