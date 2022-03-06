<template>
  <b-row>
    <b-col sm="5" md="3" class="my-1">
      <b-form-group
        label="Per page"
        label-for="per-page-select"
        label-align-sm="right"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-size="sm"
        class="mb-0"
      >
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          size="sm"
          class="col"
        ></b-form-select>
      </b-form-group>
    </b-col>
    <b-col sm="7" md="9" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="creatureFilterResult.count"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0 col"
      ></b-pagination>
    </b-col>
  </b-row>
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
