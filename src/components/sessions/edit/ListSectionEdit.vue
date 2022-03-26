<template>
  <div class="flex gap-2 flex-col">
    <div class="flex gap-3">
      <input-wrapper
        label="List Title"
        validation="Invalid title"
        :is-valid="value.label && value.label.length > 0"
      >
        <input
          id="input-1"
          v-model="value.label"
          placeholder="Chapter title"
          aria-describedby="password-help-block"
          required
        />
        <template v-slot:help> What is the list about </template>
      </input-wrapper>
      <input-wrapper label="List type">
        <t-select
          v-model="value.listType"
          :options="['bullet', 'check', 'numeric']"
          variant="demo"
        ></t-select>
      </input-wrapper>
    </div>
    <div class="flex gap-1 flex-col">
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
