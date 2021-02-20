<template>
    <div class="check" :class="style">
      <div>
        <input type="checkbox" 
        @click="$event => $emit('click', {id})" />
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
    },
    selected: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  },

  computed: {
    style() {
      return this.selected ? 'active' : 'inactive'
    }
  },
};
</script>
