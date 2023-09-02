<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ rollingList.name }}</h1>
    </div>
    <!-- description card -->
    <div class="m-3 text-left">
      <ul>
        <li v-for="(item, i) in sortedItems"
            :key="i"
            class="flex gap-2">
          <rolling-list-item :item="item"
                             class="flex-grow" />
          <span v-if="item.weight !== 1"
                title="weight">{{ item.weight }}</span>
          <span class="w-6">
            <font-awesome-icon v-if="item.repeatable"
                               icon="fa-solid fa-repeat" />
          </span>
        </li>
      </ul>
    </div>

    <list-roller :list="sortedItems" />
  </div>
</template>

<script lang="ts">

import ArrayPills from "../shared/ArrayPills.vue";
// import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useListStore } from "@/store/rollingLists";
import { sortBy } from "lodash";
import { RollingListItem as RLItem } from "@/types";
import ListRoller from "./ListRoller.vue";
import RollingListItem from "./RollingListItem.vue";

import { defineComponent } from 'vue'
export default defineComponent({
  components: { ArrayPills, ListRoller, RollingListItem },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchList(this.id);
  },
  watch: {
    id: "fetchList",
  },
  computed: {
    ...mapState(useListStore, ["rollingList"]),
    loading(): boolean {
      return this.rollingList === undefined;
    },
    sortedItems(): RLItem[] {
      if (this.rollingList === undefined) return [];
      return sortBy(this.rollingList.items, (i) => i.order);
    },
  },
  methods: {
    async fetchList(id: string) {
      const store = useListStore();
      await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;

.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}

.bd-highlight {
  background-color: darken(#fff, 5);
}
</style>
