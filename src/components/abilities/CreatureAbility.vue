<template>
  <div class="text-left">
    <!-- <b>{{ ability.name }}.</b> {{ formattedText }} -->

    <p v-for="(paragraph, index) in formattedParagraphs" :key="index">
      <span v-if="index === 0" class="font-weight-bold font-italic"
        >{{ ability.name }}.
      </span>
      <span
        v-for="(text, i) in paragraph"
        :key="`${ability.key}-${index}-${i}`"
        :class="text.isSpell || text.italic ? 'font-italic' : ''"
        >{{ text.text }}</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Ability, CreatureAbilityValues } from "@/types/abilities";
import { Creature } from "@/types/creatures";
import {
  formatAbilityForCreature,
  formatForRender,
  TextPart,
} from "@/shared/abilityFormatting";

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
    formattedParagraphs(): TextPart[][] {
      return formatForRender(this.formattedText);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
