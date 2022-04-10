<template>
  <div>
    <button v-div.create-modal>Create</button>
    <div
      id="create-modal"
      title="Create-an-Ability"
      size="lg"
      scrollable
      @show="reset"
      @ok="ok"
      @hide="hide"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        :validated="validState.validated"
      >
        <ability-form v-model="ability" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Ability } from "@/types/abilities";
import { Guid } from "@/shared";
import { useFilterStore } from "@/store/filter";
import { useAbilityStore } from "@/store/abilities";

function createAbility(): Ability {
  return {
    name: "",
    key: Guid.newGuid(),
    text: "",
    tags: [],
    dice: [],
    type: "skill",
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
    async ok(e: Event) {
      e.preventDefault();
      await this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Todo: set hpFormula
      await useAbilityStore().createAbility(this.ability);
      await useFilterStore().fetchSearch();
      this.saved = {};
      // Hide the modal manually
      this.$nextTick(() => {
        // this.$bvModal.hide("create-modal");
      });
    },
    checkFormValidity() {
      return false;
      // var form = this.$refs?.form as BForm;
      // const valid = form.checkValidity();
      // this.validState.validated = true;
      // return valid;
    },
    hide(e: Event) {
      // if (e.trigger === "backdrop") {
      e.preventDefault();
      // }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
