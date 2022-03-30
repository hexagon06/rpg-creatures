<template>
  <div class="">
    <div v-if="routed" class="action-menu md:action-menu-large">
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
