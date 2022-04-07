<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="idea in ideas"
        :key="idea.id"
        :to="{ name: 'Idea', params: { id: idea.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ idea.title }}</h2>
          <p class="line-clamp-2">{{ idea.synopsis }}</p>
          <array-pills
            :data="idea.tags"
            class="line-clamp-1"
            :title="idea.tags.join(', ')"
          />
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
    ...indexesMapper.mapState(["ideas", "initialized"]),
  },
});
</script>

<style lang="scss" scoped>
</style>
