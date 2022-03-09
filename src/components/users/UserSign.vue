<template>
  <div>
    <div v-if="isSignedIn">
      <span v-if="currentUser.displayName" class="mr-3">{{
        currentUser.displayName
      }}</span>
      <span v-else class="mr-3">{{ currentUser.email }}</span>
      <button @click="signOut">sign out</button>
    </div>
    <div v-else>
      <button @click="startSignIn">sign in</button>
      <div id="signin-modal" @ok="signIn">
        <form @submit="signIn">
          <div
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div id="input-group-2" label="Email address:" label-for="input-2">
            <input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { userMapper } from "@/store/users";
import { userStore } from "@/store";
import { UserInfo } from "@firebase/auth";
import { auth } from "@/api";

export default Vue.extend({
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isSigningIn: false,
      user: undefined as undefined | UserInfo,
    };
  },
  computed: {
    ...userMapper.mapState(["currentUser"]),
    isSignedIn(): boolean {
      return userStore.getters.isIsSignedIn();
    },
  },
  methods: {
    async signOut() {
      await auth.signOut();
    },
    startSignIn() {
      this.form.email = "";
      this.form.password = "";
    },
    async signIn() {
      const { email, password } = this.form;
      await auth.signIn(email, password);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
