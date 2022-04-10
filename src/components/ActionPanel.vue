<template>
  <div class="">
    <div v-if="routed && initialized" class="action-menu md:action-menu-large">
      <component v-bind:is="routed" />
    </div>
  </div>
</template>

<script lang="ts">
import { useIndexesStore } from "@/store/indexes";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...mapState(useIndexesStore, ["initialized"]),
    routed() {
      return this.$route.meta?.actionsComponent;
    },
  },
});
</script>

<style lang="scss">
</style>
