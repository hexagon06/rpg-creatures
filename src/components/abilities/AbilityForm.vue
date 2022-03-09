<template>
  <div>
    <div id="input-key-group" label="Key" label-for="input-key">
      <input
        id="input-key"
        v-model="ability.key"
        placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        disabled
      />
    </div>
    <div id="input-name-group" label="Name" label-for="input-name">
      <input
        id="input-name"
        v-model="ability.name"
        placeholder="Shortsword"
        required
      />
    </div>
    <div
      id="input-type-group"
      label="Type"
      label-for="input-type"
      class="flex-fill"
    >
      <multiselect
        id="input-type"
        v-model="ability.type"
        :options="abilityTypeOptions"
        deselect-label="Can't remove this value"
        :allow-empty="false"
        :show-labels="false"
        placeholder="Select type"
      ></multiselect>
    </div>
    <div id="input-text-group" label="Description" label-for="input-text">
      <input
        id="input-text"
        v-model="ability.text"
        placeholder="Description with placeholders"
        rows="3"
        required
      ></input>
    </div>
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
      :values="abilityValues"
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
    <div
      id="input-tags-group"
      label="Tags"
      label-for="input-tags"
      class="flex-fill"
    >
      <pill-multiselect
        id="input-tags"
        v-model="ability.tags"
        :options="tagsOptions"
        :taggable="true"
        @tag="tagTag"
        placeholder="Select or create tags"
      ></pill-multiselect>
    </div>
    <!-- custom controls for dice -->
  </div>
</template>

<script lang="ts">
import { filterMapper, filterStore } from "@/store";
import { Ability, CreatureAbilityValues } from "@/types/abilities";
import { createDefaultCreature } from "@/shared";
import Vue, { PropType } from "vue";
import { Creature } from "@/types/creatures";
import {
  AbilityFormat,
  formatAbilityForCreature,
  parseFormatText,
} from "@/shared/abilityFormatting";
import { Multiselect } from "vue-multiselect";

export default Vue.extend({
  components: {
    Multiselect,
  },
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
      abilityTypeOptions: ["skill", "action", "reaction", "legendary"],
      abilityValues: {
        key: "",
        variables: [],
        formulae: [],
      } as CreatureAbilityValues,
    };
  },
  computed: {
    ...filterMapper.mapState(["abilityOptions"]),
    tagsOptions(): string[] {
      return this.abilityOptions.tags;
    },
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
