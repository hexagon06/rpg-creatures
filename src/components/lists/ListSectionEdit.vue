<template>
  <div class="flex gap-2 flex-col">
    <div v-if="weighted" class="ml-20">{{ total }}</div>
    <div class="flex flex-col gap-2">
      <div
        v-for="(item, i) in orderedList"
        :key="i"
        class="flex-grow grid grid-flow-row-dense list-grid-template gap-2"
      >
        <span class="flex gap-2">
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
        </span>

        <span>
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
        </span>

        <span class="col-start-2 col-span-3 lg:col-span-1 flex gap-2">
          <input
            v-model="item.label"
            class="w-0 flex-grow flex-initial"
            @blur="updateModel"
          />
          <button
            v-if="item.reference === undefined || isLinking(item)"
            @click="linking(item)"
            class="button-round break-before-auto"
            :class="isLinking(item) ? 'button-on-brown' : 'button-on-rouge'"
          >
            <font-awesome-icon
              v-if="!isLinking(item)"
              icon="fa-solid fa-link"
            />
            <font-awesome-icon
              v-if="isLinking(item)"
              icon="fa-solid fa-link-slash"
            />
          </button>

          <input
            v-if="isLinking(item)"
            v-model="item.reference"
            class="w-0 flex-grow flex-initial"
            @blur="updateModel"
          />

          <reference-picker
            v-if="item.reference === undefined || isReferencing(item)"
            :reference.sync="item.reference"
          />
        </span>

        <span class="col-end-5 flex gap-2">
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
        </span>
      </div>
    </div>
    <button @click="create()" class="button-round-large button-on-rouge">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script lang="ts">
import { getRollingListItem, RollingListItem } from "@/types";
import { cloneDeep, isString, sortBy, sum } from "lodash";
import Vue, { PropType } from "vue";

type ItemType = RollingListItem;

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
      isAddingLink: false,
      isAddingReference: false,
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
    isLinking(item: ItemType): boolean {
      return item.reference !== undefined && isString(item.reference);
    },
    linking(item: ItemType) {
      if (this.isLinking(item)) item.reference = undefined;
      else item.reference = "";
      this.updateModel();
    },
    isReferencing(item: ItemType): boolean {
      return item.reference !== undefined && isString(item.reference) === false;
    },
    referencing(item: ItemType) {
      if (this.isReferencing(item)) item.reference = undefined;
      else
        item.reference = {
          routerName: "",
          id: "",
        };
      this.updateModel();
    },
    create() {
      const lastItem = this.orderedList[this.orderedList.length - 1];
      const lastOrder = lastItem ? lastItem.order : -1;

      const item = getRollingListItem(lastOrder);
      item.reference = undefined;

      this.$emit("update:value", cloneDeep(this.value).concat([item]));
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
.list-grid-template {
  grid-template-columns: fit-content(2rem) fit-content(4rem) 1fr fit-content(
      2rem
    );
}
</style>
