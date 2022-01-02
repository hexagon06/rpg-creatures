<template>
  <div>
    <b-table striped hover :items="creatures"></b-table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Creature } from "../../types/creatures";
import { BTable } from "bootstrap-vue";

export default Vue.extend({
  components: {
    "b-table": BTable,
  },
  props: {
    creatures: {
      type: Array as PropType<Creature[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
