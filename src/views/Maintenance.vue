<template>
  <div>
    <b-container>
      <div>
        <div>
          <button @click="updateCreatureIndexes" disabled>
            Update Creatures Indexes
          </button>
        </div>
      </div>
      <div>
        <div><button disabled>Convert to new Tags</button></div>
      </div>
      <div>
        <div><button disabled>Update abilities</button></div>
      </div>
      <div>
        <div><button disabled>Update references</button></div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    async updateCreatureIndexes() {
      // const creatures = (await getCreatures()) as Creature[];
      // console.log(creatures);
      // const indexes = creatures.map((c) => getCreatureIndex(c));
      // console.log(indexes);
      // await setCreatureIndexes(indexes);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
