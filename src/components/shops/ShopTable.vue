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
    :items="tableShops"
    :fields="fields"
    :filter="filter"
    :filter-function="filterFunction"
    @filtered="onFiltered"
    @row-selected="selectShop"
    class="shop-table"
    ref="shopTable"
  >
    <!-- <template #cell(link)="data">
      <a v-if="data && data.value" :href="data.value" target="_blank">
        <font-awesome-icon
          icon="fa-solid fa-arrow-up-right-from-square"
        ></font-awesome-icon>
      </a>
    </template>
    <template #cell(image)="data">
      <thumbnail v-if="data.value" :url="data.value" />
    </template> -->
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Shop, ShopFilter } from "@/types/shops";

export default Vue.extend({
  props: {
    shops: {
      type: Array as PropType<Shop[]>,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        // { key: "id" },
        { key: "link" }, // needs formatter
        { key: "name", sortable: true, stickyColumn: true, isRowHeader: true },
        { key: "image" }, // needs formatter
        { key: "location", sortable: true },
        { key: "speciality", sortable: true },
      ],
      filterFields: ["name", "type", "environment", "tags"],
    };
  },
  computed: {
    // ...creatureMapper.mapState(["currentPage", "perPage"]),
    // ...filterMapper.mapState(["search"]),
    // ...filterMapper.mapGetters(["getFilter"]),
    // filter(): CreatureFilter {
    //   return this.getFilter();
    // },
    // tableShops(): (Shop & { _rowVariant?: string })[] {
    //   return this.shops;
    // },
  },
  methods: {
    filterFunction(data: Shop, filter: ShopFilter): boolean {
      return data.name.toLowerCase().includes(filter.search.toLowerCase()); // &&
    },
    onFiltered(filteredItems: Shop[]): void {
      // Trigger pagination to update the number of buttons/pages due to filtering
      // creatureStore.mutations.setFilteredCount(filteredItems.length);
    },
    selectShop(items: Shop[]) {
      if (items.length > 0) {
        this.$emit("select", items);
        var table = this.$refs.shopTable;
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
.shop-table {
  margin-bottom: 0 !important;
}
</style>
