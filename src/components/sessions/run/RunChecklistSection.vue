<template>
  <div>
    <h3>{{ value.label }}</h3>
    <ul>
      <li v-for="(item, i) in value.items" :key="`${value.label}_item_${i}`">
        <input
          type="checkbox"
          :id="`${value.label}_cb_item_${i}`"
          :value="item.item"
          v-model="value.checked"
        />
        <label :for="`${value.label}_cb_item_${i}`">{{ item.item }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ListPrep, ListRun } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<ListRun>,
      required: true,
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
</style>
