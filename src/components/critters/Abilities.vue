<template>
  <div class="grid grid-flow-row gap-x-6 gap-y-3 grid-cols-6">
    <div>STR</div>
    <div>DEX</div>
    <div>CON</div>
    <div>INT</div>
    <div>WIS</div>
    <div>CHA</div>

    <div cols="2">{{ toStr(abilities.strength) }}</div>
    <div cols="2">{{ toStr(abilities.dexterity) }}</div>
    <div cols="2">
      {{ toStr(abilities.constitution) }}
    </div>
    <div cols="2">
      {{ toStr(abilities.intelligence) }}
    </div>
    <div cols="2">{{ toStr(abilities.wisdom) }}</div>
    <div cols="2">{{ toStr(abilities.charisma) }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { RPGAbilities } from "@/types";
import { toMod } from "@/shared";

import { defineComponent } from 'vue'
export default defineComponent({
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

<style lang="scss" scoped></style>
