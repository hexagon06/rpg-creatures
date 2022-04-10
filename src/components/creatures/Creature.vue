<template>
  <div v-if="loading">Loading...</div>
  <creature-details
    v-else
    v-model="creature"
    :imgSize="278"
    @favorite="favoriteChange"
    class="sticky-top"
  />
</template>

<script lang="ts">
import { useCreatureStore } from "@/store/creatures";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchEncounter(this.id);
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    ...mapState(useCreatureStore, ["creature"]),
    loading(): boolean {
      return this.creature === undefined;
    },
  },
  methods: {
    async fetchEncounter(id: string) {
      await useCreatureStore().fetch(id);
    },
    async favoriteChange(favorite: boolean) {
      console.warn("favoriteChange not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
