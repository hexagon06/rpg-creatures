<template>
  <div v-if="isLoading" class="d-flex w-100 justify-content-center">
    <b-spinner type="grow" label="Loading..."></b-spinner>
  </div>
  <b-container v-else class="d-flex" fluid>
    <b-row class="mb-5">
      <b-col cols="8">
        <b-form
          ref="form"
          @submit.stop.prevent="handleSubmit"
          :validated="validState.validated"
        >
          <creature-form v-model="creatureCopy" />
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
      <b-col>
        <creature-details
          v-model="creatureCopy"
          :imgSize="278"
          @favorite="favoriteChange"
          class="sticky-top"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import {
  abilityStore,
  creatureMapper,
  creatureStore,
  filterStore,
} from "@/store";
import { Creature } from "@/types/creatures";
import { BForm } from "bootstrap-vue";
import { cloneDeep } from "lodash";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      validState: {
        validated: false,
      },
      creatureCopy: {} as Creature,
      isLoading: true,
    };
  },
  computed: {
    ...creatureMapper.mapState(["selectedCreature"]),

    id(): string {
      return this.$route.params.id;
    },
  },
  watch: {
    selectedCreature: "updateFromStore",
  },
  async created() {
    if (!abilityStore.state.initialized) {
      await abilityStore.actions.initialize();
    }
    await creatureStore.actions.setSelectedCreature(this.id);
    this.isLoading = false;
  },
  methods: {
    updateFromStore() {
      console.log("updateFromStore");
      var creature = creatureStore.state.selectedCreature; //.getters.get(this.id);
      if (creature) {
        this.creatureCopy = cloneDeep(creature);
      }
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
    favoriteChange(value: boolean) {
      this.creatureCopy.favorite = value;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
