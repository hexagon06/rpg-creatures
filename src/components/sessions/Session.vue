<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ session.title }}</h1>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ session.synopsis }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useSessionStore } from "@/store/gameSession";

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchSession(this.id);
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    ...mapState(useSessionStore, ["session"]),
    loading(): boolean {
      return this.session === undefined;
    },
  },
  methods: {
    async fetchSession(id: string) {
      const store = useSessionStore();
      await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
.bd-highlight {
  background-color: darken(#fff, 5);
}
</style>
