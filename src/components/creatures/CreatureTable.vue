<template>
  <!-- caption-top < only works without sticky header -->
  <b-table
    hover
    striped
    responsive
    selectable
    select-mode="single"
    sticky-header="80%"
    :current-page="currentPage"
    :per-page="perPage"
    :items="creatures"
    :fields="fields"
    :filter="filter"
    :filter-function="filterFunction"
    @filtered="onFiltered"
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
        // {key: "link"}, // needs formatter
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
    ...creatureMapper.mapState(["search", "currentPage", "perPage"]),
    filter(): string {
      return this.search;
    },
  },
  methods: {
    filterFunction(data: Creature, filter: string): boolean {
      return data.name.toLowerCase().includes(filter.toLowerCase());
    },
    onFiltered(filteredItems: Creature[]): void {
      // Trigger pagination to update the number of buttons/pages due to filtering
      creatureStore.mutations.setFilteredCount(filteredItems.length);
    },
  },
});
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
}
</style>
