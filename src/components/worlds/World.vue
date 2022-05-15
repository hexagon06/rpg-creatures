<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h1>World data</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchWorld(this.id);
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    // ...mapState(useEncounterStore, ["encounter"]),
    // loading(): boolean {
    //   return this.encounter === undefined;
    // },
  },
  methods: {
    async fetchWorld(id: string) {
      // const store = useWorldStore();
      // await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
