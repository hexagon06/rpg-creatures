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
    <button v-if="isEditing"
            @click="reset"
            :disabled="!isDirty"
            class="button-round-large button-on-gold"
            title="reset changes">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <button v-if="!isEditing"
            @click="deleteCritter"
            class="button-round-large button-on-gold bg-rouge"
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
import { creatureApi } from "@/api/new-typed/creatureApi";
import { createDefaultCritter } from "@/shared/critters";
import { useCritterStore } from "@/store/critters";
import { mapState, mapWritableState } from "pinia";

import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    ...mapWritableState(useCritterStore, ['dataState', 'editState']),
    // ...mapState(useCreatureStore, ["creature", "creatureForm", "isDirty"]),
    isEditing(): boolean {
      return this.editState !== 'idle';
    },
    isDirty(): boolean {
      return this.dataState === 'dirty'
    }
  },
  methods: {
    back() {
      this.isEditing = false
      this.$router.back();
    },
    reset() {
      this.editState = 'reset'
    },
    save() {
      this.editState = 'saving'
    },
    async edit() {
      // await useCreatureStore().startEdit();
      this.$router.push(`/critter/${this.$route.params.id}/edit`);
    },
    async copy() {
      throw new Error('not implemented')
      // if (this.creature) {
      //   const source = { ...this.creature };
      //   const id = await useCreatureStore().createCreature();
      //   useCreatureStore().creatureForm = {
      //     ...source,
      //     id,
      //   };
      //   await this.save();
      //   this.$router.push(`/critter/${id}/edit`);
      // } else throw new Error("cannot copy undefined encounter");
    },
    async create() {
      const id = await creatureApi.create(createDefaultCritter('New Creature'))
      // const id = await useCreatureStore().createCreature();
      this.$router.push(`/critter/${id}/edit`);
    },
    async deleteCritter() {
      if (confirm('Are you sure you want to delete this creature?')) {
        await creatureApi.delete(this.$route.params.id)
        this.$router.push(`/critter/list`);
      }
    },
    setActive() {
      console.warn("setActive not implemented");
    },
  },
});
</script>

<style lang="scss" scoped></style>
