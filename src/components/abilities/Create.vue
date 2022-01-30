<template>
  <div>
    <b-button v-b-modal.create-modal>Create</b-button>
    <b-modal
      id="create-modal"
      title="Create-an-Ability"
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
        <ability-form v-model="ability" />
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BForm, BvModalEvent } from "bootstrap-vue";
import { abilityStore, filterStore } from "@/store";
import { Ability } from "@/types/abilities";
import { Guid } from "@/shared";

function createAbility(): Ability {
  return {
    name: "",
    key: Guid.newGuid(),
    text: "",
    tags: [],
    dice: [],
    isAction: false,
  };
}

export default Vue.extend({
  data() {
    return {
      ability: createAbility(),
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
      this.ability = { ...createAbility(), ...this.saved };
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
      await abilityStore.actions.createAbility(this.ability);
      await filterStore.actions.fetchSearch();
      this.saved = {};
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
