<template>
  <action-panel-filter>
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
import { useListStore } from "@/store/rollingLists";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      showFilters: false,
    };
  },
  methods: {
    async create() {
      const id = await useListStore().createList();
      this.$router.push(`/list/${id}/edit`);
    },
    toggleFilters() {
      this.showFilters != this.showFilters
    }
  },
});
</script>

<style lang="scss" scoped>
</style>
