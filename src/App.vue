<template>
  <div id="app" class="max-h-screen">
    <div
      class="
        flex
        shadow-sm
        bg-dark-blue
        py-2
        border-b-gold border-b-4
        fixed
        top-0
        left-0
        right-0
        z-[100]
      "
    >
      <!-- links -->
      <div id="nav" class="hidden md:flex grow gap-3 justify-center pl-52">
        <span v-for="(link, i) in filteredLinks" :key="i">
          <router-link :to="link.path" class="text-gold font-bold text-lg">
            {{ link.label }}
          </router-link>
        </span>
      </div>
      <div class="flex ml-4 md:hidden grow gap-3 justify-center">
        <button
          v-if="filteredLinks.length > 1"
          @click="toggleMenu"
          class="self-start button-round-large button-on-dark-blue"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <div
          class="flex-col flex-grow justify-items-center"
          :class="filteredLinks.length > 1 ? '' : ' ml-16'"
        >
          <div
            v-for="(link, i) in filteredLinks"
            :key="i"
            class="flex justify-center"
          >
            <router-link
              :to="link.path"
              class="text-gold font-bold text-lg"
              :class="hiddenMenuOption(link.path)"
              @click.native="toggleMenu"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- login -->
      <user-sign class=""></user-sign>
    </div>
    <div class="flex flex-col mt-3">
      <action-panel
        class="
          w-full
          md:w-52
          align-self-start
          sticky
          md:fixed
          top-14
          right-0
          z-[99]
        "
      />
      <!-- hidden
        md:block -->
      <router-view
        class="
          w-auto
          trasition-padding
          ease-in
          md:px-52
          flex-1-1-0
          max-w-full
          mt-16
          md:mt-14
        "
      />
    </div>
  </div>
</template>
<script lang="ts">
import { mapState } from "pinia";
import Vue from "vue";
import ActionPanel from "./components/ActionPanel.vue";
import { useUserStore } from "./store/users";

export default Vue.extend({
  components: { ActionPanel },
  data() {
    return {
      links: [
        { label: "Home", path: "/home" },
        { label: "Ideas", path: "/idea", condition: true },
        { label: "Sessions", path: "/session", condition: true },
        { label: "Encounters", path: "/encounter", condition: true },
        { label: "Creatures", path: "/creature", condition: true },
        { label: "Lists", path: "/list", condition: true },
        // { label: "Abilities", path: "/abilities", condition: true },
        // {
        //   label: "Maintenance",
        //   path: "/maintenance",
        //   condition: true,
        //   admin: true,
        // },
      ],
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["isAdmin", "isIsSignedIn"]),
    filteredLinks(): { label: string; path: string }[] {
      return this.links.filter((l) => {
        const c = l.condition ? this.isIsSignedIn : true;
        const a = true; //l.admin ? this.isAdmin : true;
        return c && a;
      });
    },
  },
  methods: {
    hiddenMenuOption(path: string): string {
      const containsPath = this.$route.path.includes(path);
      return containsPath || this.menuOpen ? "" : " hidden";
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
