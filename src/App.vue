<template>
  <div id="app" class="max-h-screen">
    <div
      class="
        flex
        shadow-sm
        bg-dark-blue
        py-2
        border-b-gold border-b-4
        sticky
        top-0
      "
    >
      <!-- <div class=""></div> -->
      <div id="nav" class="flex grow gap-3 justify-center pl-52">
        <span v-for="(link, i) in filteredLinks" :key="i">
          <router-link :to="link.path" class="text-gold font-bold text-lg">
            {{ link.label }}
          </router-link>
        </span>
      </div>
      <user-sign class=""></user-sign>
    </div>
    <div class="flex">
      <router-view
        class="w-auto trasition-padding ease-in md:pl-52 flex-1-1-0"
      />
      <action-panel class="w-52 align-self-start" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ActionPanel from "./components/ActionPanel.vue";
import { userStore } from "./store";
import { userMapper } from "./store/users";

export default Vue.extend({
  components: { ActionPanel },
  data() {
    return {
      links: [
        { label: "Home", path: "/home" },
        { label: "Encounters", path: "/encounter", condition: true },
        { label: "Creatures", path: "/creatures", condition: true },
        // { label: "Shops", path: "/shops", condition: true },
        // { label: "Abilities", path: "/abilities", condition: true },
        // {
        //   label: "Maintenance",
        //   path: "/maintenance",
        //   condition: true,
        //   admin: true,
        // },
      ],
    };
  },
  computed: {
    ...userMapper.mapState(["isAdmin"]),
    signedIn(): boolean {
      return userStore.getters.isIsSignedIn();
    },
    filteredLinks(): { label: string; path: string }[] {
      return this.links.filter((l) => {
        const c = l.condition ? this.signedIn : true;
        const a = true; //l.admin ? this.isAdmin : true;
        return c && a;
      });
    },
  },
});
</script>


<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-link-active {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: $rouge;
}
</style>

<style src="../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect__tags {
  padding: 0 40px 0 8px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
