<template>
  <b-container fluid>
    <b-row no-gutters>
      <b-col cols="2" class="border-right">STR</b-col>
      <b-col cols="2" class="border-right">DEX</b-col>
      <b-col cols="2" class="border-right">CON</b-col>
      <b-col cols="2" class="border-right">INT</b-col>
      <b-col cols="2" class="border-right">WIS</b-col>
      <b-col cols="2">CHA</b-col>
    </b-row>
    <b-row no-gutters>
      <b-col cols="2" class="border-right">{{
        toStr(abilities.strength)
      }}</b-col>
      <b-col cols="2" class="border-right">{{
        toStr(abilities.dexterity)
      }}</b-col>
      <b-col cols="2" class="border-right">{{
        toStr(abilities.constitution)
      }}</b-col>
      <b-col cols="2" class="border-right">{{
        toStr(abilities.intelligence)
      }}</b-col>
      <b-col cols="2" class="border-right">{{ toStr(abilities.wisdom) }}</b-col>
      <b-col cols="2">{{ toStr(abilities.charisma) }}</b-col>
    </b-row>
  </b-container>
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
