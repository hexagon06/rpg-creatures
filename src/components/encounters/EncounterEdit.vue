<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <form novalidate :validated="validated" ref="form">
      <div class="m-3 text-left">
        <div>
          <input-wrapper
            label="Encounter Name"
            validation="Invalid name"
            :is-valid="encounterForm.name && encounterForm.name.length > 0"
          >
            <input
              id="input-1"
              v-model="encounterForm.name"
              placeholder="Enter name"
              aria-describedby="password-help-block"
              required
            />
            <template v-slot:help>
              Use a descriptive name to label the Encounter.
            </template>
          </input-wrapper>
          <input-wrapper
            label="Synopsis"
            validation="Synopsis is required"
            :is-valid="
              encounterForm.synopsis && encounterForm.synopsis.length > 0
            "
          >
            <input
              id="input-synopsis"
              v-model="encounterForm.synopsis"
              placeholder="A short story"
              aria-describedby="synopsis-help-block"
              required
            />
            <template v-slot:help>
              One or two short sentences describing the encounter
            </template>
          </input-wrapper>
          <input-wrapper label="Flavor Text">
            <textarea
              id="input-flavor-text"
              v-model="encounterForm.flavorText"
              placeholder="You enter the darkest dungeon and it smells damp"
              aria-describedby="flavor-text-help-block"
            />
            <template v-slot:help>
              Write a short text you can read out when starting this encounter.
            </template>
          </input-wrapper>
          <input-wrapper label="Description">
            <v-md-editor
              v-model="encounterForm.description"
              height="400px"
              aria-describedby="description-help-block"
            ></v-md-editor>
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
            <input
              id="input-reward"
              v-model="encounterForm.reward"
              placeholder="3d20+50 gold and the Sword of Hannah"
              aria-describedby="reward-help-block"
            />
            <template v-slot:help>
              What are possible rewards for the adventurers?
            </template>
          </input-wrapper>
          <input-wrapper
            id="input-group-group"
            label="Group:"
            label-for="input-group"
          >
            <input
              id="input-group"
              v-model="encounterForm.group"
              placeholder="The Adventurers"
              aria-describedby="group-help-block"
              class="rounded-sm"
            />
            <template v-slot:help>
              If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.
            </template>
          </input-wrapper>
          <input-wrapper label="Creatures">
            <multiselect
              id="input-size"
              multiple
              v-model="encounterForm.creatures"
              :options="creatureOptions"
              :clear-on-select="false"
              :close-on-select="false"
              :show-labels="true"
              :preselect-first="false"
              :preserve-search="true"
              label="name"
              track-by="id"
            ></multiselect>
          </input-wrapper>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// environment: string[]
import { indexesMapper, indexesStore } from "@/store";
import { useEncounterStore } from "@/store/encounters";
import Vue from "vue";
import { Multiselect } from "vue-multiselect";
import { mapWritableState } from "pinia";

export default Vue.extend({
  components: { Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // form: undefined as Encounter | undefined,
      saving: false,
      validated: false,
    };
  },
  async mounted() {
    const store = useEncounterStore();
    if (!store.encounter || store.encounter.id !== this.id) {
      await store.fetch(this.id);
    }
    await store.startEdit();
    // this.form = this.encounterForm ? { ...this.encounterForm } : undefined;
  },
  watch: {
    // encounterForm: function (n) {
    //   console.log("encounterForm changed");
    //   this.form = { ...n };
    // },
    // form: {
    //   handler: function (n) {
    //     const store = useEncounterStore();
    //     if (!isEqual(store.encounterForm, this.form)) {
    //       store.encounterForm = n;
    //     }
    //   },
    //   deep: true,
    // },
  },
  computed: {
    ...mapWritableState(useEncounterStore, ["encounterForm"]),
    ...indexesMapper.mapState({
      creatureOptions: (state) => state.creatures,
    }),
    loading(): boolean {
      return (
        !indexesStore.state.initialized ||
        useEncounterStore().encounterForm === undefined
      );
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  color: black;
}
</style>
