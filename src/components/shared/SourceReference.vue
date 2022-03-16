<template>
  <a v-if="link && source" :href="link" target="_blank">
    {{ source }} <span v-if="page !== undefined">({{ page }})</span>
  </a>
  <p v-else-if="source">
    {{ source }} <span v-if="page !== undefined">({{ page }})</span>
  </p>
  <a v-else-if="link" :href="link" target="_blank">
    <font-awesome-icon
      icon="fa-solid fa-arrow-up-right-from-square"
    ></font-awesome-icon>
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    link: {
      type: String,
      default: undefined,
    },
    source: {
      type: String,
      default: undefined,
    },
    page: {
      type: String,
      default: undefined,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
