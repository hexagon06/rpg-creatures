<template>
  <div :title="value.name" :sub-title="`${subTitle}`" class="mt-3">
    <thumbnail
      v-if="value.image"
      :height="imgSize"
      :width="imgSize"
      :url="value.image"
    ></thumbnail>
    <b-container fluid>
      <favorite v-model="favorite" />
      <labeled-prop label="Speciality" :text="value.speciality" />
      <labeled-prop label="Proprietor" :text="value.proprietor" />
      <div v-if="value.description">
        <div>
          <p class="bg-light border border-info rounded-sm">
            {{ value.description }}
          </p>
        </div>
      </div>
      <source-reference :link="value.link"></source-reference>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Shop } from "@/types/shops";
import { shopStore } from "@/store";

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
        return this.value.favorite;
      },
      async set(value: boolean) {
        if (this.value.id) {
          await shopStore.actions.updateFavorite({
            shopId: this.value.id,
            favorite: value,
          });
        }
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
