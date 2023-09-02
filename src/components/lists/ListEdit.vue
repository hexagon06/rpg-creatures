<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form novalidate
          :validated="validated"
          ref="form"
          @submit.stop.prevent="() => { }">
      <div class="m-3 text-left">
        <div class="flex flex-col gap-3">
          <input-wrapper label="List Name"
                         validation="Invalid name"
                         :is-valid="rollingListForm.name && rollingListForm.name.length > 0">
            <input id="input-1"
                   v-model="rollingListForm.name"
                   placeholder="Enter name"
                   required />
            <template v-slot:help> Give the list a name </template>
          </input-wrapper>
          <button v-if="!weighted"
                  @click="addWeight"
                  class="button-round-large button-on-brown ml-14"
                  title="add weight">
            <font-awesome-icon icon="fa-solid fa-weight-hanging" />
          </button>
          <list-section-edit :model-value.sync="items"
                             :weighted="weighted" />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useListStore } from "@/store/rollingLists";

// import { Multiselect } from "vue-multiselect";
import { mapWritableState } from "pinia";
import ListSectionEdit from "./ListSectionEdit.vue";
import { ReferenceListItem, RollingListItem } from "@/types";
import { useIndexesStore } from "@/store/indexes";

import { defineComponent } from 'vue'
export default defineComponent({
  components: { "list-section-edit": ListSectionEdit },
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
      isWeighted: false,
    };
  },
  async mounted() {
    await this.loadList();
  },
  computed: {
    ...mapWritableState(useListStore, ["rollingListForm"]),
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
    loading(): boolean {
      return (
        !useIndexesStore().initialized ||
        useListStore().rollingListForm === undefined
      );
    },
  },
  watch: {
    id: "loadList",
  },
  methods: {
    addWeight() {
      this.isWeighted = true;
    },
    async loadList() {
      const store = useListStore();
      if (!store.rollingList || store.rollingList.id !== this.id) {
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
