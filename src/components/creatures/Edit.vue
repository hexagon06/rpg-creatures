<template>
  <div>
    <b-button v-b-modal.edit-modal>Edit</b-button>
    <b-modal
      id="edit-modal"
      title="Edit-a-Creature"
      size="lg"
      scrollable
      @ok="ok"
      @hide="hide"
    >
      <b-form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        :validated="validState.validated"
      >
        <creature-form v-model="creatureCopy" />
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { creatureStore, filterStore } from "@/store";
import { Creature } from "@/types/creatures";
import { BForm, BvModalEvent } from "bootstrap-vue";
import { cloneDeep } from "lodash";
import Vue, { PropType } from "vue";
import CreatureForm from "./CreatureForm.vue";

export default Vue.extend({
  components: {
    "creature-form": CreatureForm,
  },
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
    async ok(e: BvModalEvent) {
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
        this.$bvModal.hide("edit-modal");
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
