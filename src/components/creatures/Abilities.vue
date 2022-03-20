<template>
  <div class="grid gap-x-6 gap-y-3 grid-cols-6 grid-rows-2">
    <div class="border-right">STR</div>
    <div class="border-right">DEX</div>
    <div class="border-right">CON</div>
    <div class="border-right">INT</div>
    <div class="border-right">WIS</div>
    <div>CHA</div>

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
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { RPGAbilities } from "@/types/creatures";
import { toMod } from "@/shared";

export default Vue.extend({
  props: {
    abilities: {
      type: Object as PropType<RPGAbilities>,
      default: undefined,
    },
  },
  methods: {
    toStr(value: number | undefined): string {
      if (value) {
        const mod = this.modString(toMod(value));
        return `${value.toString()} ${mod}`;
      } else {
        return "?";
      }
    },
    modString(mod?: number): string | undefined {
      if (mod !== undefined) {
        if (mod < 0) return `(${mod.toString()})`;
        else return `(+${mod})`;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
