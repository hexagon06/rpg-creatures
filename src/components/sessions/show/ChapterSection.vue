<template>
  <h2 class="mt-3">
    {{ value.label }}
    <hr />
  </h2>
</template>

<script lang="ts">
import { ChapterPrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<ChapterPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
