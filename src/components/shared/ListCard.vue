<template>
  <b-card :title="title">
    <!-- <h3>Locations</h3> -->
    <hr />
    <b-list-group flush>
      <b-list-group-item v-for="item in list" :key="item.id">
        <router-link
          v-if="item.routerName"
          :to="{ name: item.routerName, params: { id: item.id } }"
          class="encounter-link"
        >
          {{ item.label }}
        </router-link>
        <span v-else>{{ item.label }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ReferenceListItem } from "@/types";

export default Vue.extend({
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
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
