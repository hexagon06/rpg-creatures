<template>
  <div v-if="form">
    <form novalidate :validated="validated" ref="form">
      <div class="m-3 text-left">
        <div class="d-flex">
          <button type="submit" class="ml-auto text-red">Save</button>
        </div>
        <div>
          <div id="input-group-1" label="Encounter Name:" label-for="input-2">
            <input
              id="input-1"
              v-model="form.name"
              placeholder="Enter name"
              aria-describedby="password-help-block"
              required
            />
            <p id="password-help-block">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </p>
            <p class="text-red-500">Invalid name</p>
          </div>
          <div
            id="input-group-synopsis"
            label="Synopsis:"
            label-for="input-synopsis"
          >
            <input
              id="input-synopsis"
              v-model="form.synopsis"
              placeholder="A short story"
              aria-describedby="synopsis-help-block"
              required
            />
            <p id="synopsis-help-block">
              One or two short sentences describing the encounter
            </p>
            <p class="text-red-500">Synopsis is required</p>
          </div>
          <div
            id="input-group-flavor-text"
            label="Flavor Text:"
            label-for="input-flavor-text"
          >
            <input
              id="input-flavor-text"
              v-model="form.flavorText"
              placeholder="You enter the darkest dungeon and it smells damp"
              aria-describedby="flavor-text-help-block"
            />
            <p id="flavor-text-help-block">
              Write a short text you can read out when starting this encounter.
            </p>
            <p class="text-red-500">Flavor Text is invalid</p>
          </div>
          <div
            id="input-group-description"
            label="Description:"
            label-for="input-description"
          >
            <v-md-editor
              v-model="form.description"
              height="400px"
              aria-describedby="description-help-block"
            ></v-md-editor>
            <!-- <input
              id="input-description"
              v-model="form.description"
              placeholder="The walls of the dungeon are made of slimey goo, anyone getting too close must make a save"
            ></input> -->
            <p id="description-help-block">
              Describe the encounter, what the adventurers encounter, what
              challenge there may be, etc.
            </p>
            <p class="text-red-500">Description is invalid</p>
          </div>
          <div id="input-group-reward" label="Reward:" label-for="input-reward">
            <input
              id="input-reward"
              v-model="form.reward"
              placeholder="3d20+50 gold and the Sword of Hannah"
              aria-describedby="reward-help-block"
            />
            <p id="reward-help-block">
              What are possible rewards for the adventurers?
            </p>
            <p class="text-red-500">Reward is invalid</p>
          </div>
          <div id="input-group-group" label="Group:" label-for="input-group">
            <input
              id="input-group"
              v-model="form.group"
              placeholder="The Adventurers"
              aria-describedby="group-help-block"
            />
            <p id="group-help-block">
              If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.
            </p>
            <p class="text-red-500">Group is invalid</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div
            id="input-creature-group"
            label="Creatures"
            label-for="input-creature"
          >
            <multiselect
              id="input-size"
              multiple
              v-model="form.creatures"
              :options="creatureOptions"
              :clear-on-select="false"
              :close-on-select="false"
              :show-labels="true"
              :preselect-first="false"
              :preserve-search="true"
              label="name"
              track-by="id"
            ></multiselect>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    no form {{ encounterForm ? encounterForm.name : "no encounterForm" }}
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// environment: string[]
import { indexesMapper } from "@/store";
import { useEncounterStore } from "@/store/encounters";
import { Encounter } from "@/types";
import { isEqual } from "lodash";
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
      form: undefined as Encounter | undefined,
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
    console.log("mounted");

    this.form = this.encounterForm ? { ...this.encounterForm } : undefined;
  },
  watch: {
    encounterForm: function (n) {
      console.log("encounterForm changed");

      this.form = { ...n };
    },
    form: {
      handler: function (n) {
        const store = useEncounterStore();
        if (!isEqual(store.encounterForm, this.form)) {
          store.encounterForm = n;
        }
      },
      deep: true,
    },
  },
  computed: {
    // ...mapState(useEncounterStore, ['encounterForm']),
    ...mapWritableState(useEncounterStore, ["encounterForm"]),
    // ...encounterMapper.mapState(["encounterForm"]),
    ...indexesMapper.mapState({
      creatureOptions: (state) => state.creatures,
    }),
    // encounterForm(): Encounter | undefined {
    //   console.log("get encounterForm", encounterStore.state.encounterForm);

    //   return encounterStore.state.encounterForm;
    // },
    // locations(): ReferenceListItem[] {
    //   return [];
    // },
    // creatures(): ReferenceListItem[] {
    //   return (
    //     this.encounter?.creatures.map((c) => {
    //       return {
    //         id: c.id,
    //         label: creatureLabel(c),
    //         routerName: "Creature Details",
    //       };
    //     }) ?? []
    //   );
    // },
    // environments(): ReferenceListItem[] {
    //   return (
    //     this.encounter?.environment.map((e) => {
    //       return { id: e, label: e };
    //     }) ?? []
    //   );
    // },
    // hasReferences(): boolean {
    //   return (
    //     this.encounter !== undefined &&
    //     (this.encounter.locations.length > 0 ||
    //       this.encounter.environment.length > 0 ||
    //       this.encounter.creatures.length > 0)
    //   );
    // },
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
.bd-highlight {
  background-color: darken(#fff, 5);
}
input {
  color: black;
}
</style>
