<template>
  <div>
    <div class="flex flex-col gap-3 justify-between pr-2 -ml-2">
      <div>Encounters filter</div>
    </div>
    <div class="absolute -bottom-4 left-24 right-2 flex gap-3 justify-center">
      <button
        @click="create"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useEncounterStore } from "@/store/encounters";
import Vue from "vue";
export default Vue.extend({
  methods: {
    async create() {
      const id = await useEncounterStore().createEncounter();
      this.$router.push(`/encounter/${id}/edit`);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
