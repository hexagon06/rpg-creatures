<template>
  <action-panel-filter>
    <div class="flex flex-col gap-3 justify-between">
      <input
        id="search-text"
        type="search"
        placeholder="Search"
        v-model="search"
        debounce="300"
        class="flex-grow"
      />
      <div
        class="flex flex-col gap-2"
        :class="showFilters ? '' : ' hidden md:block'"
      >
        <pill-multiselect
          id="size-filter"
          v-model="sizeFilter"
          :options="sizeOptions"
          placeholder="Size(s)"
        />
        <pill-multiselect
          id="type-filter"
          v-model="typeFilter"
          :options="typeOptions"
          placeholder="Type(s)"
        ></pill-multiselect>
        <pill-multiselect
          id="environment-filter"
          v-model="environmentFilter"
          :options="environmentOptions"
          placeholder="Environment(s)"
        ></pill-multiselect>
        <pill-multiselect
          id="tags-filter"
          v-model="tagsFilter"
          :options="tagsOptions"
          placeholder="Tag(s)"
        ></pill-multiselect>
        <pill-multiselect
          id="system-filter"
          v-model="systemFilter"
          :options="systemOptions"
          placeholder="System(s)"
        ></pill-multiselect>
        <pill-multiselect
          id="cr-filter"
          v-model="crFilter"
          :options="crOptions"
          placeholder="CR(s)"
        ></pill-multiselect>
        <pill-multiselect
          id="cr-filter"
          v-model="sourceFilter"
          :options="sourceOptions"
          placeholder="Source(s)"
        ></pill-multiselect>
      </div>
    </div>
    <template v-slot:buttons>
      <button
        @click="create"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
      <button
        @click="toggleFilters"
        class="button-round-large button-on-gold md:hidden"
        title="toggle filters"
      >
        <font-awesome-icon icon="fa-solid fa-filter" />
      </button>
    </template>
  </action-panel-filter>
</template>

<script lang="ts">
import { indexesStore } from "@/store";
import { useCreatureStore } from "@/store/creatures";
import { useFilterStore } from "@/store/filter";
import { mapState } from "pinia";
import Vue from "vue";
import InputWrapper from "../shared/InputWrapper.vue";

const IS_FAVORITE = "is favorite";

function stringFilter<T>(array: T[], label: string): string {
  return array.length > 0 ? `${label} ${array.toString()}` : "";
}

export default Vue.extend({
  components: { InputWrapper },
  data() {
    return {
      favoriteOptions: [IS_FAVORITE],
      showRecap: true,
      showFilters: false,
    };
  },
  async created() {
    // fetch from the local store
    await useFilterStore().fetchSearch();
  },
  computed: {
    ...mapState(useFilterStore, [
      "creatureOptions",
      "creatureFilter",
      "creatureFilter",
      "creatureFilterResult",
    ]),
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
        return useFilterStore().creatureFilter.search;
      },
      set(value: string): void {
        useFilterStore().$patch({
          creatureFilter: {
            ...this.creatureFilter,
            search: value,
          },
        });
      },
    },
    sizeFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.size;
      },
      set(value: string[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          size: value,
        });
      },
    },
    crFilter: {
      get(): number[] {
        return useFilterStore().creatureFilter.cr;
      },
      async set(value: number[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          cr: value,
        });
      },
    },
    tagsFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.tags;
      },
      async set(value: string[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          tags: value,
        });
      },
    },
    systemFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.system;
      },
      async set(value: string[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          system: value,
        });
      },
    },
    typeFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.type;
      },
      async set(value: string[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          type: value,
        });
      },
    },
    environmentFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.environment;
      },
      async set(value: string[]) {
        useFilterStore().setCreatureFilter({
          ...this.creatureFilter,
          environment: value,
        });
      },
    },
    sourceFilter: {
      get(): string[] {
        return useFilterStore().creatureFilter.source;
      },
      async set(value: string[]) {
        useFilterStore().setCreatureFilter({
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
    async create() {
      const id = await useCreatureStore().createCreature();
      this.$router.push(`/creature/${id}/edit`);
    },
    filtersAreVisible(isVisible: boolean) {
      this.showRecap = !isVisible;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
