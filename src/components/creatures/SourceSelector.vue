<template>
  <div>
    <button
      @click="scrape"
      class="button-round-large button-on-gold"
      title="scrape source for creature"
    >
      <font-awesome-icon icon="fa-solid fa-save" />
    </button>
    <transition>
      <form v-if="isScraping" @submit.stop.prevent="scrapeIt">
        <modal :is-valid="isValid" @reject="cancel" class="text-white">
          <div class="m-8">
            <div>
              <input-wrapper label="source" class="flex-grow">
                <multiselect
                  id="input-size"
                  v-model="selectedSource"
                  :options="sourceOptions"
                  :clear-on-select="false"
                  :show-labels="true"
                  :preselect-first="true"
                  :allow-empty="false"
                  label="label"
                ></multiselect>
              </input-wrapper>
              <label>
                {{ query }}
              </label>
            </div>
            <input-wrapper label="Text">
              <textarea v-model="scrapedText" height="400px"></textarea>
            </input-wrapper>
          </div>
        </modal>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import { scrapeCreature } from "@/scraper/scraper";
import Vue from "vue";
import { Multiselect } from "vue-multiselect";

type SourceOption = {
  label: string;
  query: string;
};

export default Vue.extend({
  components: {
    Multiselect,
  },
  data() {
    return {
      isScraping: false,
      scrapedText: "",
      selectedSource: undefined as SourceOption | undefined,
      sourceOptions: [
        {
          label: "aidedd",
          query: "$('.jaune')",
        },
      ] as SourceOption[],
    };
  },
  computed: {
    isValid(): boolean {
      return !!this.scrapedText && this.scrapedText.length > 0;
    },
    query(): string {
      return this.selectedSource?.query ?? "";
    },
    data(): boolean {
      console.log("data");

      if (this.scrapedText) {
        const result = scrapeCreature(this.scrapedText);
        console.log("data", result);
      }
      return true;
    },
  },
  methods: {
    scrape() {
      this.isScraping = true;
    },
    scrapeIt() {
      scrapeCreature(this.scrapedText);
    },
    cancel() {
      this.isScraping = false;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
