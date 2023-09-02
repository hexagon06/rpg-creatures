<template>
  <div class="text-purple flex gap-2">
    <button v-if="reference === undefined || isReference"
            @click="editReference"
            class="button-round button-on-dark-blue">
      <font-awesome-icon v-if="isReference"
                         icon="fa-solid fa-virus-slash" />
      <font-awesome-icon v-if="!isReference"
                         icon="fa-solid fa-virus" />
    </button>
    <p v-if="!!reference && !!entityIndex && isReference"
       :title="`${reference.routerName}/${entityIndex.label}`"
       class="max-w-[6rem] overflow-clip overflow-ellipsis whitespace-nowrap">
      <entity-type-icon v-if="reference.routerName"
                        :type="reference.routerName" />
      {{ entityIndex.label }}
    </p>
    <transition>
      <form v-if="isEditingReference"
            @submit.stop.prevent="setReference">
        <modal :is-valid="isValid"
               @reject="cancel"
               class="text-white">
          <div class="w-52 flex flex-col gap-1 text-dark-blue">
            <input-wrapper label="">
              <multi-select id="input-router-name"
                            v-model="form.routerName"
                            :options="routerOptions"
                            :show-labels="false"
                            :allow-empty="false"
                            :preselect-first="true"
                            placeholder="Select type"
                            @select="selectRouter()" />
            </input-wrapper>
            <input-wrapper label="">
              <multi-select id="input-reference-id"
                            v-model="form.entity"
                            :options="idOptions"
                            label="label"
                            :allow-empty="false"
                            track-by="id"
                            placeholder="Select entity" />
            </input-wrapper>
          </div>
          <template #buttons>
            <button class="
                rounded-full
                bg-rouge
                border-gold border-2
                w-8
                h-8
                flex
                items-center
                justify-center
              "
                    @click="remove"
                    type="button">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </template>
        </modal>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { isString } from "lodash";
// import { Multiselect } from "vue-multiselect";
import MultiSelect from 'primevue/multiselect';
import { mapState } from "pinia";
import { useIndexesStore } from "@/store/indexes";
import { entityTypeOptions } from "@/types";

import { defineComponent } from 'vue'
export default defineComponent({
  components: { MultiSelect },
  props: {
    reference: {
      type: Object as PropType<{ routerName: string; id: string } | undefined>,
      default: undefined,
    },
  },
  data() {
    return {
      form: {
        routerName: "",
        entity: undefined as { id: string; label: string } | undefined,
      },
      isEditingReference: false,
      routerOptions: entityTypeOptions,
    };
  },
  computed: {
    ...mapState(useIndexesStore, [
      "encounters",
      "creatures",
      "sessions",
      "lists",
    ]),
    isReference(): boolean {
      return this.reference !== undefined && !isString(this.reference);
    },
    entityIndex(): { id: string; label: string } | undefined {
      if (!this.isReference) return undefined;
      if (this.reference === undefined) return undefined;
      const id = this.reference.id;

      switch (this.reference.routerName) {
        case "Creature":
          return this.creatures
            .map((c) => {
              return { id: c.id, label: c.name };
            })
            .find((c) => c.id === id);
        case "Encounter":
          return this.encounters
            .map((c) => {
              return { id: c.id, label: c.name };
            })
            .find((c) => c.id === id);
        case "List":
          return this.lists
            .map((c) => {
              return { id: c.id, label: c.name };
            })
            .find((c) => c.id === id);
        case "Session":
          return this.sessions
            .map((c) => {
              return { id: c.id, label: c.title };
            })
            .find((c) => c.id === id);
        default:
          return undefined;
      }
    },
    isValid(): boolean {
      return (
        this.form.routerName.length > 0 &&
        this.form.entity !== undefined &&
        this.form.entity.id.length > 0
      );
    },
    idOptions(): { id: string; label: string }[] {
      const router = this.form.routerName;
      switch (router) {
        case "Creature":
          return this.creatures.map((c) => {
            return { id: c.id, label: c.name };
          });
        case "Encounter":
          return this.encounters.map((c) => {
            return { id: c.id, label: c.name };
          });
        case "List":
          return this.lists.map((c) => {
            return { id: c.id, label: c.name };
          });
        case "Session":
          return this.sessions.map((c) => {
            return { id: c.id, label: c.title };
          });
        default:
          return [];
      }
    },
  },
  methods: {
    editReference() {
      if (this.isReference && this.reference && this.entityIndex) {
        this.form = {
          routerName: this.reference.routerName,
          entity: { ...this.entityIndex },
        };
      } else {
        this.form = {
          routerName: "",
          entity: undefined,
        };
      }
      this.isEditingReference = true;
    },
    setReference() {
      this.$emit("update:reference", {
        routerName: this.form.routerName,
        id: this.form.entity?.id,
      });
      this.isEditingReference = false;
    },
    cancel() {
      this.isEditingReference = false;
    },
    selectRouter() {
      this.form.entity = undefined;
    },
    remove() {
      this.$emit("update:reference", undefined);
      this.isEditingReference = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
