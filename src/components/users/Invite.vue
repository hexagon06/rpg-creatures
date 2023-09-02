<template>
  <div class="d-flex">
    <form ref="form"
          @submit="sendInvite"
          class="d-flex flex-grow-1">
      <div id="input-group-1"
           label-for="input-1"
           description="Email of the person you want to invite."
           class="flex-grow-1">
        <input id="input-1"
               v-model="email"
               type="email"
               placeholder="Enter email"
               required />
      </div>
      <button variant="primary"
              type="submit"
              class="align-self-start ml-3">
        invite
      </button>
    </form>
  </div>
</template>

<script lang="ts">
// import { createByEmail } from "@/api/auth";

import { defineComponent } from 'vue'
export default defineComponent({
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

<style lang="scss" scoped></style>
