<template>
  <div>
    <b-button v-b-modal.edit-modal>Edit</b-button>
    <b-modal
      id="edit-modal"
      title="Edit-a-Shop"
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
        <shop-form v-model="shopCopy" />
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from "lodash";
import Vue, { PropType } from "vue";
import { BForm, BvModalEvent } from "bootstrap-vue";
import { shopStore } from "@/store";
import { Shop } from "@/types/shops";

export default Vue.extend({
  props: {
    shop: {
      type: Object as PropType<Shop>,
      required: true,
    },
  },
  data() {
    return {
      validState: {
        validated: false,
      },
      shopCopy: cloneDeep(this.shop),
    };
  },
  watch: {
    shop: "setCopy",
  },
  methods: {
    setCopy(value: Shop) {
      this.shopCopy = cloneDeep(value);
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
      await shopStore.actions.updateShop(this.shopCopy);
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
