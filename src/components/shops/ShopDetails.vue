<template>
  <b-card :title="value.name" :sub-title="`${subTitle}`" class="mt-3">
    <thumbnail
      v-if="value.image"
      :height="imgSize"
      :width="imgSize"
      :url="value.image"
    ></thumbnail>
    <b-container fluid>
      <favorite v-model="favorite" disabled />
      <labeled-prop label="Speciality" :text="value.speciality" />
      <labeled-prop label="Proprietor" :text="value.proprietor" />
      <b-row v-if="value.description">
        <b-col>
          <p class="bg-light border border-info rounded-sm">
            {{ value.description }}
          </p>
        </b-col>
      </b-row>
      <source-reference :link="value.link"></source-reference>
    </b-container>
  </b-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Shop } from "@/types/shops";

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<Shop>,
      required: true,
    },
    imgSize: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    subTitle(): string {
      return this.value.location ?? "";
    },
    favorite: {
      get(): boolean {
        return false; //return this.value.favorite;
      },
      async set(value: boolean) {
        // if (this.value.id) {
        //   await creatureStore.actions.updateFavorite({
        //     creatureId: this.value.id,
        //     favorite: value,
        //   });
        // }
      },
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.card-body > .container-fluid {
  padding: 0;
}
</style>
