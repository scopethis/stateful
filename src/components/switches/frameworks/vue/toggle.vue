<template>
  <div class="container" :class="style">
    <div class="toggle">
      <div class="base" @click="() => toggle.send('TOGGLE')"></div>
      <span class="indicator"></span>
    </div>
    <div class="label"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
  $size: 20px;
  .container {
    display: flex;
  }

  .toggle {
    position: relative;
    width: 40px;
  }

  .label {
    margin-left: 10px;
  }

  .base {
    width: inherit;
    height: $size;
    background-color: #414141;
    border-radius: $size;
  }

  .active {
    .base {
      background-color: #00c95a;
    }
    .indicator {
      left: 40px - $size;
    }
  }

  .inactive {
    .base {
      background-color: #414141;
    }
    .indicator {
      left: 0;
    }
  }

  .neutral {

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
    transition: left 0.2s;
  }
</style>

<script>
import { makeToggleState } from "../../toggle";

export default {
  name: 'toggle',
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      style: '',
    }
  },

  beforeMount() {
    const init = {id: this.id, selected: undefined}
    this.toggle = makeToggleState(init, (state) => {
      this.style = state.style
      this.$emit('change', state.context)
    })
  }
}
</script>