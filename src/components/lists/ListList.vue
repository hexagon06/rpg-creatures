<template>
  <div class="flex justify-center">
    <div class="entity-grid">
      <grid-card
        v-for="list in lists"
        :key="list.id"
        :to="{ name: 'List', params: { id: list.id } }"
      >
        <div class="flex flex-col w-full h-full">
          <h2 class="mb-3">{{ list.name }}</h2>
          <p class="line-clamp-2">{{ list.itemCount }} items</p>
        </div>
      </grid-card>
    </div>
  </div>
</template>

<script lang="ts">
import { indexesMapper } from "@/store";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...indexesMapper.mapState(["lists", "initialized"]),
  },
});
</script>

<style lang="scss" scoped>
</style>
