<template>
  <div v-if="encounter" class="d-flex">
    <div class="flex-grow-1">
      <h1>{{ encounter.name }}</h1>
    </div>
    <div class="">selecting other links</div>
  </div>
  <div v-else>
    <h1>Encounter</h1>
  </div>
</template>

<script lang="ts">
import { encounterMapper, encounterStore } from "@/store";
import { Encounter } from "@/types";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      encounter: undefined as Encounter | undefined,
    };
  },
  async created() {
    await encounterStore.actions.fetch(this.id);
    this.encounter = encounterStore.state.encounter;
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  watch: {
    id: "fetchEncounter",
  },
  methods: {
    async fetchEncounter(id: string) {
      await encounterStore.actions.fetch(id);
      this.encounter = encounterStore.state.encounter;
    },
  },
});
</script>

<style lang="scss" scoped>
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
</style>
