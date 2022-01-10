<template>
  <multiselect
    v-bind:value="value"
    v-on:input="changed"
    :options="options"
    :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
    :preserve-search="true"
    :placeholder="placeholder"
    :show-labels="false"
    :preselect-first="false"
    :taggable="taggable"
    @tag="$emit('tag', $event)"
  >
    <template slot="selection" slot-scope="{ values }">
      <div class="d-flex">
        <array-pills
          class="flex-fill align-self-center"
          :data="values"
        ></array-pills>
        <b-button
          v-if="values.length > 0"
          @click="changed([])"
          size="sm"
          variant="outline-secondary"
          class="align-self-center my-1"
          >clear</b-button
        >
      </div>
    </template>
  </multiselect>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Multiselect } from "vue-multiselect";
import ArrayPills from "../shared/ArrayPills.vue";

export default Vue.extend({
  components: {
    Multiselect,
    ArrayPills,
  },
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "select",
    },
    taggable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changed(selection: string[]) {
      this.$emit("input", selection);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
