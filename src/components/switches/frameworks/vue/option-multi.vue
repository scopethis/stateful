<template>
    <div class="check" :class="style">
      <div>
        <input type="checkbox" 
        @click="$event => $emit('click', {id})" />
        <div class="inner"></div>
      </div>
      <div class="label"><slot /></div>
    </div>
</template>

<style scoped lang="scss">
  $size: 18px;
  .check {
    border: 1px solid lightgray;
    width: $size;
    height: $size;
    display: flex;
    position: relative;

    .inner {
      $offset: 3px;
      pointer-events: none;
      width: $size - ($offset * 2);
      height: $size - ($offset * 2);
      border: $offset solid white;
      position: absolute;
      top: 0; left: 0;
    }
  }

  .check {
    [type='checkbox'] {
      width: $size;
      height: $size;
      margin: 0;
      padding: 0;
      opacity: 0;
      &:focus {
        outline: none;
      }
    }
  }
  
  .label {
    margin-left: 10px;
  }

  .active {
    border: 1px solid #414141;
    background-color: #00c95a;
  }

  .inactive {
    border: 1px solid #414141;
    background-color: #ffffff;
  }

  .neutral {

  }
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
