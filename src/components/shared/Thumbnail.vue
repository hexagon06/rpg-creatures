<template>
  <img :src="url"
       rounded
       class="object-contain"
       :class="loading ? 'hiding' : ''"
       @load="loadDone('load')" />
</template>

<script lang="ts">


import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
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
