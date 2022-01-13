<template>
  <!-- caption-top < only works without sticky header -->
  <b-table
    hover
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
    @row-selected="selectCreature"
    class="creature-table"
    ref="creatureTable"
  >
    <!-- for column templates: https://bootstrap-vue.org/docs/components/table#scoped-field-slots -->
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
    <template #cell(alignment)="data">
      <alignment :values="data.value" />
    </template>
    <template #cell(image)="data">
      <thumbnail v-if="data.value" :url="data.value" />
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
import Thumbnail from "./Thumbnail.vue";
import Alignment from "./Alignment.vue";

export default Vue.extend({
  components: {
    "b-table": BTable,
    "creature-filters": CreatureFilters,
    "array-pills": ArrayPills,
    Thumbnail,
    Alignment,
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
        { key: "page", sortable: true },
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
        valueIsInSet(data.system, filter.system) &&
        valueIsInSet(data.cr, filter.cr) &&
        valueContainsSet(data.environment, filter.environment) &&
        valueContainsSet(data.tags, filter.tags) &&
        valueIsInSet(data.source, filter.source) &&
        valueIsFilter(data.favorite, filter.favorite)
      );
    },
    onFiltered(filteredItems: Creature[]): void {
      // Trigger pagination to update the number of buttons/pages due to filtering
      creatureStore.mutations.setFilteredCount(filteredItems.length);
    },
    selectCreature(items: Creature[]) {
      if (items.length > 0) {
        this.$emit("select", items);
        var table = this.$refs.creatureTable;
        if (table) {
          // we don't actually want to keep it selected, just nicely clickable
          (table as BTable).clearSelected();
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
