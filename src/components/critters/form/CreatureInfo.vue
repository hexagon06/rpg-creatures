<template>
  <div>
    <input-wrapper label="Is Noun"
                   class="flex-shrink">
      <div class="flex h-6">
        <input id="input-is-noun"
               v-model="info.nameIsNoun"
               type="checkbox" />
      </div>
    </input-wrapper>
    <div>
      <div v-if="info.nameIsNoun"
           class="flex flex-full gap-2">
        <input-wrapper label="Subject">
          <input id="input-pronoun1"
                 v-model="info.pronoun1"
                 placeholder="it"
                 class="w-16" />
        </input-wrapper>
        <input-wrapper label="Possessive">
          <input id="input-pronoun2"
                 v-model="info.pronoun2"
                 placeholder="its"
                 class="w-16" />
        </input-wrapper>
      </div>
    </div>
    <input-wrapper label="Organisation">
      <pill-multiselect id="input-organisation"
                        v-model="organisation"
                        :options="organisationOptions"
                        :taggable="true"
                        @tag="tagOrganisation"
                        placeholder="Select size(s)"></pill-multiselect>
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import { useFilterStore } from '@/store/filter';
import { StandardCreatureInfo } from '@/types/creatures';
import { mapState } from 'pinia';
import Vue, { PropType } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<StandardCreatureInfo>, default: undefined }
  },
  data() {
    return {
      info: this.modelValue ?? { nameIsNoun: false, type: 'standard-info' },
      organisation: this.modelValue?.organisation ?? []
    }
  },
  watch: {
    info: {
      handler: function () { this.$emit('input', { ...this.info, organisation: this.organisation }) },
      deep: true,
    },
    organisation: function () { this.$emit('input', { ...this.info, organisation: this.organisation }) },
  },
  computed: {
    ...mapState(useFilterStore, ["creatureOptions"]),
    organisationOptions(): string[] {
      return this.creatureOptions.organisation;
    },
  },
  methods: {
    async tagOrganisation(newOrganisation: string) {
      await useFilterStore().addOrganisation(newOrganisation);
      if (!this.info.organisation) this.info.organisation = []
      this.info.organisation.push(newOrganisation);
    },
  }
})
</script>

<style lang="scss" scoped></style>
