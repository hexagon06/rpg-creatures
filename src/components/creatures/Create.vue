<template>
  <div>
    <button>Create</button>
    <div
      id="create-modal"
      title="Create-a-Creature"
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
        <creature-form v-model="creature" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { creatureStore, filterStore } from "@/store";
import { Creature } from "@/types/creatures";
import { createDefaultCreature } from "@/shared";

function createCreature(): Creature {
  return createDefaultCreature("");
}

export default Vue.extend({
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
    async ok(e: Event) {
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
