<template>
  <div>
    <div class="fixed z-[1200] inset-0 flex items-center justify-center">
      <div class="
          relative
          bg-brown
          w-auto
          h-auto
          p-8
          rounded-full
          border-8 border-gold
          min-w-[25%]
          flex flex-col
        ">
        <div class="">
          <slot />
        </div>
        <div class="
            absolute
            bottom-0
            right-16
            left-16
            -my-7
            flex
            pt-3
            gap-2
            items-center
            justify-end
          ">
          <slot name="buttons" />
          <button @click="cancel"
                  type="button"
                  class="
              rounded-full
              bg-rouge
              border-gold border-2
              w-8
              h-8
              flex
              items-center
              justify-center
            ">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <button @click="ok"
                  type="submit"
                  :disabled="!this.isValid"
                  class="
              rounded-full
              bg-rouge
              border-gold border-4
              w-12
              h-12
              flex
              items-center
              justify-center
            ">
            <font-awesome-icon icon="fa-solid fa-check" />
          </button>
        </div>
      </div>
    </div>
    <div class="
        fixed
        inset-0
        bg-gray-600 bg-opacity-50
        overflow-y-auto
        h-full
        w-full
        modal-backdrop
        backdrop-blur-md
      "
         id="my-modal"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ok() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("reject");
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  // background: $rouge;
  padding: 4px;

  &:disabled {

    // background: scale-color($rouge, $lightness: 80%, $saturation: 10%);
    &:hover {
      cursor: pointer;
      // background: scale-color($rouge, $lightness: 80%, $saturation: 10%);
    }
  }

  &:hover {
    // background: scale-color($rouge, $lightness: -10%, $saturation: 10%);
  }
}

.modal-backdrop {
  // background: scale-color(
  //   // $dark-blue,
  //   // $lightness: 80%,
  //   // $saturation: 10%,
  //   // $alpha: -80%
  // );
}
</style>
