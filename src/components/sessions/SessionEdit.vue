<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form
      novalidate
      :validated="validated"
      ref="form"
      class="flex flex-col gap-3"
    >
      <input-wrapper
        label="Session Title"
        validation="Invalid title"
        :is-valid="sessionForm.title && sessionForm.title.length > 0"
      >
        <input
          id="input-1"
          v-model="sessionForm.title"
          placeholder="Enter title"
          aria-describedby="password-help-block"
          required
        />
        <template v-slot:help>
          Use a descriptive title to label the Session.
        </template>
      </input-wrapper>
      <input-wrapper
        label="Synopsis"
        validation="Synopsis is required"
        :is-valid="sessionForm.synopsis && sessionForm.synopsis.length > 0"
      >
        <input
          id="input-synopsis"
          v-model="sessionForm.synopsis"
          placeholder="A short story"
          aria-describedby="synopsis-help-block"
          required
        />
        <template v-slot:help>
          One or two short sentences describing the session
        </template>
      </input-wrapper>
      <hr />
      <div
        v-for="(section, i) in sortedSections"
        :key="'section' + i + '_' + section.id"
        class="flex gap-3"
      >
        <div class="flex flex-col gap-1">
          <button
            @click="moveSection(section.sortOrder, 'up')"
            class="button-round button-on-rouge"
            title="move up"
            :disabled="section.sortOrder === 0"
          >
            <font-awesome-icon icon="fa-solid fa-angle-up" />
          </button>
          <button
            @click="moveSection(section.sortOrder, 'down')"
            class="button-round button-on-rouge"
            title="move down"
            :disabled="section.sortOrder === sortedSections.length - 1"
          >
            <font-awesome-icon icon="fa-solid fa-angle-down" />
          </button>
        </div>
        <component
          :value="section"
          :is="componentByType(section.prepType)"
          class="flex-grow"
        ></component>
        <button
          @click="removeSection(section.sortOrder)"
          class="button-round button-on-rouge"
          :title="'remove ' + section.prepType"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
      </div>
      <div class="flex gap-2 justify-end">
        <button
          v-for="button in sectionButtons"
          :key="'add_section_' + button.type"
          @click="addSection(button.type)"
          class="button-round-large button-on-brown"
          :title="button.title"
        >
          <font-awesome-icon :icon="button.icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useSessionStore } from "@/store/gameSession";
import Vue from "vue";
import { Multiselect } from "vue-multiselect";
import { mapWritableState } from "pinia";
import { PrepSection, PrepType } from "@/types";
import { sortBy } from "lodash";
import { prepSectionFactory } from "./factory";
import { useIndexesStore } from "@/store/indexes";

type SectionButtons = {
  title: string;
  type: PrepType;
  icon: string;
};

export default Vue.extend({
  components: { Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      saving: false,
      validated: false,
      sectionButtons: [
        { title: "image", type: "image", icon: "fa-solid fa-image" },
        {
          title: "player-characters",
          type: "player-characters",
          icon: "fa-solid fa-user-plus",
        },
        { title: "list", type: "list", icon: "fa-solid fa-list" },
        { title: "text", type: "text", icon: "fa-solid fa-align-left" },
        {
          title: "chapter title",
          type: "chapter",
          icon: "fa-solid fa-heading",
        },
        { title: "link", type: "link", icon: "fa-solid fa-link" },
      ] as SectionButtons[],
    };
  },
  async mounted() {
    const store = useSessionStore();
    if (!store.session || store.session.id !== this.id) {
      await store.fetch(this.id);
    }
    await store.startEdit();
  },
  computed: {
    ...mapWritableState(useSessionStore, ["sessionForm"]),
    sortedSections(): PrepSection[] {
      if (this.sessionForm) {
        return sortBy(this.sessionForm.sections, (s) => s.sortOrder);
      }
      return [];
    },
    loading(): boolean {
      return (
        !useIndexesStore().initialized ||
        useSessionStore().sessionForm === undefined
      );
    },
  },
  methods: {
    addSection(type: PrepType) {
      const section = prepSectionFactory.create(type);
      section.sortOrder = this.sortedSections.length;
      if (this.sessionForm) {
        this.sessionForm.sections = this.sessionForm.sections.concat([section]);
      }
    },
    componentByType(type: PrepType) {
      switch (type) {
        case "player-characters":
          return "section-edit-player-characters";
        case "list":
          return "section-edit-list";
        case "text":
          return "section-edit-text";
        case "chapter":
          return "section-edit-chapter";
        case "image":
          return "section-edit-image";
        case "link":
          return "section-edit-link";
        default:
          throw new Error(`No component for type '${type}'`);
      }
    },
    removeSection(sortOrder: number) {
      const before =
        sortOrder === 0 ? [] : this.sortedSections.slice(0, sortOrder);
      const after = this.sortedSections.slice(sortOrder + 1);
      after.forEach((s) => s.sortOrder--);
      const newSections = before.concat(after);

      if (this.sessionForm) {
        this.sessionForm.sections = newSections;
      }
    },
    moveSection(sortOrder: number, direction: "up" | "down") {
      if (
        (sortOrder > 0 || sortOrder < this.sortedSections.length - 1) &&
        this.sessionForm
      ) {
        if (direction === "up") {
          const before = this.sessionForm.sections.find(
            (s) => s.sortOrder === sortOrder - 1
          );
          const target = this.sessionForm.sections.find(
            (s) => s.sortOrder === sortOrder
          );
          before!.sortOrder++;
          target!.sortOrder--;
        } else if (direction === "down") {
          const before = this.sessionForm.sections.find(
            (s) => s.sortOrder === sortOrder + 1
          );
          const target = this.sessionForm.sections.find(
            (s) => s.sortOrder === sortOrder
          );
          before!.sortOrder--;
          target!.sortOrder++;
        } else throw new Error(`direction '${direction}' is invalid`);
      } else {
        console.warn(`cannot move ${direction}`);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  color: black;
}
</style>
