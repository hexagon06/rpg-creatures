<template>
  <div class="d-flex">
    <div v-if="format.variables.length > 0">
      <label>Variables</label>
      <div id="input-name-group" class="flex-fill">
        <input
          v-for="kvp in variables"
          :key="kvp.k"
          :id="`input-var-${kvp.k}-name`"
          v-model="kvp.v"
          :placeholder="kvp.k"
          @input="changeValue"
          required
        />
      </div>
    </div>
    <div v-if="format.formulae.length > 0">
      <label>Formulae</label>
      <div
        id="`input-var-${kvvp.k}`"
        v-for="kvvp in formulae"
        :key="kvvp.k"
        :label="kvvp.k"
        :label-for="`input-var-${kvvp.k}-amount`"
        class="flex-fill"
      >
        <input
          :id="`input-var-${kvvp.k}-amount`"
          v-model="kvvp.a"
          placeholder="amount"
          @input="changeValue"
          required
        />
        <input
          :id="`input-var-${kvvp.k}-dice`"
          v-model="kvvp.n"
          placeholder="dice"
          @input="changeValue"
          required
        />
        <input
          :id="`input-var-${kvvp.k}-mod`"
          v-model="kvvp.m"
          placeholder="mod"
          @input="changeValue"
          required
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AbilityFormat, parseFormatText } from "@/shared/abilityFormatting";
import { Ability, CreatureAbilityValues } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<CreatureAbilityValues>,
      required: true,
    },
    ability: {
      type: Object as PropType<Ability>,
      required: true,
    },
  },
  computed: {
    format(): AbilityFormat {
      return parseFormatText(this.ability.text);
    },
    variables(): { k: string; v: string }[] {
      return this.format.variables.map((v) => {
        const value = this.value.variables.find((kvp) => kvp.k === v);
        return {
          k: v,
          v: value?.v ?? "",
        };
      });
    },
    formulae(): { k: string; a: number; n: number }[] {
      return this.format.formulae.map((v) => {
        const value = this.value.formulae.find((kvvp) => kvvp.k === v);
        return {
          k: v,
          a: value?.a ?? 0,
          n: value?.n ?? 0,
          m: value?.m ?? 0,
        };
      });
    },
  },
  methods: {
    changeValue() {
      this.$emit("input", {
        ...this.value,
        variables: this.variables,
        formulae: this.formulae,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
