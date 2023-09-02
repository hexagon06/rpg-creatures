<template>
  <div class="flex gap-2 flex-col">
    <div class="flex flex-wrap">
      <input-wrapper label="List Title"
                     validation="Invalid title"
                     :is-valid="modelValue.label && modelValue.label.length > 0"
                     class="w-full md:w-2/3 md:pr-2">
        <input id="input-1"
               v-model="modelValue.label"
               placeholder="List of..."
               required />
      </input-wrapper>
      <input-wrapper label="List type"
                     class="md:w-1/3">
        <t-select v-model="modelValue.listType"
                  :options="['bullet', 'check', 'numeric']"
                  variant="demo"></t-select>
      </input-wrapper>
    </div>
    <div class="flex gap-2 flex-col">
      <div v-for="(item, i) in modelValue.items"
           :key="i"
           class="flex gap-2 flex-grow">
        {{ i + 1 }}
        <input v-model="item.item"
               class="flex-grow" />
        <button @click="remove(i)"
                class="button-round button-on-rouge">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
      </div>
    </div>
    <button @click="create()"
            class="button-round button-on-rouge">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
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
  methods: {
    create() {
      this.modelValue.items.push({
        item: "",
      });
    },
    remove(index: number) {
      this.modelValue.items = this.modelValue.items
        .slice(0, index)
        .concat(this.modelValue.items.slice(index + 1));
    },
  },
});
</script>

<style lang="scss" scoped></style>
