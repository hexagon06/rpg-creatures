<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form novalidate
          :validated="validated"
          ref="form"
          @submit.stop.prevent="() => { }">
      <div class="m-3 text-left">
        <div class="flex flex-col gap-3">
          <input-wrapper label="Encounter Name"
                         validation="Invalid name"
                         :is-valid="encounterForm.name && encounterForm.name.length > 0">
            <input id="input-1"
                   v-model="encounterForm.name"
                   placeholder="Enter name"
                   aria-describedby="password-help-block"
                   required>
            <template v-slot:help>
              Use a descriptive name to label the Encounter.
            </template>
          </input-wrapper>
          <input-wrapper label="Synopsis"
                         validation="Synopsis is required"
                         :is-valid="encounterForm.synopsis && encounterForm.synopsis.length > 0
                           ">
            <input id="input-synopsis"
                   v-model="encounterForm.synopsis"
                   placeholder="A short story"
                   aria-describedby="synopsis-help-block"
                   required>
            <template v-slot:help>
              One or two short sentences describing the encounter
            </template>
          </input-wrapper>
          <input-wrapper label="Flavor Text">
            <textarea id="input-flavor-text"
                      v-model="encounterForm.flavorText"
                      placeholder="You enter the darkest dungeon and it smells damp"
                      aria-describedby="flavor-text-help-block" />
            <template v-slot:help>
              Write a short text you can read out when starting this encounter.
            </template>
          </input-wrapper>
          <input-wrapper label="Description">
            <v-md-editor v-model="encounterForm.description"
                         height="400px"
                         aria-describedby="description-help-block" />
            <!-- <input
              id="input-description"
              v-model="form.description"
              placeholder="The walls of the dungeon are made of slimey goo, anyone getting too close must make a save"
            ></input> -->
            <template v-slot:help>
              Describe the encounter, what the adventurers encounter, what
              challenge there may be, etc.
            </template>
          </input-wrapper>
          <input-wrapper label="Reward:">
            <input id="input-reward"
                   v-model="encounterForm.reward"
                   placeholder="3d20+50 gold and the Sword of Hannah"
                   aria-describedby="reward-help-block">
            <template v-slot:help>
              What are possible rewards for the adventurers?
            </template>
          </input-wrapper>
          <input-wrapper id="input-group-group"
                         label="Group:"
                         label-for="input-group">
            <input id="input-group"
                   v-model="encounterForm.group"
                   placeholder="The Adventurers"
                   aria-describedby="group-help-block"
                   class="rounded-sm">
            <template v-slot:help>
              If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.
            </template>
          </input-wrapper>
          <input-wrapper label="Creatures">
            <multi-select id="input-size"
                          multiple
                          v-model="encounterForm.creatures"
                          :options="creatures"
                          :clear-on-select="false"
                          :close-on-select="false"
                          :show-labels="true"
                          :preselect-first="false"
                          :preserve-search="true"
                          label="name"
                          track-by="id" />
          </input-wrapper>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useEncounterStore } from "@/store/encounters";

// import { Multiselect } from "vue-multiselect";
import { mapState, mapWritableState } from "pinia";
import { useIndexesStore } from "@/store/indexes";
import MultiSelect from 'primevue/multiselect';

import { defineComponent } from 'vue'
export default defineComponent({
  components: { MultiSelect },
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
    };
  },
  async mounted() {
    await this.loadEncounter();
  },
  computed: {
    ...mapWritableState(useEncounterStore, ["encounterForm"]),
    ...mapState(useIndexesStore, ["creatures"]),
    loading(): boolean {
      return (
        !useIndexesStore().initialized ||
        useEncounterStore().encounterForm === undefined
      );
    },
  },
  watch: {
    id: "loadEncounter",
  },
  methods: {
    async loadEncounter() {
      const store = useEncounterStore();
      if (!store.encounter || store.encounter.id !== this.id) {
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
