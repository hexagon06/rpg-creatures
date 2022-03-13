<template>
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
    ef{{ encounterForm ? encounterForm.name : "" }} f{{
      encounter ? encounter.name : ""
    }}
  </div>
</template>

<script lang="ts">
import { encounterMapper, encounterStore } from "@/store";
import Vue from "vue";
import { isEqual } from "lodash";
export default Vue.extend({
  computed: {
    ...encounterMapper.mapState(["encounterForm", "encounter"]),
    isEditing(): boolean {
      return this.encounterForm !== undefined;
    },
    isDirty(): boolean {
      return !isEqual(this.encounterForm, this.encounter);
    },
  },
  mounted() {
    console.log("mounted actions", this.encounter, this.encounterForm);
  },
  methods: {
    async back() {
      await encounterStore.actions.stopEdit();
      this.$router.back();
    },
    async reset() {
      await encounterStore.actions.startEdit();
    },
    async save() {
      await encounterStore.actions.saveEdit();
    },
    async edit() {
      await encounterStore.actions.startEdit();
      this.$router.push(
        `/encounter/${encounterStore.state.encounter?.id}/edit`
      );
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
