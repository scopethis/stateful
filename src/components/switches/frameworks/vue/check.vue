<template>
    <div class="check" :class="style">
      <div>
        <input type="checkbox" 
        @click="$event => check.send('TOGGLE')" />
        <i>check</i>
      </div>
      <div class="label"><slot /></div>
    </div>
</template>

<style scoped lang="scss">
  @import '../styles/check';
</style>

<script>
import { makeCheckState } from "../../check";

export default {
  name: 'checkbox',

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      style: '',
    }
  },

  components: {
  },

  beforeMount() {
    const init = {id: this.id, selected: undefined}
    this.check = makeCheckState(init, (state) => {
      this.style = state.style
      this.$emit('change', {
        selected: state.context.selected,
        id: this.id
      })
    })
  }
};
</script>
