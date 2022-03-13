<template>
  <div class="d-flex">
    <div class="sidebar border-right border-info pt-3 sticky-top">
      <div>
        <!-- <button
          variant="primary"
          @click="createEncounter"
          :disabled="!initialized"
        >
          Create
        </button> -->
      </div>
    </div>
    <div class="flex-grow-1 mb-20">
      <transition name="fade" mode="out-in">
        <router-view class="mx-4"></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
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
