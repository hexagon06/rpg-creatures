<template>
  <div>
    <h3>{{ modelValue.label }}</h3>
    <ul>
      <li v-for="(item, i) in modelValue.items"
          :key="`${modelValue.label}_item_${i}`">
        <input type="checkbox"
               :id="`${modelValue.label}_cb_item_${i}`"
               :value="item.item"
               v-model="modelValue.checked" />
        <label :for="`${modelValue.label}_cb_item_${i}`">{{ item.item }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ListPrep, ListRun } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ListRun>,
      required: true,
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped></style>
