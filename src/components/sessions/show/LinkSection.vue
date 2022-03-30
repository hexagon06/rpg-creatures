<template>
  <a :href="value.link" class="link">
    {{ value.label }}
  </a>
</template>

<script lang="ts">
import { LinkPrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<LinkPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
