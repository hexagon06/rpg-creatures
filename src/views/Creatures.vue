<template>
  <div class="flex-grow-1 mb-20">
    <transition name="fade" mode="out-in">
      <router-view class="mx-4"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { indexesMapper } from "@/store";
import { userMapper } from "@/store/users";

export default Vue.extend({
  data() {
    return {
      sidebarCreatureOpen: false,
    };
  },
  computed: {
    ...indexesMapper.mapState(["creatures", "initialized"]),
    ...userMapper.mapState(["currentUser"]),
    loading(): boolean {
      return this.initialized === false;
    },
  },
});
</script>

