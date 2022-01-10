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
    />
    <p v-else>no creature is selected.</p>
    <template #footer="{ hide }">
      <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto"></strong>
        <b-button size="sm" @click="hide">Close</b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import { creatureMapper } from "@/store/creatures";
import Vue from "vue";
import CreatureDetails from "./CreatureDetails.vue";

export default Vue.extend({
  components: {
    CreatureDetails,
  },
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
  },
});
</script>

<style lang="scss" scoped>
</style>
