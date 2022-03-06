<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-button @click="updateCreatureIndexes">
            Update Creatures Indexes
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col><b-button disabled>Convert to new Tags</b-button></b-col>
      </b-row>
      <b-row>
        <b-col><b-button disabled>Update abilities</b-button></b-col>
      </b-row>
      <b-row>
        <b-col><b-button disabled>Update references</b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { getCreatures } from "@/api/creature";
import { setCreatureIndexes } from "@/api/indexes";
import { Creature, getCreatureIndex } from "@/types";

import Vue from "vue";
export default Vue.extend({
  methods: {
    async updateCreatureIndexes() {
      const creatures = (await getCreatures()) as Creature[];
      console.log(creatures);

      const indexes = creatures.map((c) => getCreatureIndex(c));
      console.log(indexes);

      await setCreatureIndexes(indexes);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
