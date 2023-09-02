<template>
  <div id="app"
       class="max-h-screen">
    <div class="flex shadow-sm bg-dark-blue py-2 border-b-gold border-b-4 fixed top-0 left-0 right-0 z-[1040]">
      <img src="../favicon_io/favicon-32x32.png"
           class="rounded-full bg-gold w-9 h-9 align-middle items-center ml-2 hidden md:block" />
      <!-- links -->
      <div id="nav"
           class="hidden md:flex grow gap-3 justify-center">
        <span v-for="(link, i) in filteredLinks"
              :key="i">
          <router-link :to="link.path"
                       class="text-gold font-bold text-lg">
            {{ link.label }}
          </router-link>
        </span>
      </div>
      <div class="flex ml-4 md:hidden grow gap-3 justify-center">
        <button v-if="filteredLinks.length > 1"
                class="self-start button-round-large button-on-dark-blue hover:bg-rouge"
                @click="toggleMenu">
          <img src="../favicon_io/favicon-32x32.png" />
        </button>
        <div class="flex-col flex-grow justify-items-center"
             :class="filteredLinks.length > 1 ? '' : ' ml-16'">
          <div v-for="(link, i) in filteredLinks"
               :key="i"
               class="flex justify-center">
            <router-link :to="link.path"
                         class="text-gold font-bold text-lg"
                         :class="hiddenMenuOption(link.path)"
                         @click="toggleMenu">
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- login -->
      <user-sign class="" />
    </div>
    <div class="flex flex-col mt-3">
      <action-panel class="w-full md:w-52 align-self-start sticky md:fixed top-14 right-0 z-[99]" />
      <!-- hidden
        md:block -->
      <router-view class="w-auto trasition-padding ease-in md:px-52 flex-1-1-0 max-w-full mt-16 md:mt-14" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ActionPanel from './components/ActionPanel.vue';
import { useUserStore } from './store/users';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const links = [
  { label: 'Home', path: '/home', condition: false },
  { label: 'Ideas', path: '/idea', condition: true },
  { label: 'Sessions', path: '/session', condition: true },
  { label: 'Encounters', path: '/encounter', condition: true },
  { label: 'Creatures', path: '/creature', condition: true },
  { label: 'Lists', path: '/list', condition: true },
  {
    label: 'Maintenance',
    path: '/maintenance',
    condition: true,
    admin: true,
  },
  { label: 'New Creatures', path: '/critter', condition: true },
]
const menuOpen = ref(false)

const { isAdmin, isIsSignedIn } = storeToRefs(useUserStore())
// ...mapState(useUserStore, ['isAdmin', 'isIsSignedIn']),

const filteredLinks = computed<{ label: string; path: string }[]>(() => {
  return links.filter((l) => {
    const c = l.condition ? isIsSignedIn.value : true;
    const a = true; //l.admin ? this.isAdmin : true;
    return c && a;
  });
})

const route = useRoute()

function hiddenMenuOption(path: string): string {
  const containsPath = route.path.startsWith(path);
  return containsPath || menuOpen.value ? '' : ' hidden';
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

// export default {
// components: { ActionPanel },
// data() {
//   return {

//   };
// },
// computed: {

//   methods: {
    
//   },
// };
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// .router-link-active {
//   -webkit-text-stroke-width: 1px;
//   -webkit-text-stroke-color: $rouge;
// }
</style>

<!-- <style src="../node_modules/vue-multiselect/dist/vue-multiselect.min.css"> -->

<!-- </style> -->
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
