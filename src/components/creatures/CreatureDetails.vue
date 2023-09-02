<template>
  <div :title="modelValue.name"
       :sub-title="`${modelValue.size} ${modelValue.type}`">
    <thumbnail v-if="modelValue.image"
               :url="modelValue.image"
               class="w-full md:w-1/3 h-auto md:float-right"></thumbnail>
    <h1 class="flex">
      <span class="flex-grow">{{ modelValue.name }}</span>
      <favorite v-model="favorite"
                class="md:flex-grow" />
    </h1>
    <i>
      {{ modelValue.size }} {{ modelValue.type
      }}<span v-if="modelValue.subType"> ({{ modelValue.subType }})</span>,
      <span v-for="(a, i) in modelValue.alignment"
            :key="i"> {{ a }}</span>
    </i>
    <hr class="creature-rule" />
    <labeled-prop label="Armor Class"
                  :amount="modelValue.ac" />
    <!-- Hit points -->
    <labeled-prop v-if="hasFormula"
                  label="Hit Points"
                  :text="hpFormula" />
    <labeled-prop v-if="!hasFormula"
                  label="HP"
                  :amount="modelValue.hp" />
    <labeled-prop v-if="!hasFormula"
                  label="hit dice"
                  :amount="modelValue.hitDice" />
    <labeled-prop v-if="!hasFormula"
                  label="amount hit dice"
                  :amount="modelValue.amountHitDice" />
    <labeled-prop v-if="!hasFormula"
                  label="hp formula"
                  :text="modelValue.hpFormula" />
    <div fluid>
      <!-- Speed -->
      <labeled-prop label="Speed"
                    :text="speed" />
    </div>
    <hr class="creature-rule" />

    <abilities :abilities="creatureAbilities"
               class="max-w-fit"></abilities>
    <hr class="creature-rule" />

    <labeled-prop label="CR"
                  :amount="modelValue.cr" />
    <array-pills :data="modelValue.organisation"
                 :variant="'badge-light'" />
    <array-pills :data="modelValue.environment"
                 :variant="'badge-secondary'" />
    <hr class="creature-rule" />

    <div v-if="skills.length > 0">
      <!-- <creature-ability v-for="ma in skills"
                        :key="ma.ability.key"
                        :ability="ma.ability"
                        :creature="modelValue"
                        :values="ma.values" /> -->
      <hr class="creature-rule" />
    </div>

    <div v-if="actions.length > 0">
      <h3 class="text-left mt-3">Actions</h3>
      <hr class="creature-rule" />
      <!-- <creature-ability v-for="ma in actions"
                        :key="ma.ability.key"
                        :ability="ma.ability"
                        :creature="modelValue"
                        :values="ma.values" /> -->
    </div>
    <div v-if="reactions.length > 0">
      <h3 class="text-left mt-3">Reactions</h3>
      <hr class="creature-rule" />
      <!-- <creature-ability v-for="ma in reactions"
                        :key="ma.ability.key"
                        :ability="ma.ability"
                        :creature="modelValue"
                        :values="ma.values" /> -->
    </div>
    <div v-if="legendaries.length > 0">
      <h3 class="text-left mt-3">Legendary Actions</h3>
      <hr class="creature-rule" />
      <p class="text-left">{{ legendaryActionText }}</p>
      <!-- <creature-ability v-for="ma in legendaries"
                        :key="ma.ability.key"
                        :ability="ma.ability"
                        :creature="modelValue"
                        :values="ma.values" /> -->
    </div>
    <hr v-if="actions.length > 0 || reactions.length > 0 || legendaries.length > 0
      "
        class="creature-rule" />

    <array-pills :data="modelValue.tags"
                 :variant="'badge-success'" />
    <div v-if="modelValue.userData !== undefined && modelValue.userData.comments">
      <p class="bg-light border rounded-md mt-3 p-2">
        {{ modelValue.userData.comments }}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <div v-if="modelValue.system">
        <div>{{ modelValue.system }}</div>
      </div>
      <i>
        <source-reference :link="modelValue.link"
                          :page="modelValue.page"
                          :source="modelValue.source"></source-reference>
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature, RPGAbilities } from "@/types";
import { toHitDiceFormula, toMod } from "@/shared";
import LabeledProp from "../shared/LabeledProp.vue";
import { MappedAbility, toAbilityValues, toMappedAbility } from "@/types";
import { getLegendaryText } from "@/shared/abilityFormatting";
import Thumbnail from "../shared/Thumbnail.vue";
import { useUserStore } from "@/store/users";
import { mapState } from "pinia";
import { useAbilityStore } from "@/store/abilities";
import Abilities from './Abilities.vue'
import ArrayPills from "../shared/ArrayPills.vue";

import { defineComponent } from 'vue'
export default defineComponent({
  components: { LabeledProp, Thumbnail, Abilities, ArrayPills },
  props: {
    modelValue: {
      type: Object as PropType<Creature>,
      required: true,
    },
    imgSize: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    ...mapState(useAbilityStore, ["abilities"]),
    creatureAbilities(): RPGAbilities {
      return { ...this.modelValue };
    },
    favorite: {
      get(): boolean {
        return this.modelValue.userData?.favorite ?? false;
      },
      async set(value: boolean) {
        const currentUser = useUserStore().currentUser;
        if (!this.modelValue.userData && currentUser) {
          this.modelValue.userData = {
            userId: currentUser.uid,
            favorite: value,
          };
        }
        if (this.modelValue.id) {
          this.$emit("favorite", value);
        }
      },
    },
    conMod(): number | undefined {
      return toMod(this.modelValue.constitution);
    },
    hpFormula(): string {
      return toHitDiceFormula(
        this.modelValue.hitDice,
        this.modelValue.amountHitDice,
        this.conMod
      );
    },
    hasFormula(): boolean {
      return this.hpFormula.length > 0;
    },
    mappedAbilities(): MappedAbility[] {
      return this.modelValue.abilityKeys.map((ak: string) =>
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
      return getLegendaryText(this.modelValue);
    },
    speed(): string {
      const value = [
        { ft: this.modelValue.speed },
        { ft: this.modelValue.burrowSpeed, label: "burrow" },
        { ft: this.modelValue.climbSpeed, label: "climb" },
        { ft: this.modelValue.flyingSpeed, label: "fly" },
        { ft: this.modelValue.swimSpeed, label: "swim" },
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
.card-body>.container-fluid {
  padding: 0;
}
</style>
