<template>
  <div class="d-flex flex-column">
    <creature-sidebar
      id="sidebar-creature"
      v-model="sidebarCreatureOpen"
    ></creature-sidebar>
    <div class="d-flex">
      <creature-filters class="flex-fill py-2" />
      <create> </create>
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
import CreatureTable from "../components/creatures/CreatureTable.vue";
import { creatureStore } from "../store/index";
import { creatureMapper } from "../store/creatures";
import CreatureFilters from "../components/creatures/CreatureFilters.vue";
import CreaturePagination from "../components/creatures/CreaturePagination.vue";
import CreatureSidebar from "../components/creatures/CreatureSidebar.vue";
import { Creature } from "@/types/creatures";
import Create from "@/components/creatures/Create.vue";

export default Vue.extend({
  components: {
    CreatureTable,
    CreatureFilters,
    CreaturePagination,
    CreatureSidebar,
    Create,
  },
  data() {
    return {
      loading: true,
      sidebarCreatureOpen: false,
    };
  },
  async created() {
    if (!creatureStore.state.initialized) {
      await creatureStore.actions.initialize();
    }
    this.loading = false;
  },
  computed: {
    ...creatureMapper.mapState(["creatures", "selectedCreature"]),
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

