<template>
  <div>
    <b-form-group id="input-name-group" label="Name" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="ability.name"
        placeholder="Wolf"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-key-group" label="Key" label-for="input-key">
      <b-form-input
        id="input-key"
        v-model="ability.key"
        placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        disabled
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-text-group"
      label="Description"
      label-for="input-text"
    >
      <b-form-textarea
        id="input-text"
        v-model="ability.text"
        placeholder="Description with placeholders"
        rows="3"
        required
      ></b-form-textarea>
    </b-form-group>

    <b-form-group id="input-tags-group" label="Tags" label-for="input-tags">
      <pill-multiselect
        id="input-tags"
        v-model="ability.tags"
        :options="abilityTagsOptions"
        :taggable="true"
        @tag="tagTag"
        placeholder="Select or create tags"
      ></pill-multiselect>
    </b-form-group>
    <!-- custom controls for dice -->
  </div>
</template>

<script lang="ts">
import { filterMapper, filterStore } from "@/store";
import { Ability } from "@/types/abilities";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: Object as PropType<Ability>,
  },
  data() {
    return {
      ability: this.value,
    };
  },
  computed: {
    ...filterMapper.mapState(["abilityTagsOptions"]),
  },
  methods: {
    async tagTag(newTag: string) {
      console.log(newTag);

      await filterStore.actions.addAbilityTag(newTag);
      this.ability.tags.push(newTag);
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
