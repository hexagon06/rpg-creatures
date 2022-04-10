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
      <span v-for="(l, i) in labels" :key="`lbl_${i}`" :class="labelClass(l)">
        {{ l.text }}
      </span>
    </router-link>
    <a v-else-if="item.reference" :href="item.reference" target="_blank">
      <span v-for="(l, i) in labels" :key="`lbl_${i}`" :class="labelClass(l)">
        {{ l.text }}
      </span>
    </a>
    <span v-else>
      <span v-for="(l, i) in labels" :key="`lbl_${i}`" :class="labelClass(l)">
        {{ l.text }}
      </span>
    </span>
  </span>
</template>

<script lang="ts">
import { diceRegex, justDiceRegex, RollingListItem } from "@/types";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<RollingListItem>,
      required: true,
    },
    label: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    labels(): { text: string; type: "text" | "dice" }[] {
      const lbl = this.label ?? this.item.label;
      const split = lbl.split(diceRegex);
      return split.map((s) => {
        return {
          text: s,
          type: justDiceRegex.test(s) ? "dice" : "text",
        };
      });
    },
  },
  methods: {
    labelClass(l: { text: string; type: "text" | "dice" }): string {
      return l.type === "dice" ? "italic text-purple" : "";
    },
  },
});
</script>

<style lang="scss" scoped>
a,
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
