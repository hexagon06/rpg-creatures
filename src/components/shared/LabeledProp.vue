<template>
  <div v-if="hasValue" align-h="start" align-content="start" class="flex gap-3">
    <div cols="4">
      <label class="font-bold">{{ label }}</label>
    </div>
    <div>
      <div>{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: undefined,
    },
    amount: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    hasValue(): boolean {
      return this.value !== undefined;
    },
    value(): string | undefined {
      if (this.text !== undefined && this.text.trim().length > 0) {
        return this.text;
      } else if (this.amount !== undefined) {
        return this.amount.toString();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
