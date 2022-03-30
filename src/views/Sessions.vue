<template>
  <div class="flex-grow-1 mb-20">
    <transition name="fade" mode="out-in">
      <router-view class="mx-4"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
</style>
