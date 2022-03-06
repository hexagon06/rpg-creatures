<template>
  <div v-if="editing">
    <b-form
      @submit.prevent="save"
      @reset="reset"
      novalidate
      :validated="validated"
      ref="encounterForm"
    >
      <b-card class="m-3 text-left">
        <b-card-title class="d-flex">
          <b-button type="submit" class="ml-auto">Save</b-button>
        </b-card-title>
        <b-card-body>
          <b-form-group
            id="input-group-1"
            label="Encounter Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="Enter name"
              aria-describedby="password-help-block"
              required
            ></b-form-input>
            <b-form-text id="password-help-block">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </b-form-text>
            <b-form-invalid-feedback>Invalid name</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-synopsis"
            label="Synopsis:"
            label-for="input-synopsis"
          >
            <b-form-input
              id="input-synopsis"
              v-model="form.synopsis"
              placeholder="A short story"
              aria-describedby="synopsis-help-block"
              required
            ></b-form-input>
            <b-form-text id="synopsis-help-block"
              >One or two short sentences describing the encounter</b-form-text
            >
            <b-form-invalid-feedback
              >Synopsis is required</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group
            id="input-group-flavor-text"
            label="Flavor Text:"
            label-for="input-flavor-text"
          >
            <b-form-textarea
              id="input-flavor-text"
              v-model="form.flavorText"
              placeholder="You enter the darkest dungeon and it smells damp"
              aria-describedby="flavor-text-help-block"
            ></b-form-textarea>
            <b-form-text id="flavor-text-help-block"
              >Write a short text you can read out when starting this
              encounter.</b-form-text
            >
            <b-form-invalid-feedback
              >Flavor Text is invalid</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group
            id="input-group-description"
            label="Description:"
            label-for="input-description"
          >
            <v-md-editor
              v-model="form.description"
              height="400px"
              aria-describedby="description-help-block"
            ></v-md-editor>
            <!-- <b-form-textarea
              id="input-description"
              v-model="form.description"
              placeholder="The walls of the dungeon are made of slimey goo, anyone getting too close must make a save"
            ></b-form-textarea> -->
            <b-form-text id="description-help-block">
              Describe the encounter, what the adventurers encounter, what
              challenge there may be, etc.
            </b-form-text>
            <b-form-invalid-feedback
              >Description is invalid</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group
            id="input-group-reward"
            label="Reward:"
            label-for="input-reward"
          >
            <b-form-input
              id="input-reward"
              v-model="form.reward"
              placeholder="3d20+50 gold and the Sword of Hannah"
              aria-describedby="reward-help-block"
            ></b-form-input>
            <b-form-text id="reward-help-block"
              >What are possible rewards for the adventurers?</b-form-text
            >
            <b-form-invalid-feedback>Reward is invalid</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-group"
            label="Group:"
            label-for="input-group"
          >
            <b-form-input
              id="input-group"
              v-model="form.group"
              placeholder="The Adventurers"
              aria-describedby="group-help-block"
            ></b-form-input>
            <b-form-text id="group-help-block"
              >If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.</b-form-text
            >
            <b-form-invalid-feedback>Group is invalid</b-form-invalid-feedback>
          </b-form-group>
        </b-card-body>
      </b-card>
      <b-card>
        <b-card-body>
          <b-form-group
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
          </b-form-group>
        </b-card-body>
      </b-card>
    </b-form>
  </div>
  <div v-else>
    <!-- info card -->
    <b-card class="m-3 text-left sticky-top">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <div class="d-flex">
            <div class="flex-fill">
              <b-skeleton height="2.5rem" width="40%"></b-skeleton>
              <b-skeleton class="w-50 mt-3"></b-skeleton>
            </div>
            <b-skeleton
              type="button"
              class="ml-auto align-self-start"
            ></b-skeleton>
          </div>
        </template>
        <b-card-title>
          <div class="d-flex">
            <h1>{{ encounter.name }}</h1>
            <b-button
              variant="primary"
              @click="edit"
              class="ml-auto align-self-start"
            >
              Edit
            </b-button>
          </div>
        </b-card-title>
        <b-card-text class="font-italic font-weight-bolder text-secondary">
          {{ encounter.synopsis }}
        </b-card-text>
      </b-skeleton-wrapper>
    </b-card>
    <!-- description card -->
    <b-card class="m-3 text-left">
      <b-card-text class="pl-5">
        {{ encounter.flavorText }}
      </b-card-text>
      <b-card-text>
        <v-md-preview
          :text="encounter.description"
          :default-show-toc="true"
        ></v-md-preview>
      </b-card-text>
      <b-card-text v-if="encounter.reward">
        <h2>Rewards:</h2>
        {{ encounter.reward }}
      </b-card-text>
      <b-card-body v-if="encounter.tags && encounter.tags.length > 0">
        <array-pills :data="encounter.tags"></array-pills>
      </b-card-body>
    </b-card>

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
import { encounterStore } from "@/store";
import { encounterMapper, fillEncounter } from "@/store/encounters";
import { Encounter, FilledEncounter, ReferenceListItem } from "@/types";
import { BForm } from "bootstrap-vue";
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
            label: c.name,
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
        const form = this.$refs["encounterForm"] as BForm;
        if (form.checkValidity() === false) {
          console.warn("invalid");
        } else {
          this.saving = true;
          this.encounter = fillEncounter(cloneDeep(this.form));
          await encounterStore.actions.save(this.encounter!);
          this.saving = false;
          this.editing = false;
        }
        form.classList.add("was-validated");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.entity-selector {
  width: $sidebar-width;
  min-width: $sidebar-width;
}
.bd-highlight {
  background-color: darken($white, 5);
}
</style>
