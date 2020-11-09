<template>
  <div class="container" :class="style">
    <div class="base" @click="() => toggle.send('TOGGLE')"></div>
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

    .active {
      .base {
        background-color: green;
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
    this.toggle = makeToggleState({
      id: this.id,
      selected: undefined
    })
    this.toggle.onTransition((state) => {
      this.style = state.context.position
      this.$emit('change', state.context)
      console.log(state.context)
    })
  }
}
</script>