<template>
  <div class="">
    <div
      v-if="routed"
      class="
        bg-gold
        border-l-6 border-b-6
        rounded-bl-huge
        border-purple
        text-dark-blue
        max-h-fit
        pl-4
        pb-24
        overflow-hidden
        hidden
        md:block
      "
    >
      <component v-bind:is="routed" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    routed() {
      return this.$route.meta?.actionsComponent;
    },
  },
});
</script>

<style lang="scss">
</style>
