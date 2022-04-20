<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="list in filteredLists"
        :key="list.id"
        :to="{ name: 'List', params: { id: list.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ list.name }}</h2>
          <p class="line-clamp-2">{{ list.itemCount }} items</p>
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { filterList } from "@/shared";
import { useFilterStore } from "@/store/filter";
import { useIndexesStore } from "@/store/indexes";
import { RollingListIndex } from "@/types";
import { filter, sortBy } from "lodash";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...mapState(useIndexesStore, ["lists", "initialized"]),
    ...mapState(useFilterStore, ["listFilter"]),
    filteredLists(): RollingListIndex[] {
      return sortBy(
        filter(this.lists, (value) => filterList(value, this.listFilter)),
        (l) => -l.lastEdited
      );
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
