<template>
  <div class="text-purple mr-4">
    <div v-if="isSignedIn" class="flex gap-2 items-center">
      <span v-if="currentUser.displayName" class="mr-3 hidden md:block">{{
        currentUser.displayName
      }}</span>
      <span v-else class="mr-3 hidden md:block">{{ currentUser.email }}</span>
      <button
        @click="signOut"
        class="text-3xl transition ease-in-out hover:scale-110 hover:text-gold"
      >
        <font-awesome-icon icon="fa-solid fa-user" />
      </button>
    </div>
    <div v-else>
      <button
        @click="startSignIn"
        class="button-round-large button-on-dark-blue"
      >
        <font-awesome-icon icon="fa-solid fa-key" />
      </button>
      <transition>
        <form v-if="isSigningIn" @submit="signIn">
          <modal :is-valid="isValid" @reject="cancel" class="text-white">
            <div class="w-52 flex flex-col gap-1 text-dark-blue">
              <input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                class="rounded-t-lg"
              />
              <input
                id="input-2"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
                class="rounded-b-lg"
              />
            </div>
          </modal>
        </form>
      </transition>
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
    isValid(): boolean {
      return this.form.email.length > 0 && this.form.password.length > 0;
    },
  },
  methods: {
    async signOut() {
      await auth.signOut();
      if (this.$router.currentRoute.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
    },
    startSignIn() {
      this.form.email = "";
      this.form.password = "";
      this.isSigningIn = true;
    },
    async signIn() {
      const { email, password } = this.form;
      try {
        await auth.signIn(email, password);
        this.isSigningIn = false;
      } catch (e) {}
    },
    cancel() {
      this.isSigningIn = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
