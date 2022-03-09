<template>
  <div>
    <div sm="5" md="3" class="my-1">
      <div
        label="Per page"
        label-for="per-page-select"
        label-align-sm="right"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-size="sm"
        class="mb-0"
      >
        <button
          id="per-page-select"
          :options="pageOptions"
          size="sm"
          class="col"
        ></button>
      </div>
    </div>
    <div sm="7" md="9" class="my-1">
      pagination
      <!-- <b-pagination
        v-model="currentPage"
        :total-rows="creatureFilterResult.count"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0 col"
      ></b-pagination> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { filterMapper, filterStore } from "@/store";

export default Vue.extend({
  data() {
    return {
      pageOptions: [10, 20, 50, 100],
    };
  },
  computed: {
    ...filterMapper.mapState(["creatureFilterResult"]),
    currentPage: {
      get(): number {
        return this.creatureFilterResult.currentPage;
      },
      set(value: number) {
        filterStore.actions.setCreatureFilterResult({
          ...this.creatureFilterResult,
          currentPage: value,
        });
      },
    },
    perPage: {
      get(): number {
        return this.creatureFilterResult.pageSize;
      },
      set(value: number) {
        filterStore.actions.setCreatureFilterResult({
          ...this.creatureFilterResult,
          pageSize: value,
        });
      },
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
