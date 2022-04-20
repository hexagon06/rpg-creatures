<template>
  <div>
    <h1 class="mt-3">{{ value.name }}</h1>
    <div fluid>
      <labeled-prop label="Key" :text="value.key" />
      <array-pills :data="value.tags" :variant="'badge-light'" />
      <labeled-prop label="Proprietor" :text="value.proprietor" />
      <div class="row" v-if="value.text">
        <div>
          <p class="bg-light border border-info rounded-sm">
            {{ value.text }}
          </p>
        </div>
      </div>
      <creature-ability
        :ability="value"
        :creature="defaultCreature"
        :values="abilityValues"
      />
      <array-pills :data="value.dice" :variant="'badge-light'" />
      <source-reference :link="value.link"></source-reference>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Ability, CreatureAbilityValues } from "@/types";
import { createDefaultCreature } from "@/shared";
import { Creature } from "@/types";

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<Ability>,
      required: true,
    },
  },
  data() {
    return {
      defaultCreature: {
        ...createDefaultCreature("Test Creature"),
        strength: 14,
        dexterity: 14,
        constitution: 14,
        intelligence: 14,
        wisdom: 14,
        charisma: 14,
      } as Creature,
      abilityValues: {
        key: this.value.key,
        variables: [],
        formulae: [],
      } as CreatureAbilityValues,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-body > .container-fluid {
  padding: 0;
}
</style>
