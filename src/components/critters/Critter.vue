<template>
  <div v-if="loading">Loading...</div>
  <critter-details v-else
                   v-model="creature"
                   :imgSize="278"
                   @favorite="favoriteChange"
                   class="sticky-top" />
</template>

<script lang="ts">
// import { useCreatureStore } from "@/store/creatures";
import { creatureApi } from "@/api/new-typed/creatureApi";
import { useCritterStore } from "@/store/critters";
import { Creature } from "@/types/creatures";
import { mapState, mapWritableState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      creature: undefined as Creature | undefined
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchCreature(this.id);
  },
  watch: {
    id: "fetchCreature",
  },
  computed: {
    ...mapWritableState(useCritterStore, ['editState']),
    loading(): boolean {
      return this.creature === undefined;
    },
  },
  methods: {
    async fetchCreature(id: string) {
      this.creature = await creatureApi.get(id);
      this.editState = 'idle'
    },
    async favoriteChange(favorite: boolean) {
      console.warn("favoriteChange not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
