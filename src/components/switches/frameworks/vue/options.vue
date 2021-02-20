<template>
  <div class="container">
    <component :is="button" v-for="(choice, key) in private_options"
      class="option"
      @click="$event => chooser.send(eventType, {options: [$event.id]})"
      :key="key"
      :id="key"
      :selected="choice.selected">
      {{choice.label}}
    </component>
  </div>
</template>

<style scoped lang="scss">
  .option {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

<script>
import { makeOptionsState } from "../../options";
import radio from "./option-single"
import check from "./option-multi"

export default {
  name: 'options',
  props: {
    options: {
      type: Object,
      required: true
    },

    type: {
      type: String,
      required: false,
      default: () => {
        return 'single'
      },
      validator: (value) => {
        return ['single', 'multiple'].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      // To avoid prop mutating
      private_options: []
    }
  },

  watch: {
    options: {
      handler: function (options) {
        const init = Object.assign({initial: this.type}, options)
        this.chooser = makeOptionsState(init, (state) => {
          this.private_options = state.context
          this.$emit('change', state)
        })
      },
      immediate: true
    }
  },

  computed: {
    button () {
      return this.type === 'single' ? radio : check
    },
    eventType () {
      return this.type === 'single' ? 'TOGGLE' : 'SELECT'
    }
  },

  components: {
    radio,
    check
  }
}
</script>