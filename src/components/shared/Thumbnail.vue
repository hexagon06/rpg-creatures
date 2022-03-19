<template>
  <img
    :src="url"
    rounded
    class="object-contain w-36 h-36"
    :class="loading ? 'hiding' : ''"
    loading="lazy"
    @load="loadDone('load')"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    url: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    url() {
      this.loading = true;
    },
  },
  computed: {
    widthPx(): string {
      return `${this.width}px`;
    },
    heightPx(): string {
      return `${this.height}px`;
    },
  },
  methods: {
    loadDone(e: Event) {
      console.log("loadDone");

      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;

  &.hiding {
    display: none;
  }
}
</style>
