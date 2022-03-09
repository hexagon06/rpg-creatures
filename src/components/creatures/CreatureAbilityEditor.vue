<template>
  <div class="d-flex flex-column">
    <h2>Abilities</h2>
    <div class="flex-row">
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
    </div>

    <div v-for="am in abilityMapped" :key="am.ability.key" class="d-flex">
      <p>{{ am.ability.name }}</p>

      <creature-ability-value
        v-model="am.values"
        :ability="am.ability"
        class="mx-3"
        @input="valuesChanged"
      />

      <button
        variant="danger"
        class="ml-auto align-self-center"
        @click="remove(am.ability)"
      >
        -
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { abilityMapper } from "@/store";
import {
  Ability,
  CreatureAbilityValues,
  MappedAbility,
  toAbilityValues,
  toMappedAbility,
} from "@/types/abilities";
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
      return this.value.map(toAbilityValues);
    },
    abilityMapped(): MappedAbility[] {
      return this.abilityValues.map((values) =>
        toMappedAbility(this.abilities, values)
      );
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

      const abilityValues = this.abilityValues.concat([
        {
          key: value.key,
          variables: [],
          formulae: [],
        },
      ]);
      this.submit(abilityValues);
    },
    remove(ability: Ability) {
      const abilityValues = this.abilityMapped
        .filter((ma) => ma.values.key !== ability.key)
        .map((ma) => ma.values);
      this.submit(abilityValues);
    },
    submit(values: CreatureAbilityValues[]): void {
      this.$emit(
        "input",
        values.map((v) => JSON.stringify(v).replaceAll(",", "§"))
      );
    },
    valuesChanged(values: CreatureAbilityValues) {
      const abilityValues = this.abilityMapped.map((am) => am.values);
      this.submit(abilityValues);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
