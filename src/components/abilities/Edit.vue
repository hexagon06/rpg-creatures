<template>
  <div>
    <button v-div.edit-modal>Edit</button>
    <div
      id="edit-modal"
      title="Edit-a-Ability"
      size="lg"
      scrollable
      @ok="ok"
      @hide="hide"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        :validated="validState.validated"
      >
        <ability-form v-model="abilityCopy" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from "lodash";
import Vue, { PropType } from "vue";
import { Ability } from "@/types/abilities";
import { useAbilityStore } from "@/store/abilities";

export default Vue.extend({
  props: {
    ability: {
      type: Object as PropType<Ability>,
      required: true,
    },
  },
  data() {
    return {
      validState: {
        validated: false,
      },
      abilityCopy: cloneDeep(this.ability),
    };
  },
  watch: {
    ability: "setCopy",
  },
  methods: {
    setCopy(value: Ability) {
      this.abilityCopy = cloneDeep(value);
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
      await useAbilityStore().updateAbility(this.abilityCopy);
      // Hide the modal manually
      this.$nextTick(() => {
        // this.$bvModal.hide("edit-modal");
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
