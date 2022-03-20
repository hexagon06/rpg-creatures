<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form ref="form">
      <creature-form v-model="creatureForm" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { indexesStore } from "@/store";
import { useCreatureStore } from "@/store/creatures";
import { mapWritableState } from "pinia";

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    const creatureStore = useCreatureStore();
    if (!creatureStore.creature || creatureStore.creature.id !== this.id) {
      await creatureStore.fetch(this.id);
    }
    await creatureStore.startEdit();
  },
  computed: {
    ...mapWritableState(useCreatureStore, ["creatureForm"]),
    loading(): boolean {
      return (
        !indexesStore.state.initialized ||
        useCreatureStore().creatureForm === undefined
      );
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
