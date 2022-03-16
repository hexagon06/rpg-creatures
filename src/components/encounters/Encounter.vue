<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ encounter.name }}</h1>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ encounter.synopsis }}
      </p>
    </div>
    <!-- description card -->
    <div class="m-3 text-left">
      <p class="pl-5">
        {{ encounter.flavorText }}
      </p>
      <div>
        <v-md-preview
          :text="encounter.description"
          :default-show-toc="true"
        ></v-md-preview>
      </div>
      <div v-if="encounter.reward">
        <h2>Rewards:</h2>
        {{ encounter.reward }}
      </div>
      <div v-if="encounter.tags && encounter.tags.length > 0">
        <array-pills :data="encounter.tags"></array-pills>
      </div>
    </div>

    <!-- reference lists -->
    <div class="px-3 mb-5">
      <list-card
        v-if="locations && locations.length"
        title="Locations"
        :list="locations"
      ></list-card>
      <list-card
        v-if="creatures && creatures.length"
        title="Creatures"
        :list="creatures"
      ></list-card>
      <list-card
        v-if="environments && environments.length"
        title="Environments"
        :list="environments"
      ></list-card>
    </div>
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// environment: string[]
import { indexesStore } from "@/store";
import { creatureLabel, ReferenceListItem } from "@/types";
import { intersectionWith } from "lodash";
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useEncounterStore } from "@/store/encounters";

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchEncounter(this.id);
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    ...mapState(useEncounterStore, ["encounter"]),
    loading(): boolean {
      return this.encounter === undefined;
    },
    locations(): ReferenceListItem[] {
      return [];
    },
    creatures(): ReferenceListItem[] {
      return this.encounter && indexesStore.state.initialized
        ? intersectionWith(
            indexesStore.state.creatures,
            this.encounter?.creatures,
            (i, c) => c.id === i.id
          ).map((c) => {
            return {
              id: c.id,
              label: creatureLabel(c),
              routerName: "Creature",
            };
          })
        : [] ?? [];
    },
    environments(): ReferenceListItem[] {
      return (
        this.encounter?.environment.map((e) => {
          return { id: e, label: e };
        }) ?? []
      );
    },
    hasReferences(): boolean {
      return (
        this.encounter !== undefined &&
        (this.encounter.locations.length > 0 ||
          this.encounter.environment.length > 0 ||
          this.encounter.creatures.length > 0)
      );
    },
  },
  methods: {
    async fetchEncounter(id: string) {
      const store = useEncounterStore();
      await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
.bd-highlight {
  background-color: darken(#fff, 5);
}
</style>
