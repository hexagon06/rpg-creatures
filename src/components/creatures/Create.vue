<template>
  <div>
    <b-button v-b-modal.create-modal>Create</b-button>
    <b-modal
      id="create-modal"
      title="Create-a-Creature"
      size="lg"
      scrollable
      @show="reset"
      @ok="ok"
      @hide="hide"
    >
      <b-form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        :validated="validState.validated"
      >
        <b-form-group id="input-name-group" label="Name" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="creature.name"
            placeholder="Wolf"
            required
          ></b-form-input>
        </b-form-group>
        <b-tabs content-class="mt-3">
          <b-tab title="source">
            <b-form-group
              id="input-link-group"
              label="Link"
              label-for="input-link"
            >
              <b-form-input
                id="input-link"
                v-model="creature.link"
                placeholder="http://google.doc.share/..."
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-source-group"
              label="Source name"
              label-for="input-source"
            >
              <b-form-input
                id="input-source"
                v-model="creature.source"
                placeholder="Monster Manual"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-page-group"
              label="Page"
              label-for="input-page"
            >
              <b-form-input
                id="input-page"
                v-model="creature.page"
                placeholder="#"
                number
                @keypress="isNumber"
                :disabled="
                  creature.source === '' || creature.source === undefined
                "
              ></b-form-input>
            </b-form-group>
            <!-- todo suggestions based on current systems -->
            <!-- todo set this when a book is set with a system -->
            <b-form-group
              id="input-system-group"
              label="Game System"
              label-for="input-system"
            >
              <b-form-input
                id="input-system"
                v-model="creature.system"
                placeholder="Pathfinder"
              ></b-form-input>
            </b-form-group>
            <!-- todo add preview after setting image -->
            <b-form-group
              id="input-image-group"
              label="Image link"
              label-for="input-image"
            >
              <b-form-input
                id="input-image"
                v-model="creature.image"
                placeholder="http://google.image.share/..."
              ></b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="basic">
            <!-- todo add dropdown -->
            <b-form-group
              id="input-size-group"
              label="Size"
              label-for="input-size"
            >
              <multiselect
                id="input-size"
                v-model="creature.size"
                :options="options.size"
                :searchable="false"
                :clear-on-select="false"
                :show-labels="false"
                :preselect-first="false"
              ></multiselect>
            </b-form-group>
            <!-- todo add suggestion based dropdown with custom option -->
            <b-form-group
              id="input-type-group"
              label="Type"
              label-for="input-type"
            >
              <b-form-input
                id="input-type"
                v-model="creature.type"
                placeholder="humanoid"
              ></b-form-input>
            </b-form-group>
            <!-- todo add alignment edit component -->
            <!-- <b-form-group
              id="input-alignment-group"
              label="Alignment"
              label-for="input-alignment"
            >
              <b-form-input
                id="input-alignment"
                v-model="creature.alignment"
                placeholder="chaotic evil"
              ></b-form-input>
            </b-form-group> -->
            <b-form-group
              id="input-ac-group"
              label="Armor class"
              label-for="input-ac"
            >
              <b-form-input
                id="input-ac"
                v-model="creature.ac"
                placeholder="13"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <!-- todo reanable hitdice after removing hitpoints -->
            <b-form-group
              id="input-hp-group"
              label="Hitpoints"
              label-for="input-hp"
            >
              <b-form-input
                id="input-hp"
                v-model="creature.hp"
                placeholder="13"
                number
                @keypress="isNumber"
                :disabled="creature.hitDice"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-hit-dice-group"
              label="Hit Dice"
              label-for="input-hit-dice"
            >
              <b-form-input
                id="input-hit-dice"
                v-model="creature.hitDice"
                placeholder="8"
                number
                @keypress="isNumber"
                :disabled="creature.hp !== undefined"
              ></b-form-input>
            </b-form-group>
            <!-- todo put this on the same line as hit dice -->
            <b-form-group
              id="input-hit-dice-amount-group"
              label="# hit dice"
              label-for="input-hit-dice-amount"
            >
              <b-form-input
                id="input-hit-dice-amount"
                v-model="creature.amountHitDice"
                placeholder="3"
                number
                @keypress="isNumber"
                :disabled="
                  creature.hitDice === 0 || creature.hitDice === undefined
                "
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-strength-group"
              label="Strength"
              label-for="input-strength"
            >
              <b-form-input
                id="input-strength"
                v-model="creature.strength"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-dexterity-group"
              label="Dexterity"
              label-for="input-dexterity"
            >
              <b-form-input
                id="input-dexterity"
                v-model="creature.dexterity"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-constitution-group"
              label="Constitution"
              label-for="input-constitution"
            >
              <b-form-input
                id="input-constitution"
                v-model="creature.constitution"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-intelligence-group"
              label="Intelligence"
              label-for="input-intelligence"
            >
              <b-form-input
                id="input-intelligence"
                v-model="creature.intelligence"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-wisdom-group"
              label="Wisdom"
              label-for="input-wisdom"
            >
              <b-form-input
                id="input-wisdom"
                v-model="creature.wisdom"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-charisma-group"
              label="Charisma"
              label-for="input-charisma"
            >
              <b-form-input
                id="input-charisma"
                v-model="creature.charisma"
                placeholder="10"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-speed-group"
              label="Speed"
              label-for="input-speed"
            >
              <b-form-input
                id="input-speed"
                v-model="creature.speed"
                placeholder="30"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-flying-group"
              label="Flying Speed"
              label-for="input-flying"
            >
              <b-form-input
                id="input-flying"
                v-model="creature.flyingSpeed"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-swim-group"
              label="Swim Speed"
              label-for="input-swim"
            >
              <b-form-input
                id="input-swim"
                v-model="creature.swimSpeed"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-climb-group"
              label="Climbing Speed"
              label-for="input-climb"
            >
              <b-form-input
                id="input-climb"
                v-model="creature.climbSpeed"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-burrow-group"
              label="Burrow Speed"
              label-for="input-burrow"
            >
              <b-form-input
                id="input-burrow"
                v-model="creature.burrowSpeed"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-cr-group"
              label="Challenge Rating"
              label-for="input-cr"
            >
              <b-form-input
                id="input-cr"
                v-model="creature.cr"
                placeholder="2"
                number
                @keypress="isNumber"
              ></b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="meta">
            <b-form-group
              id="input-organisation-group"
              label="Organisation"
              label-for="input-organisation"
            >
              <pill-multiselect
                id="input-organisation"
                v-model="creature.organisation"
                :options="organisationOptions"
                :taggable="true"
                @tag="tagOrganisation"
                placeholder="Select size(s)"
              ></pill-multiselect>
              <!-- <b-form-input
                id="input-organisation"
                v-model="creature.organisation"
                placeholder="group (2-4)"
              ></b-form-input> -->
            </b-form-group>
            <b-form-group
              id="input-environment-group"
              label="Environment"
              label-for="input-environment"
            >
              <pill-multiselect
                id="input-environment"
                v-model="creature.environment"
                :options="environmentOptions"
                :taggable="true"
                @tag="tagEnvironment"
                placeholder="Select size(s)"
              ></pill-multiselect>
              <!-- <b-form-input
                id="input-environment"
                v-model="creature.environment"
                placeholder="any forest"
              ></b-form-input> -->
            </b-form-group>

            <b-form-group
              id="input-tags-group"
              label="Tags"
              label-for="input-tags"
            >
              <pill-multiselect
                id="input-tags"
                v-model="creature.tags"
                :options="tagsOptions"
                :taggable="true"
                @tag="tagTag"
                placeholder="Select size(s)"
              ></pill-multiselect>
              <!-- <b-form-input
                id="input-tags"
                v-model="creature.tags"
                placeholder="hairy, pack"
              ></b-form-input> -->
            </b-form-group>

            <b-form-group
              id="input-comments-group"
              label="Comments"
              label-for="input-comments"
            >
              <b-form-textarea
                id="input-comments"
                v-model="creature.comments"
                placeholder="Something interesting..."
                rows="3"
              ></b-form-textarea>
            </b-form-group>
          </b-tab>
        </b-tabs>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { creatureStore, filterStore } from "@/store";
import { Creature } from "@/types/creatures";
import { BForm, BvModalEvent } from "bootstrap-vue";
import Vue from "vue";
import PillMultiselect from "../shared/PillMultiselect.vue";
import { Multiselect } from "vue-multiselect";
import { filterMapper } from "@/store/filter";

function createCreature(): Creature {
  return {
    name: "",
    size: "Medium",
    alignment: [],
    organisation: [],
    environment: [],
    tags: [],
  };
}

export default Vue.extend({
  components: {
    "pill-multiselect": PillMultiselect,
    Multiselect,
  },
  data() {
    return {
      creature: createCreature(),
      options: {
        size: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
      },
      validState: {
        validated: false,
      },
    };
  },
  async created() {
    if (!filterStore.state.initialized) {
      await filterStore.actions.fetchSearch();
    }
    this.reset();
  },
  computed: {
    ...filterMapper.mapState([
      "tagsOptions",
      "environmentOptions",
      "organisationOptions",
    ]),
  },
  methods: {
    async tagEnvironment(newEnvironment: string) {
      await filterStore.actions.addEnvironment(newEnvironment);
      this.creature.environment.push(newEnvironment);
    },
    async tagOrganisation(newOrganisation: string) {
      await filterStore.actions.addOrganisation(newOrganisation);
      this.creature.organisation.push(newOrganisation);
    },
    async tagTag(newTag: string) {
      await filterStore.actions.addTag(newTag);
      this.creature.tags.push(newTag);
    },
    reset() {
      this.creature = createCreature();
      this.validState.validated = false;
    },
    async ok(e: BvModalEvent) {
      e.preventDefault();
      await this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Todo: set hpFormula
      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      await creatureStore.actions.createCreature(this.creature);
      await filterStore.actions.fetchSearch();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("create-modal");
      });
    },
    checkFormValidity() {
      var form = this.$refs?.form as BForm;
      const valid = form.checkValidity();
      this.validState.validated = true;
      return valid;
    },
    hide(e: BvModalEvent) {
      if (e.trigger === "backdrop") {
        e.preventDefault();
      }
    },
    isNumber(evt: KeyboardEvent | undefined): boolean {
      if (evt) {
        switch (evt.key) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          case "0":
            return true;
          default:
            evt.preventDefault();
            return false;
        }
      }
      return false;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
