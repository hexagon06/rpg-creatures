<template>
  <!-- caption-top < only works without sticky header -->
  <b-table
    hover
    striped
    responsive
    selectable
    select-mode="single"
    sticky-header="100%"
    :current-page="currentPage"
    :per-page="perPage"
    :items="creatures"
    :fields="fields"
    :filter="filter"
    :filter-function="filterFunction"
    @filtered="onFiltered"
    @row-selected="onRowSelected"
    class="creature-table"
  >
    <!-- for column templates: https://bootstrap-vue.org/docs/components/table#scoped-field-slots -->
    <template #cell(environment)="data">
      <array-pills :data="data.value" />
    </template>
    <template #cell(tags)="data">
      <array-pills :data="data.value" :variant="'badge-success'" />
    </template>
    <template #cell(alignment)="data">
      <array-pills :data="data.value" :variant="'badge-info'" />
    </template>
    <template #cell(image)="data">
      <b-img-lazy
        v-if="data.value"
        :src="data.value"
        rounded
        height="150px"
        width="150px"
      />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature } from "../../types/creatures";
import { BTable } from "bootstrap-vue";
import CreatureFilters from "./CreatureFilters.vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { creatureMapper } from "../../store/creatures";
import { creatureStore } from "../../store";
import { CreatureFilter, filterMapper } from "../../store/filter";
import { difference } from "lodash";

export default Vue.extend({
  components: {
    "b-table": BTable,
    "creature-filters": CreatureFilters,
    "array-pills": ArrayPills,
  },
  props: {
    creatures: {
      type: Array as PropType<Creature[]>,
      required: true,
    },
  },
  data() {
    // we could use RowDetails, to show more information https://bootstrap-vue.org/docs/components/table#row-details-support
    return {
      // https://bootstrap-vue.org/docs/components/table#field-definition-reference
      fields: [
        // { key: "id" },
        { key: "link" }, // needs formatter
        { key: "name", sortable: true, stickyColumn: true, isRowHeader: true },
        { key: "image" }, // needs formatter
        { key: "size" },
        { key: "type", sortable: true },
        { key: "cr", label: "CR", sortable: true },
        { key: "environment" }, // needs formatter
        { key: "tags" }, // needs formatter
        { key: "alignment" }, // needs formatter
        { key: "system" },
      ],
      filterFields: ["name", "type", "environment", "tags"],
    };
  },
  computed: {
    ...creatureMapper.mapState(["currentPage", "perPage"]),
    ...filterMapper.mapState(["search"]),
    ...filterMapper.mapGetters(["getFilter"]),
    filter(): CreatureFilter {
      return this.getFilter();
    },
  },
  methods: {
    filterFunction(data: Creature, filter: CreatureFilter): boolean {
      return (
        data.name.toLowerCase().includes(filter.search.toLowerCase()) &&
        valueIsInSet(data.size, filter.size) &&
        valueIsInSet(data.type, filter.type) &&
        valueIsInSet(data.type, filter.system) &&
        valueIsInSet(data.cr, filter.cr) &&
        valueContainsSet(data.environment, filter.environment) &&
        valueContainsSet(data.tags, filter.tags)
      );
    },
    onFiltered(filteredItems: Creature[]): void {
      // Trigger pagination to update the number of buttons/pages due to filtering
      creatureStore.mutations.setFilteredCount(filteredItems.length);
    },
    onRowSelected(items: Creature) {
      // this.selected = items;
    },
  },
});

function valueIsInSet<T>(value: T, filter: T[]): boolean {
  return filter.length === 0 || filter.indexOf(value) >= 0;
}

function valueContainsSet<T>(value: T[], filter: T[]): boolean {
  return filter.length === 0 || difference(filter, value).length === 0;
}
</script>

<style lang="scss" scoped>
.creature-table {
  margin-bottom: 0 !important;
}
img {
  object-fit: contain;
}
</style>
