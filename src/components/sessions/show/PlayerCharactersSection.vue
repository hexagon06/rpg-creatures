<template>
  <div class="flex flex-col gap-1">
    <h3>{{ value.label }}</h3>
    <div
      v-for="(character, i) in value.characters"
      :key="i"
      class="flex gap-2 flex-grow bg-brown-dark"
    >
      <div class="flex-grow flex gap-x-2 flex-wrap">
        <b class="w-full md:w-1/4">{{ character.player }}</b>
        <p class="flex-grow">{{ character.playerHappiness }}</p>
        <b class="w-full md:w-1/4">{{ character.character }}</b>
        <p class="flex-grow">{{ character.characterHooks }}</p>
      </div>
    </div>
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
