<template>
  <div class="">
    <div v-if="routed && initialized"
         class="action-menu md:action-menu-large">
      <component v-bind:is="routed" />
    </div>
  </div>
</template>

<script  lang="ts">
import { useIndexesStore } from "@/store/indexes";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapState(useIndexesStore, ["initialized"]),
    routed() {
      return this.$route.meta?.actionsComponent;
    },
  },
});
</script>

<style lang="scss"></style>
