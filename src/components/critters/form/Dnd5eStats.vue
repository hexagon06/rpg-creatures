<template>
  <div>
    <!-- alignment -->
    <input-wrapper label="Alignment">
      <alignment-editor id="input-alignment"
                        v-model="stats.alignment" />
    </input-wrapper>
    <div class="flex flex-full gap-2">
      <creature-armor v-model="stats.armor" />
    </div>
    <div class="flex gap-2">
      <hit-points v-model="stats.hp"
                  :conMod="conMod" />
    </div>
    <!-- ability scores -->
    <default-abilities v-model="stats.abilityScores" />
    <!-- speed -->
    <creature-speed v-model="stats.speed" />
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import { Dnd5eCreature } from '@/types/creatures';
import Vue from 'vue';
import { PropType } from 'vue-demi';
import CreatureSpeed from './CreatureSpeed.vue';
import DefaultAbilities from './DefaultAbilities.vue'
import CreatureArmor from './CreatureArmor.vue';
import HitPoints from './HitPoints.vue';
import { toMod } from '@/shared/hitDice';

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Dnd5eCreature>,
      required: true
    }
  },
  data() {
    return {
      stats: this.modelValue ?? {}
    };
  },
  watch: {
    stats: {
      handler: function () {
        this.$emit("input", this.stats);
      },
      deep: true,
    }
  },
  methods: {
    isNumber: isNumber
  },
  computed: {
    conMod(): number | undefined {
      return toMod(this.stats.abilityScores.constitution);
    }
  },
  components: { CreatureSpeed, DefaultAbilities, CreatureArmor, HitPoints }
})
</script>

<style lang="scss" scoped></style>