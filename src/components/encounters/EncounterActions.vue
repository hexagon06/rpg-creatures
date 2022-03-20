<template>
  <div>
    <div class="flex gap-3 justify-between pr-2 -ml-2">
      <button
        @click="back"
        class="button-round-large button-on-gold"
        title="back"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
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
        v-if="!isEditing"
        @click="edit"
        class="button-round-large button-on-gold"
        title="edit"
      >
        <font-awesome-icon icon="fa-solid fa-pen" />
      </button>
    </div>
    <div class="absolute -bottom-4 left-24 right-2 flex gap-3 justify-center">
      <button
        v-if="!isEditing || !isDirty"
        @click="copy"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-copy" />
      </button>
      <button
        v-if="!isEditing || !isDirty"
        @click="create"
        class="button-round-large button-on-gold"
        title="create"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "pinia";
import { useEncounterStore } from "@/store/encounters";
export default Vue.extend({
  computed: {
    ...mapState(useEncounterStore, ["encounterForm", "encounter", "isDirty"]),
    isEditing(): boolean {
      return this.encounterForm !== undefined;
    },
  },
  methods: {
    async back() {
      await useEncounterStore().stopEdit();
      this.$router.back();
    },
    async reset() {
      await useEncounterStore().startEdit();
    },
    async save() {
      await useEncounterStore().saveEdit();
    },
    async edit() {
      await useEncounterStore().startEdit();
      this.$router.push(`/encounter/${useEncounterStore().encounter?.id}/edit`);
    },
    async copy() {
      if (this.encounter) {
        const source = { ...this.encounter };
        const id = await useEncounterStore().createEncounter();
        useEncounterStore().encounter = {
          ...source,
          id,
        };
        await this.save();
        this.$router.push(`/encounter/${id}/edit`);
      } else throw new Error("cannot copy undefined encounter");
    },
    async create() {
      const id = await useEncounterStore().createEncounter();
      this.$router.push(`/encounter/${id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
