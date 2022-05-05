<template>
  <div class="text-purple mr-4">
    <div v-if="isIsSignedIn" class="flex gap-2 items-center">
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
        <form v-if="isSigningIn" @submit.stop.prevent="signIn">
          <modal :is-valid="isValid" @reject="cancel" class="text-white">
            <div class="w-52 flex flex-col gap-1 text-dark-blue">
              <div id="firebaseui-auth-container" class="text-white"></div>
            </div>
          </modal>
        </form>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserInfo } from "@firebase/auth";
import { auth } from "@/api";
import { mapState } from "pinia";
import { useUserStore } from "@/store/users";

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
    ...mapState(useUserStore, ["currentUser", "isIsSignedIn"]),
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
      this.$nextTick().then(() => {
        auth.signIn();
      });
    },
    async signIn() {
      const { email, password } = this.form;
      try {
        // await auth.signIn(email, password);
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

<style lang="scss">
.firebaseui-title {
  display: none;
}
.firebaseui-form-actions {
  display: flex;
  justify-content: space-between;
}
.firebaseui-list-item {
  & img {
    width: 1.5rem;
    max-height: 1, 5rem;
    max-width: 1, 5rem;
  }
  & .firebaseui-idp-text {
    display: none;
  }
  &::before {
    content: "Sign in with ";
    color: white;
  }
}
</style>
