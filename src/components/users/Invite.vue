<template>
  <div class="d-flex">
    <b-form ref="form" @submit="sendInvite" class="d-flex flex-grow-1">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
        description="Email of the person you want to invite."
        class="flex-grow-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" type="submit" class="align-self-start ml-3"
        >invite</b-button
      >
    </b-form>
  </div>
</template>

<script lang="ts">
// import { createByEmail } from "@/api/auth";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async sendInvite() {
      // await createByEmail(this.email);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
