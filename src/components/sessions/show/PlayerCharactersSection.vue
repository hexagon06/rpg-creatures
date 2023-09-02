<template>
  <div class="flex flex-col gap-1">
    <h3>{{ modelValue.label }}</h3>
    <div v-for="(character, i) in modelValue.characters"
         :key="i"
         class="flex gap-2 flex-grow bg-brown-dark">
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
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<PlayerCharacterPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
