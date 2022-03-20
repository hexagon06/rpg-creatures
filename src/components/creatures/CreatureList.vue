<template>
  <div v-if="initialized" class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="creature in limitedCreatures"
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
import { useFilterStore } from "@/store/filter";
import { CreatureIndex } from "@/types";
import { CreatureFilter } from "@/types/filter";
import { difference, filter } from "lodash";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      loadSize: 6,
      currentLoaded: 3,
    };
  },
  computed: {
    ...mapState(useFilterStore, ["creatureFilter"]),
    ...indexesMapper.mapState(["creatures", "initialized"]),
    filteredCreatures(): CreatureIndex[] {
      return filter(this.creatures, (value) =>
        filterCreature(value, this.creatureFilter)
      );
    },
    limitedCreatures(): CreatureIndex[] {
      return this.filteredCreatures.slice(
        0,
        this.loadSize * this.currentLoaded
      );
    },
    maxLoaded(): number {
      return this.filteredCreatures.length / this.loadSize;
    },
  },
  watch: {
    filteredCreatures: function () {
      window.scrollTo(0, 0);
      this.currentLoaded = 3;
    },
  },
  mounted() {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight;
      if (document.scrollingElement) {
        const difference =
          document.scrollingElement.scrollHeight - bottomOfWindow;
        if (
          difference !== 0 &&
          difference < 200 &&
          this.maxLoaded > this.currentLoaded
        ) {
          this.currentLoaded++;
        }
      }
    };
  },
});

function filterCreature(
  creature: CreatureIndex,
  filter: CreatureFilter
): boolean {
  return (
    creature.name.toLowerCase().includes(filter.search.toLowerCase()) &&
    valueIsInSet(creature.size, filter.size) &&
    valueIsInSet(creature.type, filter.type) &&
    valueIsInSet(creature.system, filter.system) &&
    valueIsInSet(creature.cr, filter.cr) &&
    valueContainsSet(creature.environment, filter.environment) &&
    valueContainsSet(creature.tags, filter.tags) &&
    valueIsInSet(creature.source, filter.source) &&
    valueIsFilter(creature.favorite, filter.favorite)
  );
}

function valueIsInSet<T>(value: T, filter: T[]): boolean {
  return filter.length === 0 || filter.indexOf(value) >= 0;
}
function valueContainsSet<T>(value: T[], filter: T[]): boolean {
  return filter.length === 0 || difference(filter, value).length === 0;
}
function valueIsFilter(value: boolean, filter: boolean): boolean {
  return filter ? value === filter : true;
}
</script>

<style lang="scss" scoped>
</style>
