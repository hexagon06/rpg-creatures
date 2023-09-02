<template>
  <div>
    <h3>{{ modelValue.label }}</h3>
    <ol v-if="modelValue.listType === 'numeric'"
        class="list-decimal">
      <li v-for="(item, i) in modelValue.items"
          :key="i">{{ item.item }}</li>
    </ol>
    <ul v-else
        class="list-disc">
      <li v-for="(item, i) in modelValue.items"
          :key="i">{{ item.item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ListPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ListPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
