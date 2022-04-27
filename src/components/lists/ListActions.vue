<template>
  <action-panel-action>
    <button
      v-if="!isEditing"
      @click="edit"
      class="button-round-large button-on-gold"
      title="edit"
    >
      <font-awesome-icon icon="fa-solid fa-pen" />
    </button>
    <button
      v-if="isEditing"
      @click="save"
      :disabled="!isDirty"
      class="button-round-large button-on-gold"
      title="save changes"
    >
      <font-awesome-icon icon="fa-solid fa-save" />
    </button>
    <button
      v-if="!isEditing"
      @click="setActive"
      disabled
      class="button-round-large button-on-gold"
      title="set as active"
    >
      <font-awesome-icon icon="fa-solid fa-circle-dot" />
    </button>
    <button
      v-if="isEditing"
      @click="reset"
      :disabled="!isDirty"
      class="button-round-large button-on-gold"
      title="reset changes"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <button
      @click="back"
      class="button-round-large button-on-gold"
      title="back"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
    <template v-slot:buttons>
      <button
        v-if="!isEditing || !isDirty"
        @click="create"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
      <button
        v-if="!isEditing || !isDirty"
        @click="copy"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-copy" />
      </button>
    </template>
  </action-panel-action>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "pinia";
import { useListStore } from "@/store/rollingLists";
export default Vue.extend({
  computed: {
    ...mapState(useListStore, ["rollingListForm", "rollingList", "isDirty"]),
    isEditing(): boolean {
      return this.rollingListForm !== undefined;
    },
  },
  methods: {
    async back() {
      await useListStore().stopEdit();
      this.$router.back();
    },
    async reset() {
      await useListStore().startEdit();
    },
    async save() {
      await useListStore().saveEdit();
    },
    async edit() {
      await useListStore().startEdit();
      this.$router.push(`/list/${useListStore().rollingList?.id}/edit`);
    },
    async copy() {
      if (this.rollingList) {
        const source = { ...this.rollingList };
        const id = await useListStore().createList();
        console.log(source, id);

        useListStore().rollingListForm = {
          ...source,
          id,
        };
        await this.save();
        this.$router.push(`/list/${id}/edit`);
      } else throw new Error("cannot copy undefined list");
    },
    async create() {
      const id = await useListStore().createList();
      this.$router.push(`/list/${id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
