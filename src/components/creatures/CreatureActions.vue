<template>
  <action-panel-action>
    <button v-if="!isEditing"
            @click="edit"
            class="button-round-large button-on-gold"
            title="edit">
      <font-awesome-icon icon="fa-solid fa-pen" />
    </button>
    <button v-if="isEditing"
            @click="save"
            :disabled="!isDirty"
            class="button-round-large button-on-gold"
            title="save changes">
      <font-awesome-icon icon="fa-solid fa-save" />
    </button>
    <button v-if="!isEditing"
            @click="setActive"
            disabled
            class="button-round-large button-on-gold"
            title="set as active">
      <font-awesome-icon icon="fa-solid fa-circle-dot" />
    </button>
    <button v-if="isEditing"
            @click="reset"
            :disabled="!isDirty"
            class="button-round-large button-on-gold"
            title="reset changes">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <button @click="back"
            class="button-round-large button-on-gold"
            title="back">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
    <template v-slot:buttons>
      <button v-if="!isEditing || !isDirty"
              @click="create"
              class="button-round-large button-on-gold"
              title="create">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
      <button v-if="!isEditing || !isDirty"
              @click="copy"
              class="button-round-large button-on-gold"
              title="create">
        <font-awesome-icon icon="fa-solid fa-copy" />
      </button>
    </template>
  </action-panel-action>
</template>

<script lang="ts">
import { useCreatureStore } from "@/store/creatures";
import { mapState } from "pinia";

import { defineComponent } from 'vue'
export default defineComponent({
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
    async copy() {
      if (this.creature) {
        const source = { ...this.creature };
        const id = await useCreatureStore().createCreature();
        useCreatureStore().creatureForm = {
          ...source,
          id,
        };
        await this.save();
        this.$router.push(`/creature/${id}/edit`);
      } else throw new Error("cannot copy undefined encounter");
    },
    async create() {
      const id = await useCreatureStore().createCreature();
      this.$router.push(`/creature/${id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped></style>
