<template>
  <div>
    <input-wrapper label="Armor class"
                   class="w-20">
      <input id="input-ac"
             v-model.number="armor.ac"
             placeholder="13"
             number
             @keypress="isNumber"
             class="w-16" />
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/components/utilities/is-number';
import Vue, { PropType } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<{
        ac?: number;
        type?: string
      }>, required: true
    }
  },
  data() {
    return {
      armor: this.modelValue
    }
  },
  watch: {
    armor: {
      handler: function () {
        this.$emit('input', this.armor)
      },
      deep: true,
    }
  },
  methods: {
    isNumber: isNumber
  }
})
</script>

<style lang="scss" scoped></style>