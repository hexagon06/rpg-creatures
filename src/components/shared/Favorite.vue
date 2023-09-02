<template>
  <div class="favoriting">
    <label class="icon"
           :class="{
             selected: modelValue,
             'is-disabled': disabled,
           }">
      <input class="favorite-checkbox"
             type="checkbox"
             v-bind:name="name"
             v-bind:required="required"
             v-bind:disabled="disabled"
             v-model="favorite" />
      <font-awesome-icon icon="fa-solid fa-star"
                         v-if="modelValue"></font-awesome-icon>
      <font-awesome-icon icon="fa-regular fa-star"
                         v-else></font-awesome-icon>
    </label>
  </div>
</template>

<script lang="ts">


import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      default: "favorite",
    },
    modelValue: {
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
  data: function () {
    return {};
  },
  computed: {
    favorite: {
      get(): boolean {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit("input", value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
$secondary: #f00;
$warning: hsla(34, 100%, 50%, 0.856);

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
