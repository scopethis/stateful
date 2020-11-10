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
  $size: 20px;
  $baseSize: $size - 4;
  $indicatorSize: $baseSize / 2;

  .container {
    display: flex;
  }

  .container {
    [type='radio'] {
      position: absolute;
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

  .toggle {
    position: relative;
    width: $size;
  }

  .border {
    width: inherit;
    height: $size;
    background-color:  #00c95a;
    border-radius: $size;
  }

  .label {
    margin-left: 10px;
  }

  .base {
    display: block;
    width: $baseSize;
    height: $baseSize;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    left: 0; top: 0;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 2px;
    transition: left 0.2s;
  }

  .indicator {
    display: block;
    width: $indicatorSize;
    height: $indicatorSize;
    background-color: #00c95a;
    border-radius: 50%;
    position: absolute;
    left: $indicatorSize / 2; top: $indicatorSize / 2;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 2px;
    transition: left 0.2s;
  }

  .active {
    .border,
    .indicator {
      background-color: #00c95a;
    }
  }

  .inactive {
    .border,
    .indicator {
      background-color: #414141;
    }
  }
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