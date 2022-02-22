<template>
  <div>
    <div v-if="isSignedIn">
      <span>{{ currentUser.displayName }}</span>
      <span>{{ currentUser.email }}</span>
      <b-button @click="signOut">sign out</b-button>
    </div>
    <div v-else>
      <b-button v-b-modal="'signin-modal'" @click="startSignIn"
        >sign in</b-button
      >
      <b-modal id="signin-modal" @ok="signIn">
        <b-form @submit="signIn">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Email address:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
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
