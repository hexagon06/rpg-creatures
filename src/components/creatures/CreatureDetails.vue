<template>
  <b-card
    :title="value.name"
    :sub-title="`${value.size} ${value.type}`"
    class="mt-3"
  >
    <b-container fluid>
      <array-pills :data="value.organisation" :variant="'badge-light'" />
      <array-pills :data="value.environment" :variant="'badge-secondary'" />
    </b-container>
    <thumbnail
      v-if="value.image"
      :height="imgSize"
      :width="imgSize"
      :url="value.image"
    ></thumbnail>
    <b-container fluid>
      <alignment :values="value.alignment"> </alignment>
      <labeled-prop label="AC" :amount="value.ac" />
      <labeled-prop label="CR" :amount="value.cr" />
    </b-container>
    <abilities :abilities="creatureAbilities"></abilities>
    <b-container fluid>
      <!-- Hit points -->
      <labeled-prop label="HP" :amount="value.hp" />
      <labeled-prop label="hit dice" :amount="value.hitDice" />
      <labeled-prop label="amount hit dice" :amount="value.amountHitDice" />
      <labeled-prop label="hp formula" :amount="value.hpFormula" />
      <!-- Speed -->
      <labeled-prop label="speed" :amount="value.speed" />
      <labeled-prop label="flying" :amount="value.flyingSpeed" />
      <labeled-prop label="swim" :amount="value.swimSpeed" />
      <labeled-prop label="climbing" :amount="value.climbSpeed" />
      <labeled-prop label="burrow" :amount="value.burrowSpeed" />

      <array-pills :data="value.tags" :variant="'badge-success'" />
      <b-row v-if="value.comments">
        <b-col>
          <p class="bg-light border border-info rounded-sm">
            {{ value.comments }}
          </p>
        </b-col>
      </b-row>
      <b-row v-if="value.system">
        <b-col>{{ value.system }}</b-col>
      </b-row>
      <source-reference
        :link="value.link"
        :page="value.page"
        :source="value.source"
      ></source-reference>
    </b-container>
  </b-card>
</template>

<script lang="ts">
import { Creature, RPGAbilities } from "@/types/creatures";
import Vue, { PropType } from "vue";
import SourceReference from "../shared/SourceReference.vue";
import Alignment from "./Alignment.vue";
import Thumbnail from "./Thumbnail.vue";
import Abilities from "./Abilities.vue";
import LabeledProp from "../shared/LabeledProp.vue";
import ArrayPills from "../shared/ArrayPills.vue";

export default Vue.extend({
  components: {
    SourceReference,
    Thumbnail,
    Alignment,
    Abilities,
    LabeledProp,
    ArrayPills,
  },
  props: {
    value: {
      type: Object as PropType<Creature>,
      required: true,
    },
    imgSize: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    creatureAbilities(): RPGAbilities {
      return { ...this.value };
    },
  },
});
</script>

<style lang="scss" scoped>
.card-body > .container-fluid {
  padding: 0;
}
</style>
