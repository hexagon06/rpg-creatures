<template>
  <action-panel-action>
    <button @click="back"
            class="button-round-large button-on-gold"
            title="back">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
  </action-panel-action>
</template>

<script lang="ts">

import { mapState } from "pinia";
import { useSessionStore } from "@/store/gameSession";
import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    ...mapState(useSessionStore, ["sessionForm", "session", "isDirty"]),
    isEditing(): boolean {
      return this.sessionForm !== undefined;
    },
  },
  methods: {
    async back() {
      await useSessionStore().stopEdit();
      this.$router.back();
    },
    async reset() {
      await useSessionStore().startEdit();
    },
    async save() {
      await useSessionStore().saveEdit();
    },
    async edit() {
      await useSessionStore().startEdit();
      this.$router.push(`/session/${useSessionStore().session?.id}/edit`);
    },
    async copy() {
      if (this.session) {
        const source = { ...this.session };
        const id = await useSessionStore().createSession();
        useSessionStore().session = {
          ...source,
          id,
        };
        await this.save();
        this.$router.push(`/session/${id}/edit`);
      } else throw new Error("cannot copy undefined session");
    },
    async create() {
      const id = await useSessionStore().createSession();
      this.$router.push(`/session/${id}/edit`);
    },
    setActive() {
      console.warn("setActive not implemented");
    },
    async startRun() {
      console.log("startRun");
      if (this.session && this.session.id) {
        const sessionId = this.session.id;
        const runId = await useSessionStore().createRunFor(sessionId);
        this.$router.push({
          name: "Session Run",
          params: { id: sessionId, runId },
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
