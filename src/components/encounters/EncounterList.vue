<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="encounter in encounters"
        :key="encounter.id"
        :to="{ name: 'Encounter', params: { id: encounter.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ encounter.name }}</h2>
          <p class="line-clamp-2">{{ encounter.synopsis }}</p>
          <array-pills
            :data="encounter.tags"
            class="line-clamp-1"
            :title="encounter.tags.join(', ')"
          />
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { indexesMapper } from "@/store";
import { useEncounterStore } from "@/store/encounters";
import { mapActions } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...indexesMapper.mapState(["encounters", "initialized"]),
  },
  methods: {
    ...mapActions(useEncounterStore, ["createEncounter"]),
    async create() {
      await this.createEncounter();
      const store = useEncounterStore();
      if (store.encounter?.id) {
        this.$router.push({
          path: "encounter",
          params: { id: store.encounter.id },
        });
      } else {
        throw Error("encounter should have been set");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
