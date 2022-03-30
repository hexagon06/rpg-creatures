<template>
  <div>
    <div class="flex flex-wrap w-full">
      <input-wrapper label="Image Caption" class="w-full md:w-1/3 md:pr-2">
        <input
          id="input-1"
          v-model="value.label"
          placeholder="image of..."
          required
        />
      </input-wrapper>
      <input-wrapper
        label="Source"
        :validation="urlIsValid(value.source)"
        :is-valid="
          value.source && value.source.length > 0 && value.source.length < 512
        "
        class="w-full md:w-2/3"
      >
        <input
          id="input-1"
          v-model="value.source"
          placeholder="http://..."
          required
        />
      </input-wrapper>
    </div>
    <div>
      <thumbnail v-if="value.source" :url="value.source" class="w-24 h-24" />
    </div>
  </div>
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
  methods: {
    urlIsValid(url: string): string {
      return url.length > 512 ? "source is too long" : "Invalid source";
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
