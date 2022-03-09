<template>
  <div>
    <button v-div.edit-modal>Edit</button>
    <div
      id="edit-modal"
      title="Edit-a-Creature"
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
        <creature-form v-model="creatureCopy" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from "lodash";
import Vue, { PropType } from "vue";
import { creatureStore, filterStore } from "@/store";
import { Creature } from "@/types/creatures";

export default Vue.extend({
  props: {
    creature: {
      type: Object as PropType<Creature>,
      required: true,
    },
  },
  data() {
    return {
      validState: {
        validated: false,
      },
      creatureCopy: cloneDeep(this.creature),
    };
  },
  watch: {
    creature: "setCopy",
  },
  methods: {
    setCopy(value: Creature) {
      this.creatureCopy = cloneDeep(value);
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
      this.creatureCopy.page = this.creatureCopy.page?.toString();
      // Todo: set hpFormula
      await creatureStore.actions.updateCreature(this.creatureCopy);
      await filterStore.actions.fetchSearch();
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
