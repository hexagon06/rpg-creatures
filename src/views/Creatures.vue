<template>
  <div class="creature">
    <h1>This is the creature page {{ creatures.length }}</h1>
    <creature-table :creatures="creatures" />
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
