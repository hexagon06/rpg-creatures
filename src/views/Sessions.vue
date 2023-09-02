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

import { defineComponent } from 'vue'
export default defineComponent({});
</script>

<style lang="scss" scoped></style>
