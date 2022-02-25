<template>
  <div class="d-flex">
    <div class="sidebar border-right border-info pt-3">
      <div>
        <b-button variant="primary" @click="createEncounter">Create</b-button>
      </div>
      <div class="d-flex flex-column">
        <!-- navlins & router.push -->
        <router-link
          v-for="encounter in encounters"
          :key="encounter.id"
          :title="encounter.synopsis"
          :to="{ name: 'Encounter', params: { id: encounter.id } }"
          class="flex-row encounter-link"
          >{{ encounter.name }}
        </router-link>
      </div>
    </div>
    <div class="flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { encounterMapper, encounterStore, indexesMapper } from "@/store";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...indexesMapper.mapState(["encounters"]),
  },
  methods: {
    ...encounterMapper.mapActions(["createEncounter"]),
    async create() {
      await this.createEncounter();
      if (encounterStore.state.encounter?.id) {
        this.$router.push({
          path: "encounter",
          params: { id: encounterStore.state.encounter.id },
        });
      } else {
        throw Error("encounter should have been set");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  min-width: $sidebar-width;
  background: darken($color: white, $amount: 2);
}

a.encounter-link {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
