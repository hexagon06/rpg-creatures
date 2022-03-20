<template>
  <div class="h-36 w-72 flex">
    <router-link :to="to" class="entity-grid-card">
      <div class="w-full h-full">
        <slot />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    /** The target route of the link. It can be either a string or a location descriptor object. */
    to: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
