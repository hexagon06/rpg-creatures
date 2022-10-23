<template>
  <div :title="value.name"
       :sub-title="`${value.size} ${value.type}`">
    <thumbnail v-if="value.image"
               :url="value.image"
               class="w-full md:w-1/3 h-auto md:float-right"></thumbnail>
    <h1 class="flex">
      <span class="flex-grow">{{ value.name }}</span>
      <!-- <favorite v-model="favorite" class="md:flex-grow" /> -->
    </h1>

    <div v-if="value.stats">
      <i>
        {{ value.size }} {{ value.type }} <span v-if="value.subType"> ({{ value.subType }})</span>,
        <span v-for="(a, i) in value.stats.alignment"
              :key="i"> {{ a }}</span>
      </i>
      <hr class="creature-rule" />
      <labeled-prop label="Armor Class"
                    :amount="value.stats.armor.ac" />
      <labeled-prop v-if="hasFormula"
                    label="Hit Points"
                    :text="hpFormula" />
      <div v-if="value.stats.hp">
        <labeled-prop v-if="!hasFormula"
                      label="hit dice"
                      :amount="value.stats.hp.hitDice" />
        <labeled-prop v-if="!hasFormula"
                      label="amount hit dice"
                      :amount="value.stats.hp.amountHitDice" />
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
                  :amount="value.cr" />

    <array-pills v-if="value.info !=undefined && value.info.organisation"
                 :data="value.info.organisation"
                 :variant="'badge-light'" />
    <array-pills v-if="value.environment"
                 :data="value.environment"
                 :variant="'badge-secondary'" />
    <hr class="creature-rule" />


    <array-pills :data="value.tags"
                 :variant="'badge-success'" />
    <div v-if="value.userData !== undefined && value.userData.comments">
      <p class="bg-light border rounded-md mt-3 p-2">
        {{ value.userData.comments }}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <div v-if="value.system">
        <div>{{ value.system }}</div>
      </div>
      <i v-if="value.sourceReference">
        <source-reference :link="value.sourceReference.link"
                          :page="value.sourceReference.page"
                          :source="value.sourceReference.name"></source-reference>
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
    // ...mapState(useAbilityStore, ["abilities"]),
    creatureAbilities(): RPGAbilities {
      return { ...this.value.stats?.abilityScores };
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
      return toMod(this.value.stats?.abilityScores.constitution);
    },
    hpFormula(): string {
      return toHitDiceFormula(
        this.value.stats?.hp?.hitDice,
        this.value.stats?.hp?.amountHitDice,
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
        { ft: this.value.stats?.speed.walking },
        { ft: this.value.stats?.speed.burrow, label: "burrow" },
        { ft: this.value.stats?.speed.climb, label: "climb" },
        { ft: this.value.stats?.speed.flying, label: "fly" },
        { ft: this.value.stats?.speed.swim, label: "swim" },
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
