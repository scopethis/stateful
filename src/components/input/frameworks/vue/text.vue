<template>
    <div class="field" :class="style">
        <span class="wrapper" ref="sizer">
          <input type="text" v-model="text" id="test" size="1" />
        </span>
        <div class="errors" id="errors">
            <span v-for="(validation, key) in validations"
              class="error-message"
              :key="key">
                <i>error_outline</i> {{validation.message}}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
  @import '../styles/input';
</style>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'textfield',

  props: {
    valid: {
      type: Boolean,
      required: true
    },
    validations: {
      type: Array,
      required: false
    },
    value: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      text: '',
      tip: null
    }
  },

  computed: {
    style () {
      return this.valid ? 'valid' : 'invalid'
    }
  },

  watch: {
    valid: {
      handler: function (isValid) {
        if (!isValid) {
          const test = document.querySelector('#test');
          const errors = document.querySelector('#errors');
          this.tip = createPopper(test, errors, {
            placement: 'bottom-start',
          })
        } else {
          if (this.tip) {
            this.tip.destroy()
          }
        }
      },
      immediate: true
    },

    value: {
      handler: function(value) {
        this.text = value
        this.$emit('change', {value})
      },
      immediate: true
    },

    text: {
      handler: function(value) {
        this.$refs.sizer.dataset.value = value
        this.$emit('change', {value})
      }
    }
  }

};
</script>
