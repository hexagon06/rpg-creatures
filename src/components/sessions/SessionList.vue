<template>
  <div>Session List</div>
</template>

<script lang="ts">
import { useSessionStore } from "@/store/gameSession";
import { mapState } from "pinia";
import Vue from "vue";
export default Vue.extend({
  computed: {
    ...mapState(useSessionStore, ["session"]),
  },
});
</script>

<style lang="scss" scoped>
</style>
