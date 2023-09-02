<template>
  <div>
    <div class="flex flex-wrap w-full">
      <input-wrapper label="Image Caption"
                     class="w-full md:w-1/3 md:pr-2">
        <input id="input-1"
               v-model="modelValue.label"
               placeholder="image of..."
               required />
      </input-wrapper>
      <input-wrapper label="Source"
                     :validation="urlIsValid(modelValue.source)"
                     :is-valid="modelValue.source && modelValue.source.length > 0 && modelValue.source.length < 512
                       "
                     class="w-full md:w-2/3">
        <input id="input-1"
               v-model="modelValue.source"
               placeholder="http://..."
               required />
      </input-wrapper>
    </div>
    <div>
      <thumbnail v-if="modelValue.source"
                 :url="modelValue.source"
                 class="w-24 h-24" />
    </div>
  </div>
</template>

<script lang="ts">
import Thumbnail from "@/components/shared/Thumbnail.vue";
import { ImagePrep } from "@/types";
import Vue, { PropType } from "vue";
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Thumbnail },
  props: {
    modelValue: {
      type: Object as PropType<ImagePrep>,
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
