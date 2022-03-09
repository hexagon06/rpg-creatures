<template>
  <div class="d-flex flex-column">
    <creature-sidebar
      id="sidebar-creature"
      v-model="sidebarCreatureOpen"
    ></creature-sidebar>
    <div class="d-flex">
      <div></div>
      <creature-filters v-if="!loading" class="flex-fill py-2" />
      <create-creature v-if="!loading"> </create-creature>
    </div>
    <div class="flex-1-1-0" style="overflow: auto">
      <creature-table
        :creatures="creatures"
        @select="selectCreatures"
        aria-controls="sidebar-creature"
        :aria-expanded="sidebarCreatureOpen"
      />
    </div>
    <creature-pagination />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { creatureStore, creatureMapper, indexesMapper } from "@/store";
import { Creature } from "@/types/creatures";
import { userMapper } from "@/store/users";

export default Vue.extend({
  data() {
    return {
      sidebarCreatureOpen: false,
    };
  },
  computed: {
    ...indexesMapper.mapState(["creatures", "initialized"]),
    ...creatureMapper.mapState(["selectedCreature"]),
    ...userMapper.mapState(["currentUser"]),
    loading(): boolean {
      return this.initialized === false;
    },
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

