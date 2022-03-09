<template>
  <div class="container-fluid d-flex">
    <button variant="primary">
      Filters
      <span v-if="filteredCount">
        ({{ filteredCount }}/{{ creatureCount }})
      </span>
    </button>
    <div id="filters">
      <div class="d-flex flex-wrap justify-content-start mx-2">
        <div class="mr-2">
          <label for="search-text">Name:</label>
          <input
            id="search-text"
            type="search"
            placeholder="Search"
            v-model="search"
            debounce="300"
          />
        </div>
        <div class="mr-2">
          <label for="size-filter">Size:</label>
          <pill-multiselect
            id="size-filter"
            v-model="sizeFilter"
            :options="sizeOptions"
            placeholder="Select size(s)"
          />
        </div>
        <div class="mr-2">
          <label for="type-filter">Type:</label>
          <pill-multiselect
            id="type-filter"
            v-model="typeFilter"
            :options="typeOptions"
            placeholder="Select type(s)"
          ></pill-multiselect>
        </div>
        <div class="mr-2">
          <label for="environment-filter">Environment:</label>
          <pill-multiselect
            id="environment-filter"
            v-model="environmentFilter"
            :options="environmentOptions"
          ></pill-multiselect>
        </div>
        <div class="mr-2">
          <label for="tags-filter">Tags:</label>
          <pill-multiselect
            id="tags-filter"
            v-model="tagsFilter"
            :options="tagsOptions"
          ></pill-multiselect>
        </div>
        <div class="mr-2">
          <label for="system-filter">System:</label>
          <pill-multiselect
            id="system-filter"
            v-model="systemFilter"
            :options="systemOptions"
          ></pill-multiselect>
        </div>
        <div class="mr-2">
          <label for="cr-filter">CR:</label>
          <pill-multiselect
            id="cr-filter"
            v-model="crFilter"
            :options="crOptions"
          ></pill-multiselect>
        </div>
        <div class="mr-2">
          <label for="cr-filter">Source:</label>
          <pill-multiselect
            id="cr-filter"
            v-model="sourceFilter"
            :options="sourceOptions"
          ></pill-multiselect>
        </div>
        <!-- <div class="mr-2">
          <label for="favorite-filter">Favorite:</label>
          <pill-multiselect
            id="favorite-filter"
            v-model="favoriteFilter"
            :options="favoriteOptions"
          ></pill-multiselect>
        </div> -->
      </div>
    </div>
    <span v-if="showRecap" class="align-self-center ml-2 text-info">{{
      recap
    }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Multiselect } from "vue-multiselect";
import { filterStore, filterMapper, indexesStore } from "@/store";

const IS_FAVORITE = "is favorite";

function stringFilter<T>(array: T[], label: string): string {
  return array.length > 0 ? `${label} ${array.toString()}` : "";
}

export default Vue.extend({
  components: {
    Multiselect,
  },
  data() {
    return {
      favoriteOptions: [IS_FAVORITE],
      showRecap: true,
    };
  },
  async created() {
    // fetch from the local store
    await filterStore.actions.fetchSearch();
  },
  computed: {
    ...filterMapper.mapState(["creatureOptions", "creatureFilter"]),
    tagsOptions(): string[] {
      return this.creatureOptions.tags;
    },
    environmentOptions(): string[] {
      return this.creatureOptions.environment;
    },
    organisationOptions(): string[] {
      return this.creatureOptions.organisation;
    },
    sizeOptions(): string[] {
      return this.creatureOptions.size;
    },
    crOptions(): number[] {
      return this.creatureOptions.cr;
    },
    typeOptions(): string[] {
      return this.creatureOptions.type;
    },
    systemOptions(): string[] {
      return this.creatureOptions.system;
    },
    sourceOptions(): string[] {
      return this.creatureOptions.source;
    },
    ...filterMapper.mapState(["creatureFilter", "creatureFilterResult"]),
    creatureCount(): number {
      return indexesStore.state.creatures.length;
    },
    filteredCount(): number {
      return this.creatureFilterResult.count;
    },
    recap(): string {
      const allOptions = [
        this.search,
        stringFilter(this.sourceFilter, "in"),
        stringFilter(this.environmentFilter, "from"),
        stringFilter(this.sizeFilter, "is"),
        stringFilter(this.tagsFilter, "with"),
        stringFilter(this.typeFilter, "is"),
        stringFilter(this.systemFilter, "for"),
        stringFilter(this.crFilter, "CR is"),
        // this.favoriteFilter.length > 0 ? "is favorite" : "",
      ];
      return allOptions.join(" ");
    },
    search: {
      get(): string {
        return filterStore.state.creatureFilter.search;
      },
      set(value: string): void {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          search: value,
        });
      },
    },
    sizeFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.size;
      },
      set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          size: value,
        });
      },
    },
    crFilter: {
      get(): number[] {
        return filterStore.state.creatureFilter.cr;
      },
      async set(value: number[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          cr: value,
        });
      },
    },
    tagsFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.tags;
      },
      async set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          tags: value,
        });
      },
    },
    systemFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.system;
      },
      async set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          system: value,
        });
      },
    },
    typeFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.type;
      },
      async set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          type: value,
        });
      },
    },
    environmentFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.environment;
      },
      async set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          environment: value,
        });
      },
    },
    sourceFilter: {
      get(): string[] {
        return filterStore.state.creatureFilter.source;
      },
      async set(value: string[]) {
        filterStore.actions.setCreatureFilter({
          ...this.creatureFilter,
          source: value,
        });
      },
    },
    // favoriteFilter: {
    //   get(): string[] {
    //     return filterStore.state.creatureFilter.favorite ? [IS_FAVORITE] : [];
    //   },
    //   async set(value: string[]) {
    //     await filterStore.actions.setFavorites(
    //       value.findIndex((v) => v === IS_FAVORITE) !== -1
    //     );
    //   },
    // },
  },
  methods: {
    filtersAreVisible(isVisible: boolean) {
      this.showRecap = !isVisible;
    },
  },
});
</script>
