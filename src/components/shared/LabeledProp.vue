<template>
  <b-row
    v-if="hasValue"
    align-h="start"
    align-content="start"
    class="text-left"
  >
    <b-col cols="4">
      <label class="font-weight-bold">{{ label }}</label>
    </b-col>
    <b-col>
      <div>{{ value }}</div>
    </b-col>
  </b-row>
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
      if (this.text !== undefined) {
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
