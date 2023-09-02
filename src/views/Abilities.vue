<template>
  <div class="d-flex flex-column">
    <ability-sidebar id="sidebar-ability"
                     v-model="sidebarAbilityOpen"></ability-sidebar>
    <div class="d-flex">
      <create-ability class="ml-auto"> </create-ability>
    </div>
    <div class="flex-1-1-0"
         style="overflow: auto">
      <ability-table :abilities="abilities"
                     @select="selectAbility"
                     aria-controls="sidebar-ability"
                     :aria-expanded="sidebarAbilityOpen" />
    </div>
  </div>
</template>

<script lang="ts">

import { Ability } from "rpg-vue-base";
import { mapState } from "pinia";
import { useAbilityStore } from "@/store/abilities";

import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      loading: true,
      sidebarAbilityOpen: false,
    };
  },
  async created() {
    if (!this.initialized) {
      await useAbilityStore().initialize();
    }
    this.loading = false;
  },
  computed: {
    ...mapState(useAbilityStore, [
      "abilities",
      "selectedAbility",
      "initialized",
    ]),
  },
  methods: {
    async selectAbility(data: Ability[]) {
      if (data.length === 0) {
        this.sidebarAbilityOpen = false;
        await useAbilityStore().setSelectedAbility(undefined);
      } else if (data.length !== 1) {
        throw new Error(
          `unsupported amount of abilities selected (${data.length})`
        );
      } else if (
        this.selectedAbility?.id !== data[0].id ||
        !this.sidebarAbilityOpen
      ) {
        await useAbilityStore().setSelectedAbility(data[0].id);
        this.sidebarAbilityOpen = true;
      }
    },
  },
});
</script>
