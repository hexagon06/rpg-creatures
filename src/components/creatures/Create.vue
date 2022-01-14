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
        <creature-form v-model="creature" />
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { creatureStore, filterStore } from "@/store";
import { Creature } from "@/types/creatures";
import { BForm, BvModalEvent } from "bootstrap-vue";
import Vue from "vue";
import CreatureForm from "./CreatureForm.vue";

function createCreature(): Creature {
  return {
    name: "",
    alignment: [],
    organisation: [],
    environment: [],
    tags: [],
    favorite: false,
  };
}

export default Vue.extend({
  components: {
    "creature-form": CreatureForm,
  },
  data() {
    return {
      creature: createCreature(),
      validState: {
        validated: false,
      },
      saved: {},
    };
  },
  async created() {
    this.reset();
  },
  methods: {
    reset() {
      this.creature = { ...createCreature(), ...this.saved };
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
      this.creature.page = this.creature.page?.toString();
      // Todo: set hpFormula
      await creatureStore.actions.createCreature(this.creature);
      await filterStore.actions.fetchSearch();
      this.saved = {
        source: this.creature.source,
        page: this.creature.page,
        system: this.creature.system,
        alignment: this.creature.alignment,
        type: this.creature.type,
      };
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
  },
});
</script>

<style lang="scss" scoped>
</style>
