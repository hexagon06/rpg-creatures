<template>
  <div class="d-flex flex-column">
    <creature-sidebar
      id="sidebar-creature"
      v-model="sidebarCreatureOpen"
    ></creature-sidebar>
    <div class="d-flex">
      <div></div>
      <creature-filters v-if="!loading" class="flex-fill py-2" />
      <create-creature> </create-creature>
    </div>
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
        <creature-table
          :creatures="creatures"
          @select="selectCreatures"
          aria-controls="sidebar-creature"
          :aria-expanded="sidebarCreatureOpen"
        />
      </b-skeleton-wrapper>
    </div>
    <creature-pagination />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  creatureStore,
  creatureMapper,
  abilityStore,
  indexesMapper,
} from "@/store";
import { Creature } from "@/types/creatures";

export default Vue.extend({
  data() {
    return {
      loading: true,
      sidebarCreatureOpen: false,
    };
  },
  async created() {
    if (!abilityStore.state.initialized) {
      await abilityStore.actions.initialize();
    }
    this.loading = false;
  },
  computed: {
    ...indexesMapper.mapState(["creatures"]),
    ...creatureMapper.mapState(["selectedCreature"]),
  },
  methods: {
    async selectCreatures(data: Creature[]) {
      if (data.length === 0) {
        this.sidebarCreatureOpen = false;
        await creatureStore.actions.setSelectedCreature(undefined);
      } else if (data.length !== 1) {
        throw new Error(
          `unsupported amount of creatures selected (${data.length})`
        );
      } else if (
        this.selectedCreature?.id !== data[0].id ||
        !this.sidebarCreatureOpen
      ) {
        await creatureStore.actions.setSelectedCreature(data[0].id);
        this.sidebarCreatureOpen = true;
      }
    },
  },
});
</script>

