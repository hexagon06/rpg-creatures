<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form ref="form"
          @submit.stop.prevent="() => { }">
      <creature-form v-model="creatureForm" />
    </form>
  </div>
</template>

<script lang="ts">

import { useCreatureStore } from "@/store/creatures";
import { mapWritableState } from "pinia";
import { useIndexesStore } from "@/store/indexes";

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    await this.loadCreature();
  },
  computed: {
    ...mapWritableState(useCreatureStore, ["creatureForm"]),
    loading(): boolean {
      return (
        !useIndexesStore().initialized ||
        useCreatureStore().creatureForm === undefined
      );
    },
  },
  watch: {
    id: "loadCreature",
  },
  methods: {
    async loadCreature() {
      const creatureStore = useCreatureStore();
      if (!creatureStore.creature || creatureStore.creature.id !== this.id) {
        await creatureStore.fetch(this.id);
      }
      await creatureStore.startEdit();
    },
  },
});
</script>

<style lang="scss" scoped></style>
