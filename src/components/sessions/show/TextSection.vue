<template>
  <div>
    <h3>{{ value.label }}</h3>
    <v-md-preview :text="value.text" :default-show-toc="true"></v-md-preview>
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
