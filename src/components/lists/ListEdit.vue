<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form novalidate :validated="validated" ref="form">
      <div class="m-3 text-left">
        <div class="flex flex-col gap-3">
          <input-wrapper
            label="List Name"
            validation="Invalid name"
            :is-valid="rollingListForm.name && rollingListForm.name.length > 0"
          >
            <input
              id="input-1"
              v-model="rollingListForm.name"
              placeholder="Enter name"
              required
            />
            <template v-slot:help> Give the list a name </template>
          </input-wrapper>
          <button
            v-if="!weighted"
            @click="addWeight"
            class="button-round-large button-on-brown ml-14"
            title="add weight"
          >
            <font-awesome-icon icon="fa-solid fa-weight-hanging" />
          </button>
          <list-section-edit :value.sync="items" :weighted="weighted" />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// environment: string[]
import { indexesMapper, indexesStore } from "@/store";
import { useListStore } from "@/store/rollingLists";
import Vue from "vue";
import { Multiselect } from "vue-multiselect";
import { mapState, mapWritableState } from "pinia";
import { useFilterStore } from "@/store/filter";
import ListSectionEdit from "./ListSectionEdit.vue";
import {
  getRollingListItem,
  ReferenceListItem,
  RollingListItem,
} from "@/types";

export default Vue.extend({
  components: { Multiselect, "list-section-edit": ListSectionEdit },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // form: undefined as List | undefined,
      saving: false,
      validated: false,
      isWeighted: false,
    };
  },
  async mounted() {
    const store = useListStore();
    if (!store.rollingList || store.rollingList.id !== this.id) {
      await store.fetch(this.id);
    }
    await store.startEdit();
    // this.form = this.rollingListForm ? { ...this.rollingListForm } : undefined;
  },
  watch: {
    // rollingListForm: function (n) {
    //   console.log("rollingListForm changed");
    //   this.form = { ...n };
    // },
    // form: {
    //   handler: function (n) {
    //     const store = useListStore();
    //     if (!isEqual(store.rollingListForm, this.form)) {
    //       store.rollingListForm = n;
    //     }
    //   },
    //   deep: true,
    // },
  },
  computed: {
    ...mapWritableState(useListStore, ["rollingListForm"]),
    ...indexesMapper.mapState({
      creatureOptions: (state) => state.creatures,
    }),
    weighted(): boolean {
      if (!this.rollingListForm) return false;
      return (
        this.isWeighted ||
        this.rollingListForm.items.findIndex((i) => i.weight !== 1) !== -1
      );
    },
    items: {
      get(): (ReferenceListItem & RollingListItem)[] | undefined {
        return this.rollingListForm?.items;
      },
      set(value: (ReferenceListItem & RollingListItem)[]) {
        if (this.rollingListForm) {
          this.rollingListForm.items = value;
        }
      },
    },
    // ...mapState(useFilterStore, ["rollingListOptions"]),
    // tagsOptions(): string[] {
    //   return this.rollingListOptions.tags;
    // },
    // categoryOptions(): string[] {
    //   return this.rollingListOptions.categories;
    // },
    loading(): boolean {
      return (
        !indexesStore.state.initialized ||
        useListStore().rollingListForm === undefined
      );
    },
  },
  methods: {
    addWeight() {
      this.isWeighted = true;
    },
  },
  // methods: {
  //   async tagTag(newTag: string) {
  //     await useFilterStore().addListTag(newTag);
  //     this.rollingListForm!.tags.push(newTag);
  //   },
  //   async createCategory(newCategory: string | undefined) {
  //     console.log("new", newCategory);
  //     if (newCategory) {
  //       await useFilterStore().addListCategory(newCategory);
  //     }

  //     this.rollingListForm!.category = newCategory;
  //     console.log("form", this.rollingListForm?.category);
  //   },
  // },
});
</script>

<style lang="scss" scoped>
input {
  color: black;
}
</style>
