<template>
    <div>
      <h2>1. Within paragraph</h2>
      <p>
        hello there, my email is 
      <textfield
        value="me@gmail.com"
        @change="$event => text.send('CHANGE', {content: $event.value})"
        :valid="isValid" 
        :validations="validations"></textfield>, and I live in the United Kingdom
        </p>
        <h2>2. As a form</h2>
        <textfield
          value="me@gmail.com"
          @change="$event => text.send('CHANGE', {content: $event.value})"
          :valid="isValid" 
          :validations="validations"></textfield>
    </div>
</template>

<style scoped lang="scss">
  @import '../../../../../src/styles/typography';
  p {
    @include fontStack();
    @include defaultFontSize();
  }
</style>

<script>
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';

import { makeTextState } from "../../text"
import textfield from './text'

export default {
  name: 'App',

  components: {
    textfield
  },

  data () {
    return {
      isValid: true,
      validations: []
    }
  },

  beforeMount() {
    const validEmail = (content) => {
      const valid = isEmail(content)
      const response = {valid: valid}
      if (!valid) {
        response.reason = 'Please supply a valid email'
      }
      return response
    };

    const validURL = (content) => {
      const valid = isURL(content)
      const response = {valid: valid}
      if (!valid) {
        response.reason = 'This is not a valid url'
      }
      return response
    };

    const validators = [
      { id: "validEmail", validate: validEmail }
    ]

    this.text = makeTextState({validators}, (state) => {
        this.isValid = state.valid
        this.validations = state.validations
    });
  }
};
</script>
