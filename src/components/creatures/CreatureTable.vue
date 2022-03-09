<template>
  <!-- caption-top < only works without sticky header -->
  <table
    hover
    responsive
    selectable
    select-mode="single"
    sticky-header="100%"
    :current-page="currentPage"
    :per-page="perPage"
    :items="tableCreatures"
    :fields="fields"
    :filter="filter"
    :filter-function="filterFunction"
    @filtered="onFiltered"
    @row-selected="selectCreature"
    class="creature-table"
    ref="creatureTable"
  >
    <!-- <template #row> </template>
    <template #cell(id)="data">
      <router-link
        :to="{ name: 'Creature Details', params: { id: data.value } }"
      >
        <font-awesome-icon icon="fa-regular fa-pen-to-square"
      /></router-link>
    </template>
    <template #cell(link)="data">
      <a v-if="data && data.value" :href="data.value" target="_blank">
        <font-awesome-icon
          icon="fa-solid fa-arrow-up-right-from-square"
        ></font-awesome-icon>
      </a>
    </template>
    <template #cell(environment)="data">
      <array-pills :data="data.value" />
    </template>
    <template #cell(tags)="data">
      <array-pills :data="data.value" :variant="'badge-success'" />
    </template>
    <template #cell(image)="data">
      <thumbnail v-if="data.value" :url="data.value" />
    </template> -->
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { difference } from "lodash";
import { CreatureIndex } from "@/types/creatures";
import { filterMapper, filterStore } from "@/store";
import { CreatureFilter } from "@/types/filter";

export default Vue.extend({
  props: {
    creatures: {
      type: Array as PropType<CreatureIndex[]>,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "link" }, // needs formatter
        { key: "name", sortable: true, stickyColumn: true, isRowHeader: true },
        { key: "image" }, // needs formatter
        { key: "size" },
        { key: "type", sortable: true },
        { key: "cr", label: "CR", sortable: true },
        { key: "environment" }, // needs formatter
        { key: "tags" }, // needs formatter
        { key: "page", sortable: true },
        { key: "system" },
        { key: "id", label: "" },
      ],
      filterFields: ["name", "type", "environment", "tags"],
    };
  },
  computed: {
    ...filterMapper.mapState(["creatureFilter", "creatureFilterResult"]),
    ...filterMapper.mapGetters(["getFilter"]),
    filter(): CreatureFilter {
      return this.getFilter();
    },
    tableCreatures(): (CreatureIndex & { _rowVariant?: string })[] {
      return this.creatures.map((c) => {
        return { ...c, _rowVariant: c.favorite ? "warning" : undefined };
      });
    },
    currentPage(): number {
      return this.creatureFilterResult.currentPage;
    },
    perPage(): number {
      return this.creatureFilterResult.pageSize;
    },
  },
  methods: {
    filterFunction(data: CreatureIndex, filter: CreatureFilter): boolean {
      return (
        data.name.toLowerCase().includes(filter.search.toLowerCase()) &&
        valueIsInSet(data.size, filter.size) &&
        valueIsInSet(data.type, filter.type) &&
        valueIsInSet(data.system, filter.system) &&
        valueIsInSet(data.cr, filter.cr) &&
        valueContainsSet(data.environment, filter.environment) &&
        valueContainsSet(data.tags, filter.tags) &&
        valueIsInSet(data.source, filter.source) &&
        valueIsFilter(data.favorite, filter.favorite)
      );
    },
    onFiltered(filteredItems: CreatureIndex[]): void {
      // Trigger pagination to update the number of buttons/pages due to filtering
      filterStore.actions.setCreatureFilterResult({
        ...this.creatureFilterResult,
        count: filteredItems.length,
      });
    },
    selectCreature(items: CreatureIndex[]) {
      if (items.length > 0) {
        this.$emit("select", items);
        var table = this.$refs.creatureTable;
        if (table) {
          // we don't actually want to keep it selected, just nicely clickable
          // (table as BTable).clearSelected();
        }
      }
    },
  },
});

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
.creature-table {
  margin-bottom: 0 !important;
}
</style>
