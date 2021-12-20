<template>
  <button class="btn" :class="`btn-${color}`">
    <slot>submit</slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      defalut: "secondary",
    },
  },
};
</script>