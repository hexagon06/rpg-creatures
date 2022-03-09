<template>
  <div>
    <button v-div.edit-modal>Edit</button>
    <div
      id="edit-modal"
      title="Edit-a-Shop"
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
        <shop-form v-model="shopCopy" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from "lodash";
import Vue, { PropType } from "vue";
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
      await shopStore.actions.updateShop(this.shopCopy);
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
      e.preventDefault();
      // if (e.trigger === "backdrop") {
      // }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
