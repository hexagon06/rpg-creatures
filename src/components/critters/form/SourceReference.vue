<template>
  <div>
    <input-wrapper label="Link">
      <input id="input-link"
             v-model="sourceReference.link"
             placeholder="http://google.doc.share/..." />
      <template v-slot:help>
        Link to a source where this creature can be found
      </template>
    </input-wrapper>
    <div class="flex gap-2">
      <input-wrapper label="Page">
        <div class="flex gap-2">
          <button :disabled="sourceReference.page === undefined"
                  @click="() => (sourceReference.page--).toString()"
                  class="button-round button-on-gold">
            <font-awesome-icon icon="fa-solid fa-minus" />
          </button>
          <input id="input-page"
                 v-model.number="sourceReference.page"
                 placeholder="#"
                 number
                 @keypress="isNumber"
                 :disabled="sourceReference.name === '' || sourceReference.name === undefined"
                 class="w-9 text-center" />
          <button :disabled="sourceReference.page === undefined"
                  @click="() => (sourceReference.page++).toString()"
                  class="button-round button-on-gold">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
        </div>
      </input-wrapper>
      <input-wrapper label="Source">
        <input id="input-source"
               v-model="sourceReference.name"
               placeholder="Monster Manual" />
        <template v-slot:help>
          Name of a source where this creature can be found.
        </template>
      </input-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { SourceReference } from '@/types/creatures';
import Vue, { PropType } from 'vue';

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<SourceReference>, default: undefined }
  },
  data() {
    return {
      sourceReference: this.modelValue ?? { id: 'source-reference', type: 'source-reference', name: '' }
    }
  },
  methods: {
    isNumber(evt: KeyboardEvent | undefined): boolean {
      if (evt) {
        switch (evt.key) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          case "0":
            return true;
          default:
            evt.preventDefault();
            return false;
        }
      }
      return false;
    },
  }
})
</script>

<style lang="scss" scoped></style>