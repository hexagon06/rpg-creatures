<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="encounter in encounters"
        :key="encounter.id"
        :to="{ name: 'Encounter', params: { id: encounter.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ encounter.name }}</h2>
          <p class="line-clamp-2">{{ encounter.synopsis }}</p>
          <array-pills
            :data="encounter.tags"
            class="line-clamp-1"
            :title="encounter.tags.join(', ')"
          />
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useIndexesStore } from "@/store/indexes";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...mapState(useIndexesStore, ["encounters", "initialized"]),
  },
});
</script>

<style lang="scss" scoped>
</style>
