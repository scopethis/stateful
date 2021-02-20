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
  @import '../styles/toggle';
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