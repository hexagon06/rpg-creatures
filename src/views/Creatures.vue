<template>
  <div class="creature">
    <div class="d-flex flex-column mh-100">
      <h1>This is the creature page</h1>
      <creature-filters />
      <creature-table :creatures="creatures" style="overflow: auto" />
      <creature-pagination />
    </div>
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
  async created() {
    if (!creatureStore.state.initialized) {
      await creatureStore.actions.initialize();
    }
  },
  computed: {
    ...creatureMapper.mapState(["creatures"]),
  },
});
</script>
