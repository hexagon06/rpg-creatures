<template>
  <div>
    <h2>Abilities</h2>
    <multiselect
      id="input-size"
      v-model="selection"
      :options="abilityOptions"
      :clear-on-select="true"
      :preselect-first="false"
      placeholder="add ability"
      label="name"
      @input="addAbility"
    ></multiselect>
    <div v-for="am in abilityMapped" :key="am.ability.key">
      {{ am.ability.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { abilityMapper } from "@/store";
import { Ability } from "@/types/abilities";
import { differenceBy } from "lodash";
import Vue, { PropType } from "vue";
import Multiselect from "vue-multiselect";

export default Vue.extend({
  components: {
    Multiselect,
  },
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      selection: undefined as Ability | undefined,
    };
  },
  computed: {
    ...abilityMapper.mapState(["abilities"]),
    abilityValues(): CreatureAbilityValues[] {
      return this.value.map(
        (v) => JSON.parse(v.replaceAll("§", ",")) as CreatureAbilityValues
      );
    },
    abilityMapped(): { ability: Ability; values: CreatureAbilityValues }[] {
      return this.abilityValues.map((values) => {
        const ability = this.abilities.find((a) => a.key === values.key);
        if (ability) {
          return {
            values,
            ability,
          };
        } else {
          throw new Error("ability should not be undefined");
        }
      });
    },
    abilityOptions(): Ability[] {
      return differenceBy(
        this.abilities,
        this.abilityMapped.map((am) => am.ability),
        "key"
      );
    },
  },
  methods: {
    addAbility(value: Ability) {
      this.selection = undefined;

      this.$emit(
        "input",
        this.value.concat([
          JSON.stringify({
            key: value.key,
            variables: [],
            formulae: [],
          }).replaceAll(",", "§"),
        ])
      );
    },
  },
});

type kvp = { k: string; v: string };
type kvvp = { k: string; a: number; n: number };
type CreatureAbilityValues = {
  key: string;
  variables: kvp[];
  formulae: kvvp[];
};
</script>

<style lang="scss" scoped>
</style>
