<template>
  <div class="flex flex-wrap">
    <input-wrapper label="Link label"
                   class="w-full md:w-1/3 md:pr-2">
      <input id="input-1"
             v-model="modelValue.label"
             placeholder="click here..."
             required />
    </input-wrapper>
    <input-wrapper label="Link"
                   :validation="urlIsValid(modelValue.link)"
                   :is-valid="modelValue.link && modelValue.link.length > 0 && modelValue.link.length < 512"
                   class="w-full md:w-2/3">
      <input id="input-1"
             v-model="modelValue.link"
             placeholder="http://..."
             required />
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import { LinkPrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<LinkPrep>,
      required: true,
    },
  },
  methods: {
    urlIsValid(url: string): string {
      return url.length > 512 ? "source is too long" : "Invalid source";
    },
  },
});
</script>

<style lang="scss" scoped></style>
