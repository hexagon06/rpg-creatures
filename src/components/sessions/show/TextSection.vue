<template>
  <div>
    <h3>{{ modelValue.label }}</h3>
    <v-md-preview :text="modelValue.text"
                  :default-show-toc="true"></v-md-preview>
  </div>
</template>

<script lang="ts">
import { TextPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<TextPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
