<template>
  <h2 class="mt-3">
    {{ modelValue.label }}
    <hr />
  </h2>
</template>

<script lang="ts">
import { ChapterPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ChapterPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
