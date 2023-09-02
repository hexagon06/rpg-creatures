<template>
  <div v-if="!initialized">Loading...</div>
  <div v-else
       class="flex justify-center">
    <div class="entity-grid">
      <grid-card v-for="session in sortedSessions"
                 :key="session.id"
                 :to="{ name: 'Session', params: { id: session.id } }">
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ session.title }}</h2>
          <p class="line-clamp-2">{{ session.synopsis }}</p>
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useIndexesStore } from "@/store/indexes";
import { SessionPrepIndex } from "@/types";
import { sortBy } from "lodash";
import { mapState } from "pinia";

import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    ...mapState(useIndexesStore, ["sessions", "initialized"]),
    sortedSessions(): SessionPrepIndex[] {
      return sortBy(this.sessions, (s) => -s.lastEdited);
    },
  },
});
</script>

<style lang="scss" scoped></style>
