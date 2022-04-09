<template>
  <div class="flex gap-2 flex-col">
    <div v-if="weighted" class="ml-20">{{ total }}</div>
    <div class="flex gap-2 flex-col">
      <div
        v-for="(item, i) in orderedList"
        :key="i"
        class="flex gap-2 flex-grow"
      >
        <button
          @click="moveItem(item.order, 'up')"
          class="button-round button-on-rouge"
          title="move up"
          :disabled="item.order === 0"
        >
          <font-awesome-icon icon="fa-solid fa-angle-up" />
        </button>
        <button
          @click="moveItem(item.order, 'down')"
          class="button-round button-on-rouge"
          title="move down"
          :disabled="item.order === orderedList.length - 1"
        >
          <font-awesome-icon icon="fa-solid fa-angle-down" />
        </button>
        <input
          v-if="weighted"
          v-model.number="item.weight"
          class="w-9"
          number
          @blur="updateModel"
        />
        <span v-if="weighted" class="text-xs">
          {{ toPercentage(item.weight) }}%
        </span>
        <input v-model="item.label" class="flex-grow" @blur="updateModel" />
        <button
          @click="repeat(item)"
          class="button-round"
          :title="item.repeatable"
          :class="item.repeatable ? 'button-on-brown' : 'button-on-rouge'"
        >
          <font-awesome-icon icon="fa-solid fa-repeat" />
        </button>
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
import {
  getRollingListItem,
  ReferenceListItem,
  RollingListItem,
} from "@/types";
import { cloneDeep, sortBy, sum } from "lodash";
import Vue, { PropType } from "vue";

type ItemType = ReferenceListItem & RollingListItem;

export default Vue.extend({
  props: {
    value: {
      type: Array as PropType<ItemType[]>,
      required: true,
    },
    weighted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      orderingItemId: undefined as undefined | string,
    };
  },
  computed: {
    orderedList(): ItemType[] {
      return sortBy(this.value, (v) => v.order);
    },
    total(): number {
      return sum(this.value.map((v) => Number(v.weight)));
    },
  },
  methods: {
    create() {
      const lastItem = this.orderedList[this.orderedList.length - 1];
      const lastOrder = lastItem ? lastItem.order : -1;
      console.log(lastOrder);

      this.$emit(
        "update:value",
        cloneDeep(this.value).concat([getRollingListItem(lastOrder)])
      );
    },
    remove(index: number) {
      const item = this.orderedList[index];
      this.$emit(
        "update:value",
        this.value.filter((v) => v.id !== item.id)
      );
    },
    updateModel() {
      this.$emit("update:value", cloneDeep(this.value));
    },
    repeat(item: ItemType) {
      item.repeatable = !item.repeatable;
      this.updateModel();
    },
    toPercentage(weight: number) {
      return Math.round((weight / this.total) * 100);
    },
    moveItem(order: number, direction: "up" | "down") {
      if ((order > 0 || order < this.orderedList.length - 1) && this.value) {
        if (direction === "up") {
          const before = this.value.find((s) => s.order === order - 1);
          const target = this.value.find((s) => s.order === order);
          before!.order++;
          target!.order--;
        } else if (direction === "down") {
          const before = this.value.find((s) => s.order === order + 1);
          const target = this.value.find((s) => s.order === order);
          before!.order--;
          target!.order++;
        } else throw new Error(`direction '${direction}' is invalid`);
      } else {
        console.warn(`cannot move ${direction}`);
      }
      this.updateModel();
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
