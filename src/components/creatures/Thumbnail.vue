<template>
  <div>
    <b-skeleton-img
      v-if="loading"
      no-aspect
      animation="fade"
      :height="heightPx"
      :width="widthPx"
    ></b-skeleton-img>
    <b-img
      :src="url"
      rounded
      :height="heightPx"
      :width="widthPx"
      @load="loadDone('load')"
      :class="loading ? 'hiding' : ''"
    />
  </div>
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
