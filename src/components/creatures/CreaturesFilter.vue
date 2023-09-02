<template>
  <action-panel-filter>
    <div class="flex flex-col gap-3 justify-between">
      <input id="search-text"
             v-model="search"
             type="search"
             placeholder="Search"
             debounce="300"
             class="flex-grow" />
      <div class="flex flex-col gap-2"
           :class="showFilters ? '' : ' hidden md:block'">
        <pill-multiselect id="size-filter"
                          v-model="sizeFilter"
                          :options="sizeOptions"
                          placeholder="Size(s)" />
        <pill-multiselect id="type-filter"
                          v-model="typeFilter"
                          :options="typeOptions"
                          placeholder="Type(s)" />
        <pill-multiselect id="environment-filter"
                          v-model="environmentFilter"
                          :options="environmentOptions"
                          placeholder="Environment(s)" />
        <pill-multiselect id="tags-filter"
                          v-model="tagsFilter"
                          :options="tagsOptions"
                          placeholder="Tag(s)" />
        <pill-multiselect id="system-filter"
                          v-model="systemFilter"
                          :options="systemOptions"
                          placeholder="System(s)" />
        <pill-multiselect id="cr-filter"
                          v-model="crFilter"
                          :options="crOptions"
                          placeholder="CR(s)" />
        <pill-multiselect id="cr-filter"
                          v-model="sourceFilter"
                          :options="sourceOptions"
                          placeholder="Source(s)" />
      </div>
    </div>
    <template v-slot:buttons>
      <button class="button-round-large button-on-gold"
              title="create"
              @click="create">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
      <button class="button-round-large button-on-gold md:hidden"
              title="toggle filters"
              @click="toggleFilters">
        <font-awesome-icon icon="fa-solid fa-filter" />
      </button>
      <button class="button-round-large button-on-gold"
              title="create list"
              @click="createList()">
        <font-awesome-icon icon="fa-solid fa-list" />
      </button>
    </template>
    <transition>
      <form v-if="isCreatingList"
            @submit.stop.prevent="createList(true)">
        <modal :is-valid="listName.length > 0"
               class="text-white"
               @reject="createList(false)">
          <div class="w-52 flex flex-col gap-1 text-dark-blue">
            <p>Creating a list for {{ filteredCreatures.length }} creatures!</p>
            <input id="input-1"
                   v-model="listName"
                   type="text"
                   placeholder="List name"
                   required
                   class="rounded-t-lg" />
          </div>
        </modal>
      </form>
    </transition>
  </action-panel-filter>
</template>

<script lang="ts">
import { useCreatureStore } from "@/store/creatures";
import { useFilterStore } from "@/store/filter";
import { useIndexesStore } from "@/store/indexes";
import { useListStore } from "@/store/rollingLists";
import { getRollingListItem, RollingListItem } from "@/types";
import { mapState } from "pinia";

import InputWrapper from "../shared/InputWrapper.vue";

const IS_FAVORITE = "is favorite";

function stringFilter<T>(array: T[], label: string): string {
  return array.length > 0 ? `${label} ${array.toString()}` : "";
}

import { defineComponent } from 'vue'
export default defineComponent({
  components: { InputWrapper },
  data() {
    return {
      favoriteOptions: [IS_FAVORITE],
      showRecap: true,
      showFilters: false,
      isCreatingList: false,
      listName: "",
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
      "filteredCreatures",
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
    async createList(accept?: boolean) {
      console.log("create", accept);

      if (accept === undefined) {
        this.listName = "";
        this.isCreatingList = true;
      } else if (accept) {
        const listId = await useListStore().createList();
        const list = useListStore().rollingList;
        if (list) {
          list.name = this.listName;
          list.items = this.filteredCreatures.map((c, i) => {
            const li = getRollingListItem(i);
            li.id += i; // because we may create them in  1 ms
            li.label = `CR${c.cr ?? "?"} ${c.name}`;
            li.order = i;
            li.repeatable = false;
            li.reference = {
              routerName: "Creature",
              id: c.id,
            };
            return li;
          });
          await useListStore().save(list);
          this.$router.push(`/list/${listId}/edit`);
        }
      } else {
        this.isCreatingList = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
