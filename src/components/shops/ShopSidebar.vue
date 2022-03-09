<template>
  <div
    id="sidebar-shop"
    title="Shop-details"
    :no-header="shopIsSelected"
    :visible="value"
    @change="close"
    shadow
  >
    <shop-details v-if="shopIsSelected" v-model="selectedShop" :imgSize="278" />
    <p v-else>no shop is selected.</p>
    <!-- <template #footer="{ hide }">
      <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <edit-shop v-if="shopIsSelected" :shop="selectedShop" />
        <strong class="mr-auto"></strong>
        <button size="sm" @click="hide">Close</button>
      </div>
    </template> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { shopMapper } from "@/store/shops";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...shopMapper.mapState(["selectedShop"]),
    shopIsSelected(): boolean {
      return this.selectedShop !== undefined;
    },
  },
  methods: {
    close(value: boolean) {
      this.$emit("input", value);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
