<template>
  <div class="flex gap-2 flex-col">
    <div class="flex flex-wrap">
      <input-wrapper
        label="List Title"
        validation="Invalid title"
        :is-valid="value.label && value.label.length > 0"
        class="w-full md:w-2/3 md:pr-2"
      >
        <input
          id="input-1"
          v-model="value.label"
          placeholder="List of..."
          required
        />
      </input-wrapper>
      <input-wrapper label="List type" class="md:w-1/3">
        <t-select
          v-model="value.listType"
          :options="['bullet', 'check', 'numeric']"
          variant="demo"
        ></t-select>
      </input-wrapper>
    </div>
    <div class="flex gap-2 flex-col">
      <div
        v-for="(item, i) in value.items"
        :key="i"
        class="flex gap-2 flex-grow"
      >
        {{ i + 1 }}
        <input v-model="item.item" class="flex-grow" />
        <button @click="remove(i)" class="button-round button-on-rouge">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
      </div>
    </div>
    <button @click="create()" class="button-round button-on-rouge">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
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
  methods: {
    create() {
      this.value.items.push({
        item: "",
      });
    },
    remove(index: number) {
      this.value.items = this.value.items
        .slice(0, index)
        .concat(this.value.items.slice(index + 1));
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
