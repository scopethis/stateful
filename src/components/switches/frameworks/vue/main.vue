<template>
    <div>
      <h2>1. Checkbox</h2>
      <checkbox @change="onCheck" id="france">France</checkbox>
      <checkbox @change="onCheck" id="england">England</checkbox>
      <h2>2. Toggle</h2>
      <toggle id="alerts"></toggle>
    </div>
</template>


<script>
import checkbox from "./check";
import toggle from "./toggle";

export default {
  components: {
    checkbox,
    toggle
  },

  methods: {
    onCheck (event) {
      console.log(event)
    }
  }
};
</script>
