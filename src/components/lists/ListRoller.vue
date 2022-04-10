<template>
  <div>
    <button
      @click="roll"
      class="button-round-large button-on-brown"
      title="roll the dice"
    >
      <font-awesome-icon icon="fa-solid fa-dice-d20" />
    </button>
    <div class="flex flex-col-reverse">
      <div v-for="(item, i) in rollResults" :key="'result_' + i">
        <hr />
        <h3><rolling-list-item :item="item.item" /></h3>
        <p>{{ item.rollText }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RollingListItem as RLItem } from "@/types";
import { filter, sum } from "lodash";
import Vue, { PropType } from "vue";
import RollingListItem from "./RollingListItem.vue";

export default Vue.extend({
  components: { RollingListItem },
  props: {
    list: {
      type: Array as PropType<RLItem[]>,
    },
  },
  data() {
    return {
      rollResults: [] as { value: number; item: RLItem; rollText: string }[],
    };
  },
  computed: {
    filteredList(): RLItem[] {
      // should simply filter non repeatable items out of the list
      return filter(
        this.list,
        (i) =>
          i.repeatable ||
          this.rollResults.findIndex((rr) => rr.item.id === i.id) === -1
      );
    },
    minMaxList(): { min: number; max: number; item: RLItem }[] {
      let count = 0;
      return this.filteredList.map((l) => {
        const result = {
          min: count,
          max: count + l.weight - 1,
          item: l,
        };
        count += l.weight;
        return result;
      });
    },
    listTotal(): number {
      return sum(this.filteredList.map((l) => l.weight));
    },
  },
  methods: {
    roll() {
      const random = Math.floor(Math.random() * this.listTotal);
      const item = this.getResult(random);
      const rollText = `Rolled ${random + 1} out of ${this.listTotal}`;
      this.rollResults.push({ value: random, item, rollText });
    },
    getResult(roll: number): RLItem {
      const mm = this.minMaxList.find((m) => roll >= m.min && roll <= m.max);
      if (!mm) throw new Error("how can this be?");
      return mm.item;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
