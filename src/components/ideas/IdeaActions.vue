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
import { useIdeaStore } from "@/store/ideas";
export default Vue.extend({
  computed: {
    ...mapState(useIdeaStore, ["ideaForm", "idea", "isDirty"]),
    isEditing(): boolean {
      return this.ideaForm !== undefined;
    },
  },
  methods: {
    async back() {
      await useIdeaStore().stopEdit();
      this.$router.back();
    },
    async reset() {
      await useIdeaStore().startEdit();
    },
    async save() {
      await useIdeaStore().saveEdit();
    },
    async edit() {
      await useIdeaStore().startEdit();
      this.$router.push(`/idea/${useIdeaStore().idea?.id}/edit`);
    },
    async copy() {
      if (this.idea) {
        const source = { ...this.idea };
        const id = await useIdeaStore().createIdea();
        useIdeaStore().idea = {
          ...source,
          id,
        };
        await this.save();
        this.$router.push(`/idea/${id}/edit`);
      } else throw new Error("cannot copy undefined idea");
    },
    async create() {
      const id = await useIdeaStore().createIdea();
      this.$router.push(`/idea/${id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
