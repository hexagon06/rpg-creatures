<template>
  <span>
    <router-link
      v-if="item.reference && item.reference.id"
      :to="{
        name: item.reference.routerName,
        params: { id: item.reference.id },
      }"
      class="encounter-link link"
    >
      {{ item.label }}
    </router-link>
    <a v-else-if="item.reference" :href="item.reference" target="_blank">
      {{ item.label }}
    </a>
    <span v-else>{{ item.label }}</span>
  </span>
</template>

<script lang="ts">
import { RollingListItem } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<RollingListItem>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
