<template>
  <div :title="value.name" :sub-title="`${value.size} ${value.type}`">
    <thumbnail
      v-if="value.image"
      :url="value.image"
      class="w-full md:w-1/3 h-auto md:float-right"
    ></thumbnail>
    <h1 class="flex">
      <span class="flex-grow">{{ value.name }}</span>
      <favorite v-model="favorite" class="md:flex-grow" />
    </h1>
    <i>
      {{ value.size }} {{ value.type }},
      <span v-for="(a, i) in value.alignment" :key="i"> {{ a }}</span>
    </i>
    <hr class="creature-rule" />
    <labeled-prop label="Armor Class" :amount="value.ac" />
    <!-- Hit points -->
    <labeled-prop v-if="hasFormula" label="Hit Points" :text="hpFormula" />
    <labeled-prop v-if="!hasFormula" label="HP" :amount="value.hp" />
    <labeled-prop v-if="!hasFormula" label="hit dice" :amount="value.hitDice" />
    <labeled-prop
      v-if="!hasFormula"
      label="amount hit dice"
      :amount="value.amountHitDice"
    />
    <labeled-prop
      v-if="!hasFormula"
      label="hp formula"
      :text="value.hpFormula"
    />
    <div fluid>
      <!-- Speed -->
      <labeled-prop label="Speed" :text="speed" />
    </div>
    <hr class="creature-rule" />

    <abilities :abilities="creatureAbilities" class="max-w-fit"></abilities>
    <hr class="creature-rule" />

    <labeled-prop label="CR" :amount="value.cr" />
    <array-pills :data="value.organisation" :variant="'badge-light'" />
    <array-pills :data="value.environment" :variant="'badge-secondary'" />
    <hr class="creature-rule" />

    <div v-if="skills.length > 0">
      <creature-ability
        v-for="ma in skills"
        :key="ma.ability.key"
        :ability="ma.ability"
        :creature="value"
        :values="ma.values"
      />
      <hr class="creature-rule" />
    </div>

    <div v-if="actions.length > 0">
      <h3 class="text-left mt-3">Actions</h3>
      <hr class="creature-rule" />
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
      <hr class="creature-rule" />
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
      <hr class="creature-rule" />
      <p class="text-left">{{ legendaryActionText }}</p>
      <creature-ability
        v-for="ma in legendaries"
        :key="ma.ability.key"
        :ability="ma.ability"
        :creature="value"
        :values="ma.values"
      />
    </div>
    <hr
      v-if="
        actions.length > 0 || reactions.length > 0 || legendaries.length > 0
      "
      class="creature-rule"
    />

    <array-pills :data="value.tags" :variant="'badge-success'" />
    <div v-if="value.userData !== undefined && value.userData.comments">
      <p class="bg-light border rounded-md mt-3 p-2">
        {{ value.userData.comments }}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <div v-if="value.system">
        <div>{{ value.system }}</div>
      </div>
      <i>
        <source-reference
          :link="value.link"
          :page="value.page"
          :source="value.source"
        ></source-reference>
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature, RPGAbilities } from "@/types/creatures";
import { abilityMapper, userStore } from "@/store";
import { toHitDiceFormula, toMod } from "@/shared";
import LabeledProp from "../shared/LabeledProp.vue";
import {
  MappedAbility,
  toAbilityValues,
  toMappedAbility,
} from "@/types/abilities";
import { getLegendaryText } from "@/shared/abilityFormatting";
import Thumbnail from "../shared/Thumbnail.vue";

export default Vue.extend({
  components: { LabeledProp, Thumbnail },
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
        return this.value.userData?.favorite ?? false;
      },
      async set(value: boolean) {
        if (!this.value.userData && userStore.state.currentUser) {
          this.value.userData = {
            userId: userStore.state.currentUser?.uid,
            favorite: value,
          };
        }
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
    speed(): string {
      const value = [
        { ft: this.value.speed },
        { ft: this.value.burrowSpeed, label: "burrow" },
        { ft: this.value.climbSpeed, label: "climb" },
        { ft: this.value.flyingSpeed, label: "fly" },
        { ft: this.value.swimSpeed, label: "swim" },
      ]
        .filter((v) => v.ft !== undefined)
        .map((v) => `${v.label ? v.label : ""} ${v.ft} ft.`);
      return value.join(", ").trim();
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
