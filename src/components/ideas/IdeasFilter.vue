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
import { useIdeaStore } from "@/store/ideas";

import { defineComponent } from 'vue'
export default defineComponent({
  methods: {
    async create() {
      const id = await useIdeaStore().createIdea();
      this.$router.push(`/idea/${id}/edit`);
    },
  },
});
</script>

<style lang="scss" scoped></style>
