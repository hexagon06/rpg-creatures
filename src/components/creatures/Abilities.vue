<template>
  <div fluid>
    <div class="flex w-full">
      <div class="border-right">STR</div>
      <div class="border-right">DEX</div>
      <div class="border-right">CON</div>
      <div class="border-right">INT</div>
      <div class="border-right">WIS</div>
      <div>CHA</div>
    </div>
    <div>
      <div cols="2" class="border-right">{{ toStr(abilities.strength) }}</div>
      <div cols="2" class="border-right">{{ toStr(abilities.dexterity) }}</div>
      <div cols="2" class="border-right">
        {{ toStr(abilities.constitution) }}
      </div>
      <div cols="2" class="border-right">
        {{ toStr(abilities.intelligence) }}
      </div>
      <div cols="2" class="border-right">{{ toStr(abilities.wisdom) }}</div>
      <div cols="2">{{ toStr(abilities.charisma) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { RPGAbilities } from "@/types/creatures";

export default Vue.extend({
  props: {
    abilities: {
      type: Object as PropType<RPGAbilities>,
      default: undefined,
    },
  },
  methods: {
    toStr(value: number | undefined): string {
      return value !== undefined ? value.toString() : "?";
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
