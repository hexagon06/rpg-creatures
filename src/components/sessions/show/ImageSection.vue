<template>
  <thumbnail
    v-if="value.source"
    :url="value.source"
    class="w-full md:w-1/2 h-auto md:float-right"
  />
</template>

<script lang="ts">
import Thumbnail from "@/components/shared/Thumbnail.vue";
import { ImagePrep } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  components: { Thumbnail },
  props: {
    value: {
      type: Object as PropType<ImagePrep>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
