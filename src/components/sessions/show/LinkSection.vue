<template>
  <a :href="modelValue.link"
     class="link">
    {{ modelValue.label }}
  </a>
</template>

<script lang="ts">
import { LinkPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<LinkPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
