<template>
  <div
    id="sidebar-ability"
    title="Ability-details"
    :no-header="abilityIsSelected"
    :visible="value"
    @change="close"
    shadow
  >
    <ability-details
      v-if="abilityIsSelected"
      v-model="selectedAbility"
      :imgSize="278"
    />
    <p v-else>no ability is selected.</p>
    <!-- <template #footer="{ hide }">
      <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <edit-ability v-if="abilityIsSelected" :ability="selectedAbility" />
        <strong class="mr-auto"></strong>
        <button size="sm" @click="hide">Close</button>
      </div>
    </template> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { abilityMapper } from "@/store/abilities";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...abilityMapper.mapState(["selectedAbility"]),
    abilityIsSelected(): boolean {
      return this.selectedAbility !== undefined;
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
