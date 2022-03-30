<template>
  <div>
    <h3>{{ value.label }}</h3>
    <p>
      {{ value.text }}
    </p>
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
