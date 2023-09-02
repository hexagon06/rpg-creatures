<template>
  <action-panel-filter>
    <input id="search-text"
           type="search"
           placeholder="Search"
           v-model="listFilter.search"
           debounce="300"
           class="flex-grow" />
    <template v-slot:buttons>
      <button @click="create"
              class="button-round-large button-on-gold"
              title="create">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </template>
  </action-panel-filter>
</template>

<script lang="ts">
import { useFilterStore } from "@/store/filter";
import { useListStore } from "@/store/rollingLists";
import { mapWritableState } from "pinia";

import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    ...mapWritableState(useFilterStore, ["listFilter"]),
  },
  methods: {
    async create() {
      const id = await useListStore().createList();
      this.$router.push(`/list/${id}/edit`);
    },
  },
});
</script>

<style lang="scss" scoped></style>
