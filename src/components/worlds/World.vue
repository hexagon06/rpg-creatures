<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="world">
    <h1>{{ world.name }}</h1>
  </div>
  <div v-else>No world found.</div>
</template>

<script lang="ts">
import { useWorldStore } from "@/store/worlds";
import { mapActions, mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  async created() {
    await this.fetchWorld(this.id);
  },
  watch: {
    id: "fetchWorld",
  },
  computed: {
    ...mapState(useWorldStore, ["world"]),
  },
  methods: {
    ...mapActions(useWorldStore, ["fetch"]),
    async fetchWorld(id: string) {
      this.loading = true;
      await this.fetch(id);
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
