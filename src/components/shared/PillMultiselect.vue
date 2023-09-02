<template>
  <div class="card flex justify-content-center">
    <MultiSelect v-model="selection"
                 display="chip"
                 :options="mappedOptions"
                 optionLabel="name"
                 :placeholder="placeholder"
                 class="w-full md:w-20rem" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MultiSelect from 'primevue/multiselect';
// import { Multiselect } from "vue-multiselect";

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    MultiSelect,

  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true,
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'select',
    },
    taggable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data: () => {
    return {
      isOpen: false,
    }
  },
  computed: {
    selection: {
      get: function () { return this.modelValue.map(o => ({ name: o, value: o })) },
      set: function (newValue: { name: string, value: string }[]) { this.changed(newValue.map(s => s.value)) }
    },
    mappedOptions: function () {
      return this.options.map(o => ({ name: o, value: o }))
    }
  },
  methods: {
    changed(selection: string[]) {
      this.$emit('update:modelValue', selection);
    },
    add(item: string) {
      this.changed([...this.modelValue, item])
    },
    remove(item: string) {
      console.log('🚀 ~ file: PillMultiselect.vue:128 ~ remove ~ item:', item)
      this.changed(this.modelValue.filter(i => i !== item))
      console.log('🚀 ~ file: PillMultiselect.vue:129 ~ remove ~ this.modelValue.filter(i => i !== item):', this.modelValue.filter(i => i !== item))
    },
    toggle(item: string) {
      if (this.modelValue.indexOf(item) === -1) this.add(item)
      else this.remove(item)
    },
    fold() {
      this.isOpen = !this.isOpen
      console.log('🚀 ~ file: PillMultiselect.vue:140 ~ fold ~ this.isOpen:', this.isOpen)

    },
  },
});
</script>

<style lang="scss"
         scoped></style>