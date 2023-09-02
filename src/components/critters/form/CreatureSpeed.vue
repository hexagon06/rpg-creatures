<template>
  <div>
    <div class="flex gap-2 items-end">
      <input-wrapper label="Speed">
        <input id="input-speed"
               v-model.number="speed.walking"
               placeholder="30"
               number
               @keypress="isNumber"
               class="w-20" />
      </input-wrapper>

      <button v-if="!showSpeeds && !showSpeedsClicked"
              variant="primary"
              class="border-2 px-2 mb-3 button-on-gold rounded-lg"
              @click="toggleSpeeds">
        More options
      </button>
    </div>
    <div v-if="showSpeeds"
         class="grid gap-2 max-w-full grid-cols-4">
      <input-wrapper label="Flying">
        <input id="input-flying"
               v-model.number="speed.flying"
               number
               @keypress="isNumber" />
      </input-wrapper>
      <input-wrapper label="Swim">
        <input id="input-swim"
               v-model.number="speed.swim"
               number
               @keypress="isNumber" />
      </input-wrapper>
      <input-wrapper label="Climbing">
        <input id="input-climb"
               v-model.number="speed.climb"
               number
               @keypress="isNumber" />
      </input-wrapper>
      <input-wrapper label="Burrow">
        <input id="input-burrow"
               v-model.number="speed.burrow"
               number
               @keypress="isNumber" />
      </input-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import { CreatureSpeed } from '@/types/creatures';
import Vue, { PropType } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<CreatureSpeed>, required: true
    }
  },
  data() {
    return {
      speed: this.modelValue,
      showSpeedsClicked: false,
    }
  },
  watch: {
    speed: {
      handler: function () {
        this.$emit('input', this.speed)
      },
      deep: true,
    }
  },
  computed: {
    showSpeeds(): boolean {
      return (
        this.showSpeedsClicked ||
        this.speed.swim !== undefined ||
        this.speed.burrow !== undefined ||
        this.speed.flying !== undefined ||
        this.speed.climb !== undefined
      );
    },
  },
  methods: {
    isNumber: isNumber,
    toggleSpeeds() {
      this.showSpeedsClicked = true;
    },
  }
})
</script>

<style lang="scss" scoped></style>