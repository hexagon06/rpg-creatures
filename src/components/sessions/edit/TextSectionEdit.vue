<template>
  <div>
    <input-wrapper
      label="Text caption"
      validation="Invalid title"
      :is-valid="value.label && value.label.length > 0"
    >
      <input
        id="input-1"
        v-model="value.label"
        placeholder="Subject"
        required
      />
    </input-wrapper>
    <input-wrapper
      label=""
      validation="missing text"
      :is-valid="value.text && value.text.length > 0"
    >
      <v-md-editor v-model="value.text" height="400px"></v-md-editor>
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import { TextPrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<TextPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
