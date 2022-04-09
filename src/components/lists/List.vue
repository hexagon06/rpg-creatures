<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ rollingList.name }}</h1>
    </div>
    <!-- description card -->
    <div class="m-3 text-left">
      <ul>
        <li v-for="(item, i) in sortedItems" :key="i" class="flex gap-2">
          <span class="flex-grow">
            <router-link
              v-if="item.reference && item.reference.id"
              :to="{
                name: item.reference.routerName,
                params: { id: item.reference.id },
              }"
              class="encounter-link link"
              >{{ item.label }}
            </router-link>
            <a
              v-else-if="item.reference"
              :href="item.reference"
              target="_blank"
              >{{ item.label }}</a
            >
            <span v-else>{{ item.label }}</span>
          </span>
          <span v-if="item.weight !== 1" title="weight">{{ item.weight }}</span>
          <span class="w-6">
            <font-awesome-icon
              v-if="item.repeatable"
              icon="fa-solid fa-repeat"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useListStore } from "@/store/rollingLists";
import { sortBy } from "lodash";
import { ReferenceListItem, RollingListItem } from "@/types";

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchList(this.id);
  },
  watch: {
    id: "fetchList",
  },
  computed: {
    ...mapState(useListStore, ["rollingList"]),
    loading(): boolean {
      return this.rollingList === undefined;
    },
    sortedItems(): (ReferenceListItem & RollingListItem)[] {
      if (this.rollingList === undefined) return [];
      return sortBy(this.rollingList.items, (i) => i.order);
    },
  },
  methods: {
    async fetchList(id: string) {
      const store = useListStore();
      await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
.bd-highlight {
  background-color: darken(#fff, 5);
}
a,
a.encounter-link {
  font-weight: bold;
  color: #d1b74d;
  &:hover {
    color: lighten(#d1b74d, 10);
  }

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
