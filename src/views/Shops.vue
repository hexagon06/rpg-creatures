<template>
  <div class="d-flex flex-column">
    <shop-sidebar id="sidebar-shop" v-model="sidebarShopOpen"></shop-sidebar>
    <!-- <div class="d-flex">
      <creature-filters class="flex-fill py-2" />
      
    </div> -->
    <!-- <create> </create> -->
    <div class="flex-1-1-0" style="overflow: auto">
      <shop-table
        :shops="shops"
        @select="selectShop"
        aria-controls="sidebar-shop"
        :aria-expanded="sidebarShopOpen"
      />
    </div>
    <!-- <creature-pagination /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Shop } from "@/types/shops";
import { shopStore } from "@/store";
import { shopMapper } from "@/store/shops";

export default Vue.extend({
  data() {
    return {
      loading: true,
      sidebarShopOpen: false,
    };
  },
  async created() {
    if (!shopStore.state.initialized) {
      await shopStore.actions.initialize();
    }
    this.loading = false;
  },
  computed: {
    ...shopMapper.mapState(["shops", "selectedShop"]),
  },
  methods: {
    async selectShop(data: Shop[]) {
      if (data.length === 0) {
        this.sidebarShopOpen = false;
        await shopStore.actions.setSelectedShop(undefined);
      } else if (data.length !== 1) {
        throw new Error(
          `unsupported amount of creatures selected (${data.length})`
        );
      } else if (
        this.selectedShop?.id !== data[0].id ||
        !this.sidebarShopOpen
      ) {
        await shopStore.actions.setSelectedShop(data[0].id);
        this.sidebarShopOpen = true;
      }
    },
  },
});
</script>
