<template>
  <div :title="title">
    <!-- <h3>Locations</h3> -->
    <hr />
    <ul flush>
      <li v-for="item in list"
          :key="item.id">
        <router-link v-if="item.routerName"
                     :to="{ name: item.routerName, params: { id: item.id } }"
                     class="encounter-link link">
          {{ item.label }}
        </router-link>
        <span v-else>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ReferenceListItem } from "@/types";

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array as PropType<ReferenceListItem[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
a.encounter-link {
  font-weight: bold;
  color: #d1b74d;

  &:hover {
    color: lighten(#d1b74d, 10);
  }

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
