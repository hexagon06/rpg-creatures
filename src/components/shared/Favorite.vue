<template>
  <div class="favoriting">
    <label
      class="icon"
      :class="{
        selected: value,
        'is-disabled': disabled,
      }"
    >
      <input
        class="favorite-checkbox"
        type="checkbox"
        v-bind:name="name"
        v-bind:required="required"
        v-bind:disabled="disabled"
        v-model="favorite"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        v-if="value"
      ></font-awesome-icon>
      <font-awesome-icon icon="fa-regular fa-star" v-else></font-awesome-icon>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {};
  },
  props: {
    name: {
      type: String,
      default: "favorite",
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    favorite: {
      get(): boolean {
        return this.value;
      },
      set(value: boolean) {
        this.$emit("input", value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.favoriting {
  display: inline-block;

  .icon {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 16px;
    color: $secondary;
    cursor: pointer;
    -webkit-transition: color 0.2s ease-out;
    transition: color 0.2s ease-out;

    &.is-disabled:hover {
      cursor: default;
    }
    &.selected {
      color: $warning;
    }
  }
}

.favorite-checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
