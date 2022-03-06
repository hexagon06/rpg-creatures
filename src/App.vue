<template>
  <div id="app" class="container-fluid mh-100 h-100 d-flex flex-column">
    <div class="d-flex shadow-sm">
      <div id="nav" class="header">
        <span v-for="(link, i) in filteredLinks" :key="i"
          >{{ i > 0 ? " | " : ""
          }}<router-link :to="link.path">{{ link.label }}</router-link></span
        >
      </div>
      <user-sign class="ml-auto p-4"></user-sign>
    </div>
    <router-view class="flex-1-1-0" />
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { userStore } from "./store";
import { userMapper } from "./store/users";

export default Vue.extend({
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
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-active {
      color: #42b983;
    }
  }
}

.header {
}
.footer {
  height: $footer-height;
}
</style>

<style src="../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect__tags {
  padding: 0 40px 0 8px;
}
</style>
