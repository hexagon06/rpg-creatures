<template>
  <div>
    <input-wrapper label="Text caption"
                   validation="Invalid title"
                   :is-valid="modelValue.label && modelValue.label.length > 0">
      <input id="input-1"
             v-model="modelValue.label"
             placeholder="Subject"
             required />
    </input-wrapper>
    <input-wrapper label=""
                   validation="missing text"
                   :is-valid="modelValue.text && modelValue.text.length > 0">
      <v-md-editor v-model="modelValue.text"
                   height="400px"></v-md-editor>
    </input-wrapper>
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
