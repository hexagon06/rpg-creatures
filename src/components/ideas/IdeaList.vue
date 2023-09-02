<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card v-for="idea in sortedIdeas"
                 :key="idea.id"
                 :to="{ name: 'Idea', params: { id: idea.id } }">
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ idea.title }}</h2>
          <p class="line-clamp-2">{{ idea.synopsis }}</p>
          <array-pills :data="idea.tags"
                       class="line-clamp-1"
                       :title="idea.tags.join(', ')" />
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useIndexesStore } from "@/store/indexes";
import { IdeaIndex } from "@/types";
import { sortBy } from "lodash";
import { mapState } from "pinia";

import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    ...mapState(useIndexesStore, ["ideas", "initialized"]),
    sortedIdeas(): IdeaIndex[] {
      return sortBy(this.ideas, (i) => -i.lastEdited);
    },
  },
});
</script>

<style lang="scss" scoped></style>
