<template>
  <div>
    <input-wrapper label="Chapter Title"
                   validation="Invalid title"
                   :is-valid="modelValue.label && modelValue.label.length > 0"
                   class="w-full">
      <input id="input-1"
             v-model="modelValue.label"
             placeholder="Chapter title"
             aria-describedby="password-help-block"
             required />
      <template v-slot:help> What is the following data about?</template>
    </input-wrapper>
    <hr />
  </div>
</template>

<script lang="ts">
import { ChapterPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ChapterPrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
