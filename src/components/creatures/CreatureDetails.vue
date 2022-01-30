<template>
  <b-card
    :title="value.name"
    :sub-title="`${value.size} ${value.type}`"
    class="mt-3"
  >
    <b-container fluid>
      <array-pills :data="value.organisation" :variant="'badge-light'" />
      <array-pills :data="value.environment" :variant="'badge-secondary'" />
    </b-container>
    <thumbnail
      v-if="value.image"
      :height="imgSize"
      :width="imgSize"
      :url="value.image"
    ></thumbnail>
    <b-container fluid>
      <alignment :values="value.alignment"> </alignment>
      <favorite v-model="favorite" />
      <!-- Hit points -->
      <labeled-prop v-if="hasFormula" label="HP" :text="hpFormula" />
      <labeled-prop v-if="!hasFormula" label="HP" :amount="value.hp" />
      <labeled-prop
        v-if="!hasFormula"
        label="hit dice"
        :amount="value.hitDice"
      />
      <labeled-prop
        v-if="!hasFormula"
        label="amount hit dice"
        :amount="value.amountHitDice"
      />
      <labeled-prop
        v-if="!hasFormula"
        label="hp formula"
        :amount="value.hpFormula"
      />
      <labeled-prop label="AC" :amount="value.ac" />
      <labeled-prop label="CR" :amount="value.cr" />
    </b-container>
    <abilities :abilities="creatureAbilities"></abilities>
    <b-container fluid>
      <!-- Speed -->
      <labeled-prop label="speed" :amount="value.speed" />
      <labeled-prop label="flying" :amount="value.flyingSpeed" />
      <labeled-prop label="swim" :amount="value.swimSpeed" />
      <labeled-prop label="climbing" :amount="value.climbSpeed" />
      <labeled-prop label="burrow" :amount="value.burrowSpeed" />

      <hr v-if="skills.length > 0" />
      <creature-ability
        v-for="ma in skills"
        :key="ma.ability.key"
        :ability="ma.ability"
        :creature="value"
        :values="ma.values"
      />
      <hr v-if="actions.length > 0" />
      <creature-ability
        v-for="ma in actions"
        :key="ma.ability.key"
        :ability="ma.ability"
        :creature="value"
        :values="ma.values"
      />
      <hr />
      <array-pills :data="value.tags" :variant="'badge-success'" />
      <b-row v-if="value.comments">
        <b-col>
          <p class="bg-light border border-info rounded-sm">
            {{ value.comments }}
          </p>
        </b-col>
      </b-row>
      <b-row v-if="value.system">
        <b-col>{{ value.system }}</b-col>
      </b-row>
      <source-reference
        :link="value.link"
        :page="value.page"
        :source="value.source"
      ></source-reference>
    </b-container>
  </b-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature, RPGAbilities } from "@/types/creatures";
import { abilityMapper } from "@/store";
import { toHitDiceFormula, toMod } from "@/shared";
import LabeledProp from "../shared/LabeledProp.vue";
import {
  MappedAbility,
  toAbilityValues,
  toMappedAbility,
} from "@/types/abilities";

export default Vue.extend({
  components: { LabeledProp },
  props: {
    value: {
      type: Object as PropType<Creature>,
      required: true,
    },
    imgSize: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    ...abilityMapper.mapState(["abilities"]),
    creatureAbilities(): RPGAbilities {
      return { ...this.value };
    },
    favorite: {
      get(): boolean {
        return this.value.favorite;
      },
      async set(value: boolean) {
        if (this.value.id) {
          this.$emit("favorite", value);
        }
      },
    },
    conMod(): number | undefined {
      return toMod(this.value.constitution);
    },
    hpFormula(): string {
      return toHitDiceFormula(
        this.value.hitDice,
        this.value.amountHitDice,
        this.conMod
      );
    },
    hasFormula(): boolean {
      return this.hpFormula.length > 0;
    },
    mappedAbilities(): MappedAbility[] {
      return this.value.abilityKeys.map((ak) =>
        toMappedAbility(this.abilities, toAbilityValues(ak))
      );
    },
    skills(): MappedAbility[] {
      return this.mappedAbilities.filter((ma) => ma.ability.type === "skill");
    },
    actions(): MappedAbility[] {
      return this.mappedAbilities.filter((ma) => ma.ability.type === "action");
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.card-body > .container-fluid {
  padding: 0;
}
</style>
