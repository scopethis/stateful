<template>
    <button
      @click="$event => action.send('CLICKED')"
      @mouseenter="$event => action.send('OVER')"
      @mouseleave="$event => action.send('OFF')"
      @mousedown="$event => action.send('DOWN')">
        <slot />
    </button>
</template>

<script>


export default {
  props: {
    action: {
      required: true,
      type: Object
    }
  }
};
</script>
