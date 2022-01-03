<template>
  <div class="creature">
    <div class="d-flex flex-column mh-100">
      <!-- class="h-100 mh-100" -->
      <creature-table :creatures="creatures" style="overflow: auto" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatureTable from "../components/creatures/CreatureTable.vue";
import { creatureStore } from "../store/index";
import { creatureMapper } from "../store/creatures";

export default Vue.extend({
  components: { CreatureTable },
  created() {
    creatureStore.actions.fetchCreatures();
  },
  computed: {
    ...creatureMapper.mapState(["creatures"]),
  },
});
</script>
