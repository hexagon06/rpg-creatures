<template>
  <div class="flex justify-center">
    <div class="creature-grid">
      <grid-card
        v-for="creature in creatures"
        :key="creature.id"
        :to="{ name: 'Creature', params: { id: creature.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ creature.name }}</h2>
          <p class="line-clamp-2">{{ creature.cr }}</p>
          <array-pills
            :data="creature.tags"
            class="line-clamp-1"
            :title="creature.tags.join(', ')"
          />
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
// cr?: number
// environment: string[]
// favorite: boolean
// name: string
// newTags: Tag[]
// image?: string
// size?: string
// system?: string
// tags: string[]
// type?: string

import { indexesMapper } from "@/store";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...indexesMapper.mapState(["creatures", "initialized"]),
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
</style>
