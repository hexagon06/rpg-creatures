<template>
  <div>
    <input-wrapper label="Hit dice">
      <div class="flex gap-2">
        <input id="input-hit-dice-amount"
               v-model.number="hp.amountHitDice"
               placeholder="3"
               number
               @keypress="isNumber"
               class="w-10 text-center" />
        <input id="input-hit-dice"
               v-model.number="hp.hitDice"
               placeholder="8"
               number
               @keypress="isNumber"
               class="w-16 text-center" />
      </div>
      <template v-slot:help> # and size of dice. </template>
    </input-wrapper>
    <span class="mt-7"> {{ hpFormula }}</span>
    <!-- <input-wrapper label="Hitpoints">
      <input id="input-hp"
             v-model.number="creature.hp"
             placeholder="13"
             number
             @keypress="isNumber"
             :disabled="hp.hitDice + hp.amountHitDice > 0"
             class="w-16" />
    </input-wrapper> -->
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import { toHitDiceFormula } from '@/shared/hitDice';
import Vue, { PropType } from 'vue';
export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<{
        hitDice: number;
        amountHitDice: number;
      }>, required: true
    },
    conMod: {
      type: Number, default: undefined
    }
  },
  data() {
    return {
      hp: this.value
    }
  },
  watch: {
    hp: {
      handler: function () {
        this.$emit('input', this.hp)
      },
      deep: true,
    }
  },
  computed: {
    hpFormula(): string {
      return toHitDiceFormula(
        this.hp.hitDice,
        this.hp?.amountHitDice,
        this.conMod
      );
    },
  },
  methods: {
    isNumber: isNumber
  }
})
</script>

<style lang="scss" scoped>

</style>