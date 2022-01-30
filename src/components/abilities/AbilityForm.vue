<template>
  <div>
    <b-form-group id="input-key-group" label="Key" label-for="input-key">
      <b-form-input
        id="input-key"
        v-model="ability.key"
        placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        disabled
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-name-group" label="Name" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="ability.name"
        placeholder="Wolf"
        required
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
    <div
      v-if="formatResult.invalidProperties.length > 0"
      class="d-flex bg-warning"
    >
      <label>Invalid properties:</label>
      <array-pills
        :data="formatResult.invalidProperties"
        :variant="'badge-light'"
        class="flex-fill"
      />
    </div>
    <creature-ability
      :ability="ability"
      :creature="defaultCreature"
      class="mb-3"
    />
    <div v-if="abilityFormat.spells.length > 0" class="d-flex">
      <label>Spells</label>
      <array-pills
        :data="abilityFormat.spells"
        :variant="'badge-success'"
        class="flex-fill"
      />
    </div>
    <div v-if="abilityFormat.variables.length > 0" class="d-flex">
      <label>Variables</label>
      <array-pills
        :data="abilityFormat.variables"
        :variant="'badge-primary'"
        class="flex-fill"
      />
    </div>
    <div v-if="abilityFormat.formulae.length > 0" class="d-flex">
      <label>Formulae</label>
      <array-pills :data="abilityFormat.formulae" :variant="'badge-info'" />
    </div>
    <b-form-group
      id="input-tags-group"
      label="Tags"
      label-for="input-tags"
      class="flex-fill"
    >
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
import { createDefaultCreature } from "@/shared";
import Vue, { PropType } from "vue";
import { Creature } from "@/types/creatures";
import {
  AbilityFormat,
  formatAbilityForCreature,
  parseFormatText,
} from "@/shared/abilityFormatting";

export default Vue.extend({
  props: {
    value: Object as PropType<Ability>,
  },
  data() {
    return {
      ability: this.value,
      defaultCreature: {
        ...createDefaultCreature("Creature"),
        strength: 14,
        dexterity: 14,
        constitution: 14,
        intelligence: 14,
        wisdom: 14,
        charisma: 14,
      } as Creature,
    };
  },
  computed: {
    ...filterMapper.mapState(["abilityTagsOptions"]),
    formatResult() {
      const result = formatAbilityForCreature(
        this.ability.text,
        {
          ...this.defaultCreature,
        },
        { key: this.ability.key, variables: [], formulae: [] }
      );

      return result;
    },
    abilityFormat(): AbilityFormat {
      const format = parseFormatText(this.ability.text);
      return format;
    },
  },
  methods: {
    async tagTag(newTag: string) {
      await filterStore.actions.addAbilityTag(newTag);
      this.ability.tags.push(newTag);
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
