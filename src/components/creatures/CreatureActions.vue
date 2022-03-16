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
  </div>
</template>

<script lang="ts">
import { useCreatureStore } from "@/store/creatures";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...mapState(useCreatureStore, ["creature", "creatureForm", "isDirty"]),
    isEditing(): boolean {
      return this.creatureForm !== undefined;
    },
  },
  methods: {
    async back() {
      await useCreatureStore().stopEdit();
      this.$router.back();
    },
    async reset() {
      await useCreatureStore().startEdit();
    },
    async save() {
      await useCreatureStore().saveEdit();
    },
    async edit() {
      await useCreatureStore().startEdit();
      this.$router.push(`/creature/${useCreatureStore().creature?.id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
