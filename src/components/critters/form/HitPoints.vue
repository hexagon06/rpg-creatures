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
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import { toHitDiceFormula } from '@/shared/hitDice';
import Vue, { PropType } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<{
        hitDice: number;
        amountHitDice: number;
      }>, default: undefined
    },
    conMod: {
      type: Number, default: undefined
    }
  },
  data() {
    return {
      hp: this.modelValue ?? { hitDice: 1, amountHitDice: 1 }
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

<style lang="scss" scoped></style>