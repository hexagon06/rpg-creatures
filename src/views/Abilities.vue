<template>
  <div class="d-flex flex-column">
    <ability-sidebar
      id="sidebar-ability"
      v-model="sidebarAbilityOpen"
    ></ability-sidebar>
    <div class="d-flex">
      <create-ability class="ml-auto"> </create-ability>
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
        <ability-table
          :abilities="abilities"
          @select="selectAbility"
          aria-controls="sidebar-ability"
          :aria-expanded="sidebarAbilityOpen"
        />
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Ability } from "@/types/abilities";
import { abilityStore } from "@/store";
import { abilityMapper } from "@/store/abilities";

export default Vue.extend({
  data() {
    return {
      loading: true,
      sidebarAbilityOpen: false,
    };
  },
  async created() {
    if (!abilityStore.state.initialized) {
      await abilityStore.actions.initialize();
    }
    this.loading = false;
  },
  computed: {
    ...abilityMapper.mapState(["abilities", "selectedAbility"]),
  },
  methods: {
    async selectAbility(data: Ability[]) {
      if (data.length === 0) {
        this.sidebarAbilityOpen = false;
        await abilityStore.actions.setSelectedAbility(undefined);
      } else if (data.length !== 1) {
        throw new Error(
          `unsupported amount of abilities selected (${data.length})`
        );
      } else if (
        this.selectedAbility?.id !== data[0].id ||
        !this.sidebarAbilityOpen
      ) {
        await abilityStore.actions.setSelectedAbility(data[0].id);
        this.sidebarAbilityOpen = true;
      }
    },
  },
});
</script>
