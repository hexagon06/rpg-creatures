<template>
  <div class="flex-grow-1 mb-20">
    <router-view class="mx-4"
                 v-slot="{ Component }">
      <transition name="fade"
                  mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">

import { useUserStore } from "@/store/users";
import { mapState } from "pinia";
import { ListCreature } from "@/types/creatures";
import { creatureApi } from "@/api/new-typed/creatureApi";
// import { useIndexesStore } from "@/store/indexes";

import { defineComponent } from 'vue'
export default defineComponent({
  async created() {
    const creatures = await creatureApi.list()
    this.creatures = creatures
    this.initialized = true;
  },
  data() {
    return {
      sidebarCreatureOpen: false,
      creatures: [] as ListCreature[],
      initialized: false
    };
  },
  computed: {
    // ...mapState(useIndexesStore, ["creatures", "initialized"]),
    ...mapState(useUserStore, ["currentUser"]),
    loading(): boolean {
      return this.initialized === false;
    },
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
