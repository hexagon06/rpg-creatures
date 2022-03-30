<template>
  <div v-if="!initialized">Loading...</div>
  <div v-else class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="session in sessions"
        :key="session.id"
        :to="{ name: 'Session', params: { id: session.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ session.title }}</h2>
          <p class="line-clamp-2">{{ session.synopsis }}</p>
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { indexesMapper } from "@/store";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...indexesMapper.mapState(["sessions", "initialized"]),
  },
});
</script>

<style lang="scss" scoped>
</style>
