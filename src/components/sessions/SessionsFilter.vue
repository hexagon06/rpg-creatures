<template>
  <action-panel-filter>
    <template v-slot:buttons>
      <button @click="create"
              class="button-round-large button-on-gold"
              title="create">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </template>
  </action-panel-filter>
</template>

<script lang="ts">
import { useSessionStore } from "@/store/gameSession";

import { defineComponent } from 'vue'
export default defineComponent({
  methods: {
    async create() {
      const id = await useSessionStore().createSession();
      this.$router.push(`/session/${id}/edit`);
    },
  },
});
</script>

<style lang="scss" scoped></style>
