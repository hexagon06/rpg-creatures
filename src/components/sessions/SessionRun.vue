<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <running-information />
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <h1>{{ session.title }} run</h1>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ session.synopsis }}
      </p>
      <component
        v-for="(section, i) in sortedSections"
        :key="'section' + i + '_' + section.id"
        :value="section"
        :is="componentByType(section.prepType)"
        class=""
      ></component>
      <h3>Notes</h3>
      <v-md-editor v-model="sessionRun.notes" height="800px"></v-md-editor>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";
import { mapState } from "pinia";
import { useSessionStore } from "@/store/gameSession";
import { PrepSection, PrepType, RunSection } from "@/types";
import { debounce, sortBy } from "lodash";

const debouncedSave = debounce(
  async () => {
    console.log("got in debounce");

    await useSessionStore().saveRun();
  },
  1000,
  { maxWait: 5000 }
);

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
    runId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isSaving: false,
    };
  },
  async created() {
    await this.fetchSession(this.id);
    this.fetchRun(this.id, this.runId);
  },
  watch: {
    id: "fetchEncounter",
    sessionRun: {
      handler: () => {
        debouncedSave();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(useSessionStore, ["session", "sessionRun"]),
    loading(): boolean {
      return this.session === undefined || this.sessionRun === undefined;
    },
    runSections(): RunSection[] {
      if (this.sessionRun === undefined) return [];
      const run = this.sessionRun;
      return run.sections.map((s) => {
        const listState = run.listStates.find(
          (state) => state.sortOrder === s.sortOrder
        );
        console.log("checking");
        if (listState) {
          console.log("return replacement");

          return listState;
        }
        return s;
      });
    },
    sortedSections(): RunSection[] {
      // replace with one with a different type if it is also added to listStates
      if (this.session) {
        return sortBy(this.runSections, (s) => s.sortOrder);
      }
      return [];
    },
  },
  methods: {
    async fetchSession(id: string) {
      const store = useSessionStore();
      await store.fetch(id);
    },
    async fetchRun(sessionId: string, runId: string) {
      const store = useSessionStore();
      await store.fetchRun(sessionId, runId);
    },
    componentByType(type: RunSection["prepType"]) {
      switch (type) {
        case "player-characters":
          return "section-player-characters";
        case "list":
          return "section-list";
        case "list-run":
          return "section-run-list";
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
</style>
