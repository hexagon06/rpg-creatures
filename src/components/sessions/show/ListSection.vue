<template>
  <div>
    <h3>{{ value.label }}</h3>
    <ol v-if="value.listType === 'numeric'" class="list-decimal">
      <li v-for="(item, i) in value.items" :key="i">{{ item.item }}</li>
    </ol>
    <ul v-else class="list-disc">
      <li v-for="(item, i) in value.items" :key="i">{{ item.item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ListPrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<ListPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
