<template>
    <div>
      <h2>1. Checkbox</h2>
      <checkbox @change="onCheck" id="france">France</checkbox>
      <div style="height: 5px"></div>
      <checkbox @change="onCheck" id="england">England</checkbox>

      <h2>2. Toggle</h2>
      <toggle @change="onToggle" id="alerts">Send alerts</toggle>

      <h2>3. Options multiple</h2>
      <options @change="onOption"
        :options="choices"
        type="multiple">
      </options>

      <h2>4. Options single</h2>
      <options @change="onOption"
        :options="choices"
        type="single">
      </options>
    </div>
</template>


<script>
import checkbox from "./check";
import toggle from "./toggle";
import options from "./options";

export default {
  name: 'App',

  components: {
    checkbox,
    toggle,
    options
  },

  data () {
    return {
      choices: {
        current: [1],
        options: [
          { label: "England", selected: false },
          { label: "Scotland", selected: false },
          { label: "Wales", selected: false },
          { label: "Ireland", selected: false },
          { label: "France", selected: false },
          { label: "Italy", selected: false }
      ]
      }
    }
  },

  methods: {
    onOption (event) {

    },
    onCheck (event) {

    },
    onToggle (event) {
      
    }
  }
};
</script>
