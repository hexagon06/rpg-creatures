<template>
  <div>
    players
    <input-wrapper
      label="Chapter Title"
      validation="Invalid title"
      :is-valid="value.label && value.label.length > 0"
    >
      <input
        id="input-1"
        v-model="value.label"
        placeholder="Chapter title"
        aria-describedby="password-help-block"
        required
      />
      <template v-slot:help> What is the following data about </template>
    </input-wrapper>
    <hr />
  </div>
</template>

<script lang="ts">
import { PlayerCharacterPrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<PlayerCharacterPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
