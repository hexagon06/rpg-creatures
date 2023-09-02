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

import { defineComponent } from 'vue'
export default defineComponent({});
</script>

<style lang="scss" scoped></style>
