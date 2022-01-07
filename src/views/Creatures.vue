<template>
  <div class="d-flex flex-column">
    <creature-filters class="py-2" />
    <div class="flex-1-1-0" style="overflow: auto">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-skeleton-table
            :rows="5"
            :columns="6"
            animation="throb"
            width="85%"
          >
          </b-skeleton-table>
        </template>
        <creature-table :creatures="creatures" />
      </b-skeleton-wrapper>
    </div>
    <creature-pagination />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatureTable from "../components/creatures/CreatureTable.vue";
import { creatureStore } from "../store/index";
import { creatureMapper } from "../store/creatures";
import CreatureFilters from "../components/creatures/CreatureFilters.vue";
import CreaturePagination from "../components/creatures/CreaturePagination.vue";

export default Vue.extend({
  components: { CreatureTable, CreatureFilters, CreaturePagination },
  data() {
    return {
      loading: true,
    };
  },
  async created() {
    if (!creatureStore.state.initialized) {
      await creatureStore.actions.initialize();
    }
    this.loading = false;
  },
  computed: {
    ...creatureMapper.mapState(["creatures"]),
  },
});
</script>

