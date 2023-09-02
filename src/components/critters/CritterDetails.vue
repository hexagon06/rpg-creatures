<template>
  <div :title="modelValue.name"
       :sub-title="`${modelValue.size} ${modelValue.type}`">
    <thumbnail v-if="modelValue.image"
               :url="modelValue.image"
               class="w-full md:w-1/3 h-auto md:float-right"></thumbnail>
    <h1 class="flex">
      <span class="flex-grow">{{ modelValue.name }}</span>
      <!-- <favorite v-model="favorite" class="md:flex-grow" /> -->
    </h1>

    <div v-if="modelValue.stats">
      <i>
        {{ modelValue.size }} {{ modelValue.type }} <span v-if="modelValue.subType"> ({{ modelValue.subType }})</span>,
        <span v-for="(a, i) in modelValue.stats.alignment"
              :key="i"> {{ a }}</span>
      </i>
      <hr class="creature-rule" />
      <labeled-prop label="Armor Class"
                    :amount="modelValue.stats.armor.ac" />
      <labeled-prop v-if="hasFormula"
                    label="Hit Points"
                    :text="hpFormula" />
      <div v-if="modelValue.stats.hp">
        <labeled-prop v-if="!hasFormula"
                      label="hit dice"
                      :amount="modelValue.stats.hp.hitDice" />
        <labeled-prop v-if="!hasFormula"
                      label="amount hit dice"
                      :amount="modelValue.stats.hp.amountHitDice" />
      </div>
    </div>
    <div fluid>
      <labeled-prop label="Speed"
                    :text="speed" />
    </div>
    <hr class="creature-rule" />

    <abilities :abilities="creatureAbilities"
               class="max-w-fit"></abilities>
    <hr class="creature-rule" />

    <labeled-prop label="CR"
                  :amount="modelValue.cr" />

    <array-pills v-if="modelValue.info != undefined && modelValue.info.organisation"
                 :data="modelValue.info.organisation"
                 :variant="'badge-light'" />
    <array-pills v-if="modelValue.environment"
                 :data="modelValue.environment"
                 :variant="'badge-secondary'" />
    <hr class="creature-rule" />


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
      <i v-if="modelValue.sourceReference">
        <source-reference :link="modelValue.sourceReference.link"
                          :page="modelValue.sourceReference.page"
                          :source="modelValue.sourceReference.name"></source-reference>
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature, RPGAbilities } from '@/types/creatures'
import { toHitDiceFormula, toMod } from "@/shared";
import LabeledProp from "../shared/LabeledProp.vue";
import Thumbnail from "../shared/Thumbnail.vue";
import Abilities from './Abilities.vue'

import { defineComponent } from 'vue'
export default defineComponent({
  components: { LabeledProp, Thumbnail, Abilities },
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
    // ...mapState(useAbilityStore, ["abilities"]),
    creatureAbilities(): RPGAbilities {
      return { ...this.modelValue.stats?.abilityScores };
    },
    // favorite: {
    //   get(): boolean {
    //     return this.value.userData?.favorite ?? false;
    //   },
    //   async set(value: boolean) {
    //     const currentUser = useUserStore().currentUser;
    //     if (!this.value.userData && currentUser) {
    //       this.value.userData = {
    //         userId: currentUser.uid,
    //         favorite: value,
    //       };
    //     }
    //     if (this.value.id) {
    //       this.$emit("favorite", value);
    //     }
    //   },
    // },
    conMod(): number | undefined {
      return toMod(this.modelValue.stats?.abilityScores.constitution);
    },
    hpFormula(): string {
      return toHitDiceFormula(
        this.modelValue.stats?.hp?.hitDice,
        this.modelValue.stats?.hp?.amountHitDice,
        this.conMod
      );
    },
    hasFormula(): boolean {
      return this.hpFormula.length > 0;
    },
    // mappedAbilities(): MappedAbility[] {
    //   return (this.value.stats?.abilityKeys ?? []).map((ak: string) =>
    //     toMappedAbility(this.abilities, toAbilityValues(ak))
    //   );
    // },
    // skills(): MappedAbility[] {
    //   return this.mappedAbilities.filter((ma) => ma.ability.type === "skill");
    // },
    // actions(): MappedAbility[] {
    //   return this.mappedAbilities.filter((ma) => ma.ability.type === "action");
    // },
    // reactions(): MappedAbility[] {
    //   return this.mappedAbilities.filter(
    //     (ma) => ma.ability.type === "reaction"
    //   );
    // },
    // legendaries(): MappedAbility[] {
    //   return this.mappedAbilities.filter(
    //     (ma) => ma.ability.type === "legendary"
    //   );
    // },
    // legendaryActionText(): string {
    //   return getNewLegendaryText(this.value);
    // },
    speed(): string {
      const value = [
        { ft: this.modelValue.stats?.speed.walking },
        { ft: this.modelValue.stats?.speed.burrow, label: "burrow" },
        { ft: this.modelValue.stats?.speed.climb, label: "climb" },
        { ft: this.modelValue.stats?.speed.flying, label: "fly" },
        { ft: this.modelValue.stats?.speed.swim, label: "swim" },
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
