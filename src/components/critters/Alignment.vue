<template>
  <div>
    <span
      v-for="item in values"
      :key="item"
      class="badge badge-pill mr-1"
      :class="`badge-${variantFor(item)}`"
      >{{ item }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    values: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  methods: {
    variantFor(alignment: string): string {
      switch (alignment.toLowerCase()) {
        case "chaotic":
          return "warning";
        case "lawful":
          return "info";
        case "good":
          return "success";
        case "evil":
          return "danger";
        default:
          return "secondary";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
