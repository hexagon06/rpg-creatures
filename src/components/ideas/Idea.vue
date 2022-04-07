<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ idea.title }}</h1>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ idea.synopsis }}
      </p>
    </div>
    <!-- description card -->
    <div class="m-3 text-left">
      <label v-if="idea.category !== undefined">{{ idea.category }}</label>
      <div>
        <v-md-preview :text="idea.text" :default-show-toc="true"></v-md-preview>
      </div>
      <div v-if="idea.tags && idea.tags.length > 0">
        <array-pills :data="idea.tags"></array-pills>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useIdeaStore } from "@/store/ideas";

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchIdea(this.id);
  },
  watch: {
    id: "fetchIdea",
  },
  computed: {
    ...mapState(useIdeaStore, ["idea"]),
    loading(): boolean {
      return this.idea === undefined;
    },
  },
  methods: {
    async fetchIdea(id: string) {
      const store = useIdeaStore();
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
