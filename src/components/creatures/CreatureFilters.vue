<template>
  <div class="container-fluid d-flex">
    <b-button v-b-toggle.filters variant="primary"
      >Filters
      <span v-if="filterCount">({{ filteredCount }}/{{ creatureCount }})</span>
    </b-button>
    <b-collapse id="filters" v-b-visible="filtersAreVisible">
      <div class="d-flex flex-wrap justify-content-start mx-2">
        <div class="mr-2">
          <label for="search-text">Name:</label>
          <b-form-input
            id="search-text"
            type="search"
            placeholder="Search"
            v-model="search"
            debounce="300"
          ></b-form-input>
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
        <div class="mr-2">
          <label for="favorite-filter">Favorite:</label>
          <pill-multiselect
            id="favorite-filter"
            v-model="favoriteFilter"
            :options="favoriteOptions"
          ></pill-multiselect>
        </div>
      </div>
    </b-collapse>
    <span v-if="showRecap" class="align-self-center ml-2 text-info">{{
      recap
    }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { creatureStore, filterStore } from "../../store";
import { filterMapper } from "../../store/filter";
import { Multiselect } from "vue-multiselect";
import ArrayPills from "../shared/ArrayPills.vue";
import PillMultiselect from "../shared/PillMultiselect.vue";
import { creatureMapper } from "@/store/creatures";

const IS_FAVORITE = "is favorite";

function stringFilter<T>(array: T[], label: string): string {
  return array.length > 0 ? `${label} ${array.toString()}` : "";
}

export default Vue.extend({
  components: {
    Multiselect,
    ArrayPills,
    "pill-multiselect": PillMultiselect,
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
    ...filterMapper.mapState([
      "sizeOptions",
      "crOptions",
      "typeOptions",
      "tagsOptions",
      "systemOptions",
      "environmentOptions",
      "sourceOptions",
    ]),
    ...creatureMapper.mapState(["filteredCount"]),
    creatureCount(): number {
      return creatureStore.state.creatures.length;
    },
    filterCount(): number {
      return this.creatureCount - this.filteredCount;
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
        this.favoriteFilter.length > 0 ? "is favorite" : "",
      ];
      return allOptions.join(" ");
    },
    search: {
      get(): string {
        return filterStore.state.search;
      },
      set(value: string): void {
        filterStore.actions.setSearch(value);
      },
    },
    sizeFilter: {
      get(): string[] {
        return filterStore.state.sizeSelection;
      },
      set(value: string[]) {
        return filterStore.actions.setSizes(value);
      },
    },
    crFilter: {
      get(): number[] {
        return filterStore.state.crSelection;
      },
      async set(value: number[]) {
        await filterStore.actions.setCR(value);
      },
    },
    tagsFilter: {
      get(): string[] {
        return filterStore.state.tagsSelection;
      },
      async set(value: string[]) {
        await filterStore.actions.setTags(value);
      },
    },
    systemFilter: {
      get(): string[] {
        return filterStore.state.systemSelection;
      },
      async set(value: string[]) {
        await filterStore.actions.setSystems(value);
      },
    },
    typeFilter: {
      get(): string[] {
        return filterStore.state.typeSelection;
      },
      async set(value: string[]) {
        await filterStore.actions.setTypes(value);
      },
    },
    environmentFilter: {
      get(): string[] {
        return filterStore.state.environmentSelection;
      },
      async set(value: string[]) {
        await filterStore.actions.setEnvironments(value);
      },
    },
    sourceFilter: {
      get(): string[] {
        return filterStore.state.sourceSelection;
      },
      async set(value: string[]) {
        await filterStore.actions.setSources(value);
      },
    },
    favoriteFilter: {
      get(): string[] {
        return filterStore.state.favoriteSelection ? [IS_FAVORITE] : [];
      },
      async set(value: string[]) {
        await filterStore.actions.setFavorites(
          value.findIndex((v) => v === IS_FAVORITE) !== -1
        );
      },
    },
  },
  methods: {
    filtersAreVisible(isVisible: boolean) {
      this.showRecap = !isVisible;
    },
  },
});
</script>
