<template>
  <b-sidebar
    id="sidebar-creature"
    title="Creature-details"
    :no-header="creatureIsSelected"
    :visible="value"
    @change="close"
    shadow
  >
    <creature-details
      v-if="creatureIsSelected"
      v-model="selectedCreature"
      :imgSize="278"
      @favorite="favoriteChange"
    />
    <p v-else>no creature is selected.</p>
    <template #footer="{ hide }">
      <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <edit-creature v-if="creatureIsSelected" :creature="selectedCreature" />
        <strong class="mr-auto"></strong>
        <b-button size="sm" @click="hide">Close</b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from "vue";
import { creatureMapper } from "@/store/creatures";
import { creatureStore } from "@/store";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...creatureMapper.mapState(["selectedCreature"]),
    creatureIsSelected(): boolean {
      return this.selectedCreature !== undefined;
    },
  },
  methods: {
    close(value: boolean) {
      this.$emit("input", value);
    },
    async favoriteChange(value: boolean) {
      if (this.selectedCreature && this.selectedCreature.id) {
        await creatureStore.actions.updateFavorite({
          creatureId: this.selectedCreature.id,
          favorite: value,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
