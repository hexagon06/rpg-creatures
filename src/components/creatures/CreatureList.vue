<template>
  <div v-if="initialized" class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="creature in limitedCreatures"
        :key="creature.id"
        :to="{ name: 'Creature', params: { id: creature.id } }"
      >
        <div class="flex w-full h-full relative">
          <div class="w-1/3 md:w-1/2 h-full">
            <thumbnail
              v-if="creature.image"
              :url="creature.image"
              class="w-full h-full"
            ></thumbnail>
          </div>
          <p
            v-if="creature.cr !== undefined"
            class="
              rounded-full
              border-3
              w-8
              h-8
              bg-gold
              border-purple
              text-purple
              absolute
              top-2
              left-1/4
              -ml-4
              -mt-4
              justify-center
              text-center
            "
          >
            {{ creature.cr }}
          </p>
          <favorite
            v-if="creature.favorite"
            v-model="creature.favorite"
            class="absolute right-0 -mt-2 -mr-2"
          />
          <div class="w-2/3 md:w-1/2 h-full pl-1">
            <h2 class="mb-3 truncate">
              {{ creature.name }}
            </h2>
            <creature-type-icon
              v-if="creature.type"
              :type="creature.type"
              :title="creature.type"
            />
            <i v-if="shortDescriptor(creature)">
              {{ shortDescriptor(creature) }}
            </i>
            <array-pills
              :data="creature.tags"
              class="line-clamp-1"
              :title="creature.tags.join(', ')"
            />
          </div>
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { filterCreature } from "@/shared";
import { useFilterStore } from "@/store/filter";
import { useIndexesStore } from "@/store/indexes";
import { CreatureIndex, CreatureFilter } from "@/types";
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
    ...mapState(useIndexesStore, ["creatures", "initialized"]),
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
  methods: {
    shortDescriptor(creature: CreatureIndex): string | undefined {
      const value = `${creature.size ?? ""} ${creature.type ?? ""}`.trim();
      return value.length > 0 ? value : undefined;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
