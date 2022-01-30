<template>
  <div class="text-left">
    <b>{{ ability.name }}.</b> {{ formattedText }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Ability, CreatureAbilityValues } from "@/types/abilities";
import { Creature } from "@/types/creatures";
import { formatAbilityForCreature } from "@/shared/abilityFormatting";

export default Vue.extend({
  props: {
    ability: {
      type: Object as PropType<Ability>,
      required: true,
    },
    creature: {
      type: Object as PropType<Creature>,
      required: true,
    },
    values: {
      type: Object as PropType<CreatureAbilityValues>,
      required: true,
    },
  },
  computed: {
    formatResult() {
      const result = formatAbilityForCreature(
        this.ability.text,
        this.creature,
        this.values
      );
      return result;
    },
    formattedText(): string {
      return this.formatResult.text;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
