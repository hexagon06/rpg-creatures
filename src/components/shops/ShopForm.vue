<template>
  <div>
    <div id="input-name-group" label="Name" label-for="input-name">
      <input id="input-name" v-model="shop.name" placeholder="Wolf" required />
    </div>
    <div id="input-link-group" label="Link" label-for="input-link">
      <input
        id="input-link"
        v-model="shop.link"
        placeholder="http://google.doc.share/..."
      />
    </div>
    <div class="d-flex">
      <div
        id="input-image-group"
        label="Image link"
        label-for="input-image"
        class="flex-fill"
      >
        <input
          id="input-image"
          v-model="shop.image"
          placeholder="http://google.image.share/..."
          @update="imgUrlUpdate"
        />
      </div>
      <thumbnail v-if="shop.image" :url="shop.image" />
    </div>
    <div id="input-location-group" label="Location" label-for="input-location">
      <input
        id="input-location"
        v-model="shop.location"
        placeholder="Rotsokkil"
      />
    </div>
    <div
      id="input-speciality-group"
      label="Speciality"
      label-for="input-speciality"
    >
      <input
        id="input-speciality"
        v-model="shop.speciality"
        placeholder="Groceries"
      />
    </div>
    <div
      id="input-proprietor-group"
      label="Proprietor"
      label-for="input-proprietor"
    >
      <input
        id="input-proprietor"
        v-model="shop.proprietor"
        placeholder="Owner of the store"
      />
    </div>
    <div
      id="input-description-group"
      label="Description"
      label-for="input-description"
    >
      <input
        id="input-description"
        v-model="shop.description"
        placeholder="Description of the store..."
        rows="3"
      ></input>
    </div>
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
