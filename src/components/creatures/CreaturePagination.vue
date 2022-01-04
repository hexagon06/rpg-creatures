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
        :total-rows="filteredCount"
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
import { creatureStore } from "../../store";
import { creatureMapper } from "../../store/creatures";
export default Vue.extend({
  data() {
    return {
      pageOptions: [10, 20, 50, 100],
    };
  },
  computed: {
    ...creatureMapper.mapState(["filteredCount"]),
    currentPage: {
      get(): number {
        return creatureStore.state.currentPage;
      },
      set(value: number) {
        creatureStore.mutations.setCurrentPage(value);
      },
    },
    perPage: {
      get(): number {
        return creatureStore.state.perPage;
      },
      set(value: number) {
        creatureStore.mutations.setPerPage(value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
