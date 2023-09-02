<template>
  <div>
    <input-wrapper label="Ability scores">
      <div class="flex gap-2">
        <input-wrapper label="STR">
          <input id="input-strength"
                 v-model.number="abilityScores.strength"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(strMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="DEX">
          <input id="input-dexterity"
                 v-model.number="abilityScores.dexterity"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(dexMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="CON">
          <input id="input-constitution"
                 v-model.number="abilityScores.constitution"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(conMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="INT">
          <input id="input-intelligence"
                 v-model.number="abilityScores.intelligence"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(intMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="WIS">
          <input id="input-wisdom"
                 v-model.number="abilityScores.wisdom"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(wisMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="CHA">
          <input id="input-charisma"
                 v-model.number="abilityScores.charisma"
                 placeholder="10"
                 number
                 @keypress="isNumber"
                 class="w-9" />
          <template v-slot:help>
            {{ modString(chaMod) }}
          </template>
        </input-wrapper>
      </div>
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import { toMod } from '@/shared/hitDice';
import { RPGAbilities } from '@/types/creatures';
import Vue from 'vue';
import { PropType } from 'vue-demi';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<RPGAbilities>, required: true
    }
  },
  data() {
    return {
      abilityScores: this.modelValue
    }
  },
  watch: {
    abilityScores: {
      handler: function () {
        this.$emit('input', this.abilityScores)
      },
      deep: true,
    }
  },
  computed: {
    strMod(): number | undefined {
      return toMod(this.abilityScores.strength);
    },
    dexMod(): number | undefined {
      return toMod(this.abilityScores.dexterity);
    },
    conMod(): number | undefined {
      return toMod(this.abilityScores.constitution);
    },
    intMod(): number | undefined {
      return toMod(this.abilityScores.intelligence);
    },
    wisMod(): number | undefined {
      return toMod(this.abilityScores.wisdom);
    },
    chaMod(): number | undefined {
      return toMod(this.abilityScores.charisma);
    },
  },
  methods: {
    isNumber: isNumber,
    modString(mod?: number): string | undefined {
      if (mod !== undefined) {
        if (mod < 0) return mod.toString();
        else return `+${mod}`;
      }
    },
  }
})
</script>

<style lang="scss" scoped></style>