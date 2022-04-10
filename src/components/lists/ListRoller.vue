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
        <p>rolled {{ item.value }} out of {{ listTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RollingListItem as RLItem } from "@/types";
import { sum } from "lodash";
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
      rollResults: [] as { value: number; item: RLItem }[],
    };
  },
  computed: {
    minMaxList(): { min: number; max: number; item: RLItem }[] {
      let count = 0;
      return this.list.map((l) => {
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
      return sum(this.list.map((l) => l.weight));
    },
  },
  methods: {
    roll() {
      // for (let index = 0; index < 1000; index++) {
      const random = Math.floor(Math.random() * this.listTotal);
      const item = this.getResult(random);

      this.rollResults.push({ value: random, item });
      // }
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
