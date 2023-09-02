<template>
  <div class="flex gap-2">
    <multi-select id="input-size"
                  v-model="organisation"
                  :options="organisationOptions"
                  :clear-on-select="false"
                  :show-labels="false"
                  :preselect-first="false" />
    <multi-select id="input-size"
                  v-model="goodness"
                  :options="goodnessOptions"
                  :clear-on-select="false"
                  :show-labels="false"
                  :preselect-first="false" />
  </div>
</template>

<script lang="ts">
import { uniq } from "lodash";
import Vue, { PropType } from "vue";
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
  },
  data() {
    return {
      organisationOptions: ["any", "lawful", "neutral", "chaotic"],
      goodnessOptions: ["any", "good", "neutral", "evil"],
    };
  },
  computed: {
    isGood(): boolean {
      return this.modelValue.findIndex((s) => s === "good") >= 0;
    },
    isEvil(): boolean {
      return this.modelValue.findIndex((s) => s === "evil") >= 0;
    },
    isNeutral(): boolean {
      return this.modelValue.findIndex((s) => s === "neutral") >= 0;
    },
    isChaotic(): boolean {
      return this.modelValue.findIndex((s) => s === "chaotic") >= 0;
    },
    isLawful(): boolean {
      return this.modelValue.findIndex((s) => s === "lawful") >= 0;
    },
    warning(): string | undefined {
      if (this.modelValue.length > 2) {
        return "There are more than 2 options in the alignment. this is not supported";
      }
    },
    hasWarning(): boolean {
      return !(this.warning && this.warning.length > 0);
    },
    organisation: {
      get(): string[] {
        if (this.isChaotic) return ["chaotic"];
        else if (this.isLawful) return ["lawful"];
        else if (this.isNeutral) return ["neutral"];
        else return [];
      },
      set(value: string) {
        this.newInput([value].concat(this.goodness));
      },
    },
    goodness: {
      get(): string[] {
        if (this.isGood) return ["good"];
        else if (this.isEvil) return ["evil"];
        else if (this.isNeutral) return ["neutral"];
        else return [];
      },
      set(value: string) {
        this.newInput([value].concat(this.organisation));
      },
    },
  },
  methods: {
    newInput(newValues: string[]) {
      const values = uniq(newValues);
      this.$emit("input", values);
    },
  },
});
</script>

<style lang="scss" scoped></style>
