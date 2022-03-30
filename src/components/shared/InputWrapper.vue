<template>
  <div class="flex flex-col gap-1">
    <label class="text-stone-400 text-xs w-full">{{ label }}</label>
    <slot />
    <p name="validation" v-if="!isValid" class="text-sm text-red-500">
      *{{ validation }}
    </p>
    <p class="text-sm text-stone-400 text-right"><slot name="help" /></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    label: { type: String, required: true },
    validation: { type: String, default: undefined },
    isValid: { type: Boolean, default: true },
  },
});
</script>

<style lang="scss" scoped>
</style>
