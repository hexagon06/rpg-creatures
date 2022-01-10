<template>
  <div v-if="data && data.length > 0">
    <span
      v-for="item in data"
      :key="item"
      class="badge badge-pill mr-1"
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
      default: "badge-secondary",
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
