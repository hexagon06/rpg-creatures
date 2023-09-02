<template>
  <thumbnail v-if="modelValue.source"
             :url="modelValue.source"
             class="w-full md:w-1/2 h-auto md:float-right" />
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
});
</script>

<style lang="scss" scoped></style>
