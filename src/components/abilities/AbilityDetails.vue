<template>
  <b-card :title="value.name" class="mt-3">
    <b-container fluid>
      <labeled-prop label="Key" :text="value.key" />
      <array-pills :data="value.tags" :variant="'badge-light'" />
      <labeled-prop label="Proprietor" :text="value.proprietor" />
      <b-row v-if="value.text">
        <b-col>
          <p class="bg-light border border-info rounded-sm">
            {{ value.text }}
          </p>
        </b-col>
      </b-row>
      <creature-ability :ability="value" :creature="defaultCreature" />
      <array-pills :data="value.dice" :variant="'badge-light'" />
      <source-reference :link="value.link"></source-reference>
    </b-container>
  </b-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Ability } from "@/types/abilities";
import { createDefaultCreature } from "@/shared";
import { Creature } from "@/types/creatures";

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<Ability>,
      required: true,
    },
  },
  data() {
    return {
      defaultCreature: {
        ...createDefaultCreature("Test Creature"),
        strength: 14,
        dexterity: 14,
        constitution: 14,
        intelligence: 14,
        wisdom: 14,
        charisma: 14,
      } as Creature,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-body > .container-fluid {
  padding: 0;
}
</style>
