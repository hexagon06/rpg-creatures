<template>
  <div v-if="loading" class="d-flex">
    <h1>Encounter</h1>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton-table :rows="5" :columns="6" animation="throb" width="85%">
        </b-skeleton-table>
      </template>
    </b-skeleton-wrapper>
  </div>
  <div v-else-if="editing">
    <b-card class="m-3 text-left">
      <b-form
        @submit="save"
        @reset="reset"
        novalidate
        :validated="validated"
        ref="encounterForm"
      >
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
              >Synopsis is invalid</b-form-invalid-feedback
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
              required
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
            <b-form-textarea
              id="input-description"
              v-model="form.description"
              placeholder="The walls of the dungeon are made of slimey goo, anyone getting too close must make a save"
              aria-describedby="description-help-block"
              rows="10"
              required
            ></b-form-textarea>
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
              required
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
              required
            ></b-form-input>
            <b-form-text id="group-help-block"
              >If this encounter is made for a specific adventure or group of
              adventurers you can mention them here.</b-form-text
            >
            <b-form-invalid-feedback>Group is invalid</b-form-invalid-feedback>
          </b-form-group>
        </b-card-body>
      </b-form>
    </b-card>
  </div>
  <div v-else>
    <b-card class="m-3 text-left">
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
      <b-card-text class="pl-5">
        {{ encounter.flavorText }}
      </b-card-text>
      <b-card-text>
        {{ encounter.description }}
      </b-card-text>
      <b-card-text v-if="encounter.reward">
        <h2>Rewards:</h2>
        {{ encounter.reward }}
      </b-card-text>
      <b-card-body v-if="hasReferences">
        <div class="d-flex flex-column flex-md-row align-items-stretch">
          <div
            v-if="locations && locations.length > 0"
            class="flex-fill bd-highlight p-2 mx-2 mb-2 mb-md-0"
          >
            <h3>Locations</h3>
            <hr />
            <b-list-group v-if="locations && locations.length > 0" flush>
              <b-list-group-item
                v-for="location in locations"
                :key="location.id"
                >{{ location.name }}</b-list-group-item
              >
            </b-list-group>
          </div>
          <div
            v-if="creatures && creatures.length > 0"
            class="flex-fill bd-highlight p-2 mx-2 mb-2 mb-md-0"
          >
            <h3>Creatures</h3>
            <hr />
            <b-list-group v-if="creatures && creatures.length > 0" flush>
              <b-list-group-item
                v-for="creature in creatures"
                :key="creature.id"
                >{{ creature.name }}</b-list-group-item
              >
            </b-list-group>
          </div>
          <div
            v-if="encounter.environment && encounter.environment.length > 0"
            class="flex-fill bd-highlight p-2 mx-2 mb-2 mb-md-0"
          >
            <h3>Environments</h3>
            <hr />
            <b-list-group
              v-if="encounter.environment && encounter.environment.length > 0"
              flush
            >
              <b-list-group-item
                v-for="environment in encounter.environment"
                :key="environment"
                >{{ environment }}</b-list-group-item
              >
            </b-list-group>
          </div>
        </div>
      </b-card-body>
      <b-card-body v-if="encounter.tags && encounter.tags.length > 0">
        <array-pills :data="encounter.tags"></array-pills>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
// tags: Tag[]
// locations: Reference[]
// creatures: ReferenceCount[]
// environment: string[]
import { encounterStore } from "@/store";
import { Creature, Encounter } from "@/types";
import { BForm } from "bootstrap-vue";
import { cloneDeep } from "lodash";
import Vue from "vue";
import ArrayPills from "../shared/ArrayPills.vue";
export default Vue.extend({
  components: { ArrayPills },
  data() {
    return {
      encounter: undefined as Encounter | undefined,
      form: undefined as Encounter | undefined,
      editing: false,
      saving: false,
      validated: false,
    };
  },
  async created() {
    await encounterStore.actions.fetch(this.id);
    this.encounter = encounterStore.state.encounter;
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  watch: {
    id: "fetchEncounter",
  },
  computed: {
    loading(): boolean {
      return this.encounter === undefined;
    },
    locations(): string[] {
      return [];
    },
    creatures(): Creature[] {
      return [];
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
      await encounterStore.actions.fetch(id);
      this.encounter = encounterStore.state.encounter;
      this.editing = false;
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
          this.encounter = cloneDeep(this.form);
          await encounterStore.actions.save(this.encounter);
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
