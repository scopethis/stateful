<template>
  <div class="container">
    <div class="base"></div>
    <span class="indicator"></span>
  </div>
</template>

<style scoped lang="scss">
  $size: 20px;
  .container {
    position: relative;
    width: 40px;
  }

  .base {
    width: inherit;
    height: $size;
    background-color: #414141;
    border-radius: $size;
    
  }

  .indicator {
    display: block;
    width: $size - 4;
    height: $size - 4;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    left: 0; top: 0;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 2px;
  }
</style>

<script>
import { makeToggleState } from "../../toggle";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  beforeMount() {
    this.toggle = makeToggleState({
      id: this.id,
      selected: true
    })
    this.toggle.onTransition((state) => {
      this.style = state.context.position
      this.$emit('change', state.context)
    })
  }
}
</script>