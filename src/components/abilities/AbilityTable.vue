<template>
  <!-- caption-top < only works without sticky header -->
  <table
    hover
    responsive
    selectable
    select-mode="single"
    sticky-header="100%"
    :items="tableAbilities"
    :fields="fields"
    @row-selected="selectAbility"
    class="ability-table"
    ref="abilityTable"
  >
    <!-- <template #cell(tags)="data">
      <array-pills :data="data.value" :variant="'badge-success'" />
    </template> -->
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { filterMapper } from "@/store";
import { Ability } from "@/types/abilities";

export default Vue.extend({
  props: {
    abilities: {
      type: Array as PropType<Ability[]>,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        // { key: "id" },
        { key: "name", sortable: true, stickyColumn: true, isRowHeader: true },
        { key: "type", sortable: true },
        { key: "tags" },
      ],
      filterFields: ["name", "type", "environment", "tags"],
    };
  },
  computed: {
    // ...filterMapper.mapState(["search"]),
    ...filterMapper.mapGetters(["getFilter"]),
    tableAbilities(): (Ability & { _rowVariant?: string })[] {
      return this.abilities;
    },
  },
  methods: {
    // filterFunction(data: Ability, filter: AbilityFilter): boolean {
    //   return data.name.toLowerCase().includes(filter.search.toLowerCase()); // &&
    // },

    selectAbility(items: Ability[]) {
      if (items.length > 0) {
        this.$emit("select", items);
        var table = this.$refs.abilityTable;
        if (table) {
          // we don't actually want to keep it selected, just nicely clickable
          // (table as BTable).clearSelected();
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.ability-table {
  margin-bottom: 0 !important;
}
</style>
