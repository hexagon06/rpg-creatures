<template>
  <div>
    <div class="action-menu-filter md:action-menu-filter-large">
      <slot />
    </div>
    <div class="action-menu-filter-buttons md:action-menu-filter-buttons-large">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped></style>
