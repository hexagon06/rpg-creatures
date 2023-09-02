<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <running-information />
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ session.title }}</h1>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ session.synopsis }}
      </p>
      <component v-for="(section, i) in sortedSections"
                 :key="'section' + i + '_' + section.id"
                 :value="section"
                 :is="componentByType(section.prepType)"
                 class=""></component>
    </div>
  </div>
</template>

<script lang="ts">

import ArrayPills from "../shared/ArrayPills.vue";
// import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useSessionStore } from "@/store/gameSession";
import { PrepSection, PrepType } from "@/types";
import { sortBy } from "lodash";

import { defineComponent } from 'vue'
export default defineComponent({
  components: { ArrayPills, },
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
    sortedSections(): PrepSection[] {
      if (this.session) {
        return sortBy(this.session.sections, (s) => s.sortOrder);
      }
      return [];
    },
  },
  methods: {
    async fetchSession(id: string) {
      const store = useSessionStore();
      await store.fetch(id);
    },
    componentByType(type: PrepType) {
      switch (type) {
        case "player-characters":
          return "section-player-characters";
        case "list":
          return "section-list";
        case "text":
          return "section-text";
        case "chapter":
          return "section-chapter";
        case "image":
          return "section-image";
        case "link":
          return "section-link";
        default:
          throw new Error(`No component for type '${type}'`);
      }
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
