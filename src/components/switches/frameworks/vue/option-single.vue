<template>
  <div class="container" :class="style">
    <input type="radio" :checked="selected" />
    <div class="toggle" @click="$event => $emit('click', {id})">
      <div class="border"></div>
      <span class="base"></span>
      <span class="indicator"></span>
    </div>
    <div class="label"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
  @import '../styles/radio';
</style>

<script>
export default {
  name: 'radio',
  props: {
    id: {
      type: Number,
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

}
</script>