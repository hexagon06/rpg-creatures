<template>
  <div v-if="data && data.length > 0" class="flex gap-1 my-2">
    <span
      v-for="item in data"
      :key="item"
      class="rounded-xl mr-1 px-2 bg-gold text-dark-blue"
      :class="variant"
      >{{ item }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    data: {
      type: Array as PropType<string[]>,
      required: true,
    },
    variant: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
