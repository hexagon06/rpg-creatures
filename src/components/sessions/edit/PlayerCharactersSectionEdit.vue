<template>
  <div class="flex flex-col gap-1">
    <input-wrapper label="Group name">
      <input id="input-1" v-model="value.label" placeholder="Adventurers..." />
    </input-wrapper>
    <div class="flex gap-2 flex-col">
      <div
        v-for="(character, i) in value.characters"
        :key="i"
        class="flex gap-2 flex-grow bg-brown-dark"
      >
        <div class="flex-grow grid grid-cols-1 md:grid-cols-3 gap-x-2">
          <input-wrapper label="Player" class="">
            <input id="input-1" v-model="character.player" placeholder="Name" />
          </input-wrapper>
          <input-wrapper label="Player happiness" class="md:col-span-2">
            <input
              id="input-1"
              v-model="character.playerHappiness"
              placeholder="Just wants to play..."
            />
          </input-wrapper>

          <input-wrapper label="Character" class="">
            <input
              id="input-1"
              v-model="character.character"
              placeholder="The adventurer (bard)"
            />
          </input-wrapper>
          <input-wrapper label="Character hooks" class="md:col-span-2">
            <input
              id="input-1"
              v-model="character.characterHooks"
              placeholder="Always wants..."
            />
          </input-wrapper>
        </div>
        <button @click="remove(i)" class="button-round button-on-rouge">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="create()" class="button-round button-on-brown">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
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
  methods: {
    create() {
      this.value.characters.push({
        player: "",
        character: "",
        playerHappiness: "",
        characterHooks: "",
      });
    },
    remove(index: number) {
      this.value.characters = this.value.characters
        .slice(0, index)
        .concat(this.value.characters.slice(index + 1));
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
