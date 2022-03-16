<template>
  <div
    :title="value.name"
    :sub-title="`${value.size} ${value.type}`"
    class="mt-3"
  >
    <h1>{{ value.name }}</h1>
    <div fluid>
      <array-pills :data="value.organisation" :variant="'badge-light'" />
      <array-pills :data="value.environment" :variant="'badge-secondary'" />
    </div>
    <thumbnail
      v-if="value.image"
      :height="imgSize"
      :width="imgSize"
      :url="value.image"
    ></thumbnail>
    <div fluid>
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
    </div>
    <abilities :abilities="creatureAbilities"></abilities>
    <div fluid>
      <!-- Speed -->
      <labeled-prop label="speed" :amount="value.speed" />
      <labeled-prop label="flying" :amount="value.flyingSpeed" />
      <labeled-prop label="swim" :amount="value.swimSpeed" />
      <labeled-prop label="climbing" :amount="value.climbSpeed" />
      <labeled-prop label="burrow" :amount="value.burrowSpeed" />

      <div v-if="skills.length > 0">
        <hr />
        <creature-ability
          v-for="ma in skills"
          :key="ma.ability.key"
          :ability="ma.ability"
          :creature="value"
          :values="ma.values"
        />
      </div>
      <div v-if="actions.length > 0">
        <h3 class="text-left mt-3">Actions</h3>
        <hr />
        <creature-ability
          v-for="ma in actions"
          :key="ma.ability.key"
          :ability="ma.ability"
          :creature="value"
          :values="ma.values"
        />
      </div>
      <div v-if="reactions.length > 0">
        <h3 class="text-left mt-3">Reactions</h3>
        <hr />
        <creature-ability
          v-for="ma in reactions"
          :key="ma.ability.key"
          :ability="ma.ability"
          :creature="value"
          :values="ma.values"
        />
      </div>
      <div v-if="legendaries.length > 0">
        <h3 class="text-left mt-3">Legendary Actions</h3>
        <hr />
        <p class="text-left">{{ legendaryActionText }}</p>
        <creature-ability
          v-for="ma in legendaries"
          :key="ma.ability.key"
          :ability="ma.ability"
          :creature="value"
          :values="ma.values"
        />
      </div>

      <hr />
      <array-pills :data="value.tags" :variant="'badge-success'" />
      <div v-if="value.comments">
        <div>
          <p class="bg-light border border-info rounded-sm">
            {{ value.comments }}
          </p>
        </div>
      </div>
      <div v-if="value.system">
        <div>{{ value.system }}</div>
      </div>
      <source-reference
        :link="value.link"
        :page="value.page"
        :source="value.source"
      ></source-reference>
    </div>
  </div>
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
import { getLegendaryText } from "@/shared/abilityFormatting";

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
      return this.value.abilityKeys.map((ak: string) =>
        toMappedAbility(this.abilities, toAbilityValues(ak))
      );
    },
    skills(): MappedAbility[] {
      return this.mappedAbilities.filter((ma) => ma.ability.type === "skill");
    },
    actions(): MappedAbility[] {
      return this.mappedAbilities.filter((ma) => ma.ability.type === "action");
    },
    reactions(): MappedAbility[] {
      return this.mappedAbilities.filter(
        (ma) => ma.ability.type === "reaction"
      );
    },
    legendaries(): MappedAbility[] {
      return this.mappedAbilities.filter(
        (ma) => ma.ability.type === "legendary"
      );
    },
    legendaryActionText(): string {
      return getLegendaryText(this.value);
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
