<template>
  <div class="container-fluid d-flex">
    <label>Search:</label
    ><b-form-input v-model="search" debounce="300"></b-form-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { creatureStore } from "../../store";

export default Vue.extend({
  async created() {
    // fetch from the local store
    await creatureStore.actions.fetchSearch();
  },
  computed: {
    search: {
      get(): string {
        return creatureStore.state.search;
      },
      set(value: string): void {
        creatureStore.mutations.setSearch(value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
