<template>
  <div
    class="
      hidden
      md:block
      fixed
      bottom-0
      left-0
      transition-all
      duration-300
      skew-y-35
      z-[1110]
    "
    :class="isOpen ? ' skew-y-0 h-full w-full pr-52' : ' -bottom-32 h-52 w-52'"
  >
    <div
      class="bg-brown outline outline-rouge drop-shadow-3xl outline-4 h-full"
    >
      <div
        class="-skew-y-35 max-h-full"
        :class="isOpen ? ' -skew-y-0 top-0' : ' pr-36'"
      >
        <div
          class="absolute top-2 z-[112] flex justify-between"
          :class="isOpen ? ' left-2 right-2' : ' left-2'"
        >
          <button
            v-if="isOpen"
            class="button-round-large button-on-brown m2"
            title="open screen"
            @click="addInformation"
          >
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
          <input v-if="isOpen" v-model="filter" />
          <button
            class="button-round-large button-on-brown m2"
            title="open screen"
            @click="toggleOpen"
          >
            <font-awesome-icon
              :icon="
                isOpen
                  ? 'fa-solid fa-down-left-and-up-right-to-center'
                  : 'fa-solid fa-up-right-and-down-left-from-center'
              "
            />
          </button>
        </div>
        <div
          v-if="isOpen"
          class="
            overflow-y-auto
            max-h-screen
            h-full
            pt-12
            flex flex-nowrap flex-col
            relative
            scroll-smooth
          "
        >
          <div class="accordion" id="accordionExample">
            <div
              v-for="(item, i) in sortedItems"
              :key="`item_${i}`"
              class="accordion-item"
            >
              <h2 class="accordion-header mb-0" :id="`heading_${i}`">
                <input v-if="item.isEditing" v-model="item.title" required />
                <button
                  v-else
                  class="
                    accordion-button
                    collapsed
                    relative
                    flex
                    items-center
                    justify-between
                    w-full
                    py-4
                    px-5
                    text-base
                    border-0
                    rounded-none
                    transition
                    focus:outline-none
                    bg-dark-blue
                  "
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse_${i}`"
                  aria-expanded="false"
                  :aria-controls="`collapse_${i}`"
                >
                  <span>{{ item.title }}</span>
                </button>
              </h2>
              <div
                :id="`collapse_${i}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`heading_${i}`"
              >
                <div class="accordion-body py-4 px-5">
                  <v-md-preview
                    v-if="!item.isEditing"
                    :text="item.content"
                    :default-show-toc="false"
                  ></v-md-preview>
                  <v-md-editor
                    v-if="item.isEditing"
                    v-model="item.content"
                    height="400px"
                  ></v-md-editor>
                  <div class="flex gap-3 justify-end">
                    <button
                      v-if="!item.isEditing"
                      class="button-round button-on-brown m2"
                      title="open screen"
                      @click="deleteInformation(item.sortOrder)"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                    <button
                      v-if="item.isEditing"
                      class="button-round button-on-brown m2"
                      title="open screen"
                      @click="saveInformation(item)"
                    >
                      <font-awesome-icon icon="fa-solid fa-save" />
                    </button>
                    <button
                      v-else
                      class="button-round button-on-brown m2"
                      title="open screen"
                      @click="editInformation(item.sortOrder)"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep, sortBy } from "lodash";
import { createDummyInfo, RunningInformationPart } from "@/types";
import { useRunningInfoStore } from "@/store/runningInfo";
import Vue from "vue";
import { mapActions, mapWritableState } from "pinia";

function contains(target: string, substring: string): boolean {
  return target.toLowerCase().search(substring.toLowerCase()) !== -1;
}

export default Vue.extend({
  data() {
    return {
      isOpen: false,
      editing: [] as number[],
      filter: "",
    };
  },
  computed: {
    ...mapWritableState(useRunningInfoStore, ["initialized", "info"]),
    items(): RunningInformationPart[] {
      return this.info?.parts ?? [];
    },
    filteredItems(): RunningInformationPart[] {
      return this.items.filter(
        (i) =>
          contains(i.title, this.filter) || contains(i.content, this.filter)
      );
    },
    sortedItems(): (RunningInformationPart & { isEditing: boolean })[] {
      return sortBy(this.filteredItems, (i) => i.sortOrder).map((i) => {
        return {
          ...i,
          isEditing: this.editing.findIndex((e) => e === i.sortOrder) !== -1,
        };
      });
    },
  },
  async created() {
    if (!this.initialized) {
      await useRunningInfoStore().initialize();
    }
  },
  methods: {
    ...mapActions(useRunningInfoStore, ["save"]),
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    addInformation() {
      if (this.info) {
        this.info = {
          ...this.info,
          parts: this.items.concat([createDummyInfo(this.items.length)]),
        };
        this.save();
      }
    },
    editInformation(order: number) {
      this.editing.push(order);
    },
    saveInformation(data: RunningInformationPart) {
      const order = data.sortOrder;
      this.editing = this.editing.filter((e) => e !== order);
      const originalIndex = this.items.findIndex((i) => i.sortOrder === order);
      const items = cloneDeep(this.items);
      items[originalIndex] = {
        ...data,
      };
      if (this.info) {
        this.info = {
          ...this.info,
          parts: items,
        };
        this.save();
      }
    },
    deleteInformation(order: number) {
      if (this.info) {
        this.info = {
          ...this.info,
          parts: this.items.filter((i) => i.sortOrder !== order),
        };
        this.save();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
