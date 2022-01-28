<template>
  <div>
    <b-form-group id="input-name-group" label="Name" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="shop.name"
        placeholder="Wolf"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-link-group" label="Link" label-for="input-link">
      <b-form-input
        id="input-link"
        v-model="shop.link"
        placeholder="http://google.doc.share/..."
      ></b-form-input>
    </b-form-group>
    <div class="d-flex">
      <b-form-group
        id="input-image-group"
        label="Image link"
        label-for="input-image"
        class="flex-fill"
      >
        <b-form-input
          id="input-image"
          v-model="shop.image"
          placeholder="http://google.image.share/..."
          @update="imgUrlUpdate"
        ></b-form-input>
      </b-form-group>
      <thumbnail v-if="shop.image" :url="shop.image" />
    </div>
    <b-form-group
      id="input-location-group"
      label="Location"
      label-for="input-location"
    >
      <b-form-input
        id="input-location"
        v-model="shop.location"
        placeholder="Rotsokkil"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-speciality-group"
      label="Speciality"
      label-for="input-speciality"
    >
      <b-form-input
        id="input-speciality"
        v-model="shop.speciality"
        placeholder="Groceries"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-proprietor-group"
      label="Proprietor"
      label-for="input-proprietor"
    >
      <b-form-input
        id="input-proprietor"
        v-model="shop.proprietor"
        placeholder="Owner of the store"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-description-group"
      label="Description"
      label-for="input-description"
    >
      <b-form-textarea
        id="input-description"
        v-model="shop.description"
        placeholder="Description of the store..."
        rows="3"
      ></b-form-textarea>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Shop } from "@/types/shops";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: Object as PropType<Shop>,
  },
  data() {
    return {
      shop: this.value,
    };
  },
  methods: {
    imgUrlUpdate(value: string) {
      var rx = new RegExp(
        "^(https://static.wikia.nocookie.net/.*)(?=/revision/latest?)"
      );
      const result = rx.exec(value);
      if (result) {
        this.shop.image = result[1];
      } else {
        this.shop.image = value;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
