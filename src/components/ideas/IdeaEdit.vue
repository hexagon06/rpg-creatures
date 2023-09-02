<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form novalidate
          :validated="validated"
          ref="form"
          @submit.stop.prevent="() => { }">
      <div class="m-3 text-left">
        <div class="flex flex-col gap-3">
          <input-wrapper label="Idea Title"
                         validation="Invalid title"
                         :is-valid="ideaForm.title && ideaForm.title.length > 0">
            <input id="input-1"
                   v-model="ideaForm.title"
                   placeholder="Enter title"
                   required>
            <template v-slot:help> Give the idea a title </template>
          </input-wrapper>
          <input-wrapper label="Synopsis"
                         validation="Synopsis is required"
                         :is-valid="ideaForm.synopsis && ideaForm.synopsis.length > 0">
            <input id="input-synopsis"
                   v-model="ideaForm.synopsis"
                   placeholder="A short story"
                   aria-describedby="synopsis-help-block"
                   required>
            <template v-slot:help>
              One or two short sentences describing the idea
            </template>
          </input-wrapper>
          <input-wrapper label="Text">
            <v-md-editor v-model="ideaForm.text"
                         height="400px" />
          </input-wrapper>
          <input-wrapper label="Tags">
            <pill-multiselect id="input-tags"
                              v-model="ideaForm.tags"
                              :options="tagsOptions"
                              :taggable="true"
                              @tag="tagTag"
                              placeholder="Select size(s)" />
          </input-wrapper>
          <input-wrapper label="Category">
            <multi-select id="input-type"
                          v-model="ideaForm.category"
                          :options="categoryOptions"
                          :show-labels="false"
                          placeholder="Select category"
                          :taggable="true"
                          @tag="createCategory($event)" />
            {{ ideaForm.category }}
          </input-wrapper>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useIdeaStore } from "@/store/ideas";

// import { Multiselect } from "vue-multiselect";
import { mapState, mapWritableState } from "pinia";
import { useFilterStore } from "@/store/filter";
import { useIndexesStore } from "@/store/indexes";
import MultiSelect from 'primevue/multiselect';

import { defineComponent } from 'vue'
export default defineComponent({
  components: { MultiSelect },
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
    };
  },
  async mounted() {
    await this.loadIdea();
  },
  computed: {
    ...mapWritableState(useIdeaStore, ["ideaForm"]),
    ...mapState(useFilterStore, ["ideaOptions"]),
    tagsOptions(): string[] {
      return this.ideaOptions.tags;
    },
    categoryOptions(): string[] {
      return this.ideaOptions.categories;
    },
    loading(): boolean {
      return (
        !useIndexesStore().initialized || useIdeaStore().ideaForm === undefined
      );
    },
  },
  watch: {
    id: "loadIdea",
  },
  methods: {
    async tagTag(newTag: string) {
      await useFilterStore().addIdeaTag(newTag);
      this.ideaForm!.tags.push(newTag);
    },
    async createCategory(newCategory: string | undefined) {
      if (newCategory) {
        await useFilterStore().addIdeaCategory(newCategory);
      }

      this.ideaForm!.category = newCategory;
    },
    async loadIdea() {
      const store = useIdeaStore();
      if (!store.idea || store.idea.id !== this.id) {
        await store.fetch(this.id);
      }
      await store.startEdit();
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  color: black;
}
</style>
