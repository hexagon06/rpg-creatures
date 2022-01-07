<template>
  <div class="container-fluid d-flex">
    <b-button v-b-toggle.filters variant="primary">Filters</b-button>
    <b-collapse id="filters">
      <div class="row">
        <div class="col-sm-12 col-md-3">
          <label for="search-text">Search:</label>
          <b-form-input
            id="search-text"
            type="search"
            v-model="search"
            debounce="300"
          ></b-form-input>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="size-filter">Size:</label>
          <b-form-select
            id="size-filter"
            v-model="sizeFilter"
            :options="sizeOptions"
            multiple
          ></b-form-select>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="type-filter">Type:</label>
          <b-form-select
            id="type-filter"
            v-model="typeFilter"
            :options="typeOptions"
            multiple
          ></b-form-select>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="environment-filter">Environment:</label>
          <b-form-select
            id="environment-filter"
            v-model="environmentFilter"
            :options="environmentOptions"
            multiple
          ></b-form-select>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="tags-filter">Tags:</label>
          <b-form-select
            id="tags-filter"
            v-model="tagsFilter"
            :options="tagsOptions"
            multiple
          ></b-form-select>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="system-filter">System:</label>
          <b-form-select
            id="system-filter"
            v-model="systemFilter"
            :options="systemOptions"
            multiple
          ></b-form-select>
        </div>
        <div class="col-sm-12 col-md-3">
          <label for="cr-filter">CR:</label>
          <b-form-select
            id="cr-filter"
            v-model="crFilter"
            :options="crOptions"
            multiple
          ></b-form-select>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { filterStore } from "../../store";
import { filterMapper } from "../../store/filter";

export default Vue.extend({
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
    ]),
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
  },
});
</script>

<style lang="scss" scoped>
</style>
