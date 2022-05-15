<template>
  <div class="flex-grow-1 mb-20">
    <transition name="fade" mode="out-in">
      <world v-if="id" :id="id" />
      <div v-else>No world created or selected. Please do so now --></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/users";
import { useWorldStore } from "@/store/worlds";
import { mapState } from "pinia";
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
      console.log("created", this.id, lastWorldId);

      if (lastWorldId) {
        this.$router.push({ name: "World", params: { id: lastWorldId } });
      }
    }
  },
  computed: {
    ...mapState(useWorldStore, ["lastWorldId"]),
  },
  watch: {
    id: async function (newId) {
      if (newId && this.lastWorldId !== newId) {
        const userStore = useUserStore();
        if (userStore.userData) {
          userStore.userData.lastWorldId = newId;
          await userStore.saveData();
        }
      }
    },
    lastWorldId: function (newId) {
      if (newId && this.id === undefined) {
        this.$router.push({ name: "World", params: { id: newId } });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
