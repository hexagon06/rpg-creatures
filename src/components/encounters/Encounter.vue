<template>
  <div v-if="loading">loading</div>
  <div v-else-if="editing">
    <form
      @submit.prevent="save"
      @reset="reset"
      novalidate
      :validated="validated"
      ref="encounterForm"
    >
      <div class="m-3 text-left">
        <div class="d-flex">
          <button type="submit" class="ml-auto">Save</button>
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
            <form-text id="password-help-block">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </form-text>
            <form-invalid-feedback>Invalid name</form-invalid-feedback>
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
            <form-text id="synopsis-help-block"
              >One or two short sentences describing the encounter</form-text
            >
            <form-invalid-feedback>Synopsis is required</form-invalid-feedback>
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
            ></input>
            <form-text id="flavor-text-help-block"
              >Write a short text you can read out when starting this
              encounter.</form-text
            >
            <form-invalid-feedback
              >Flavor Text is invalid</form-invalid-feedback
            >
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
            <form-text id="description-help-block">
              Describe the encounter, what the adventurers encounter, what
              challenge there may be, etc.
            </form-text>
            <form-invalid-feedback
              >Description is invalid</form-invalid-feedback
            >
          </div>
          <div id="input-group-reward" label="Reward:" label-for="input-reward">
            <input
              id="input-reward"
              v-model="form.reward"
              placeholder="3d20+50 gold and the Sword of Hannah"
              aria-describedby="reward-help-block"
            />
            <form-text id="reward-help-block"
              >What are possible rewards for the adventurers?</form-text
            >
            <form-invalid-feedback>Reward is invalid</form-invalid-feedback>
          </div>
          <div id="input-group-group" label="Group:" label-for="input-group">
            <input
              id="input-group"
              v-model="form.group"
              placeholder="The Adventurers"
              aria-describedby="group-help-block"
            />
            <form-text id="group-help-block"
              >If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.</form-text
            >
            <form-invalid-feedback>Group is invalid</form-invalid-feedback>
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
    <!-- info card -->
    <div class="m-3 text-left sticky-top">
      <div>
        <div class="d-flex">
          <h1>{{ encounter.name }}</h1>
          <button
            variant="primary"
            @click="edit"
            class="ml-auto align-self-start"
          >
            Edit
          </button>
        </div>
      </div>
      <p class="font-italic font-weight-bolder text-secondary">
        {{ encounter.synopsis }}
      </p>
    </div>
    <!-- description card -->
    <div class="m-3 text-left">
      <p class="pl-5">
        {{ encounter.flavorText }}
      </p>
      <div>
        <v-md-preview
          :text="encounter.description"
          :default-show-toc="true"
        ></v-md-preview>
      </div>
      <div v-if="encounter.reward">
        <h2>Rewards:</h2>
        {{ encounter.reward }}
      </div>
      <div v-if="encounter.tags && encounter.tags.length > 0">
        <array-pills :data="encounter.tags"></array-pills>
      </div>
    </div>

    <!-- reference lists -->
    <div class="px-3 mb-5">
      <list-card
        v-if="locations && locations.length"
        title="Locations"
        :list="locations"
      ></list-card>
      <list-card
        v-if="creatures && creatures.length"
        title="Creatures"
        :list="creatures"
      ></list-card>
      <list-card
        v-if="environments && environments.length"
        title="Environments"
        :list="environments"
      ></list-card>
    </div>
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// environment: string[]
import { encounterStore, indexesMapper } from "@/store";
import { encounterMapper, fillEncounter } from "@/store/encounters";
import {
  creatureLabel,
  Encounter,
  FilledEncounter,
  ReferenceListItem,
} from "@/types";
import { cloneDeep } from "lodash";
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
import { Multiselect } from "vue-multiselect";

export default Vue.extend({
  components: { ArrayPills, Multiselect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      encounter: undefined as FilledEncounter | undefined,
      form: undefined as Encounter | undefined,
      editing: false,
      saving: false,
      validated: false,
    };
  },
  async created() {
    this.fetchEncounter(this.id);
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    ...encounterMapper.mapState(["filledEncounter"]),
    ...indexesMapper.mapState({
      creatureOptions: (state) => state.creatures,
    }),
    loading(): boolean {
      return this.encounter === undefined;
    },
    locations(): ReferenceListItem[] {
      return [];
    },
    creatures(): ReferenceListItem[] {
      return (
        this.encounter?.creatures.map((c) => {
          return {
            id: c.id,
            label: creatureLabel(c),
            routerName: "Creature Details",
          };
        }) ?? []
      );
    },
    environments(): ReferenceListItem[] {
      return (
        this.encounter?.environment.map((e) => {
          return { id: e, label: e };
        }) ?? []
      );
    },
    hasReferences(): boolean {
      return (
        this.encounter !== undefined &&
        (this.encounter.locations.length > 0 ||
          this.encounter.environment.length > 0 ||
          this.encounter.creatures.length > 0)
      );
    },
  },
  methods: {
    async fetchEncounter(id: string) {
      this.encounter = undefined;
      this.editing = false;
      await encounterStore.actions.fetch(id);
      this.encounter = encounterStore.state.filledEncounter;
    },
    edit() {
      this.reset();
      this.editing = true;
    },
    reset() {
      this.form = cloneDeep(this.encounter);
      this.validated = false;
    },
    async save() {
      if (this.form) {
        // const form = this.$refs["encounterForm"] as BForm;
        // if (form.checkValidity() === false) {
        //   console.warn("invalid");
        // } else {
        //   this.saving = true;
        //   this.encounter = fillEncounter(cloneDeep(this.form));
        //   await encounterStore.actions.save(this.encounter!);
        //   this.saving = false;
        //   this.editing = false;
        // }
        // form.classList.add("was-validated");
      }
    },
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
</style>
