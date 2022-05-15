<template>
  <div class="flex-grow-1 mb-20">
    <transition name="fade" mode="out-in">
      <world v-if="id" :id="id" />
      <div v-else>No world created or selected. Please do so now --></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useWorldStore } from "@/store/worlds";
import Vue from "vue";
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  async created() {
    if (this.id === undefined) {
      const { lastWorldId } = useWorldStore();
      if (lastWorldId) {
        this.$router.push({ name: "World", params: { id: lastWorldId } });
      }
    }
    if (this.id) {
      this.fetchWorld(this.id);
    }
  },
  watch: {
    id: "fetchWorld",
  },
  methods: {
    async fetchWorld(id: string) {
      console.log("fetchWorld", id);

      // const store = useWorldStore();
      // await store.fetch(id);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
