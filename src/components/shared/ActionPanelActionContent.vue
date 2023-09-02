<template>
  <div class="action-menu-filter">
    <div class="hidden action-menu-action md:action-menu-action-large">
      <slot />
    </div>
    <div class="
        hidden
        action-menu-filter-buttons
        md:action-menu-filter-buttons-large
      ">
      <slot name="buttons" />
    </div>
    <!-- for mobile devices -->
    <div class="action-menu-filter-buttons md:hidden">
      <slot name="buttons" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({});
</script>

<style lang="scss" scoped></style>
