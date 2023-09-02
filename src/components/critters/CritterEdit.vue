<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form ref="form"
          @submit.stop.prevent="() => { }">
      <critter-form v-model="creatureForm" />
    </form>
  </div>
</template>

<script lang="ts">

import { EditState, useCritterStore } from "@/store/critters";
import { mapWritableState } from "pinia";
import { useIndexesStore } from "@/store/indexes";
import CritterForm from './CritterForm.vue'
import { creatureApi } from "@/api/new-typed/creatureApi";
import { Creature } from "@/types/creatures";
import { deepEqual } from '@firebase/util'

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    CritterForm
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      creature: undefined as Creature | undefined,
      creatureForm: undefined as Creature | undefined
    }
  },
  async mounted() {
    await this.loadCreature();
  },
  computed: {
    ...mapWritableState(useCritterStore, ['editState', 'dataState']),
    // ...mapWritableState(useCreatureStore, ["creatureForm"]),
    loading(): boolean {
      return (
        this.creatureForm === undefined
      );
    },
    isDirty(): boolean {
      return this.dataState === 'dirty'
    }
  },
  watch: {
    id: "loadCreature",
    async editState(newState: EditState) {
      switch (newState) {
        case 'reset':
          await this.loadCreature()
          break;
        case 'saving':
          if (this.creatureForm) {
            await creatureApi.update(this.creatureForm);
            this.creature = { ...this.creatureForm };
          }
          this.editState = 'editing'
          break;
      }
    },
    creatureForm: {
      handler: function () {
        if (this.creature && this.creatureForm) {
          const areDifferent = !deepEqual(this.creatureForm, this.creature)
          if (areDifferent !== this.isDirty) {
            this.dataState = areDifferent ? 'dirty' : 'saved'
          }
        }
      },
      deep: true
    }
  },
  methods: {
    async loadCreature() {
      this.creatureForm = undefined
      this.creatureForm = await creatureApi.get(this.id);
      this.creature = { ...this.creatureForm }
      this.editState = 'editing'
      // if (!creatureStore.creature || creatureStore.creature.id !== this.id) {
      //   await creatureStore.fetch(this.id);
      // }
      // await creatureStore.startEdit();
    },
  },
});
</script>

<style lang="scss" scoped></style>
