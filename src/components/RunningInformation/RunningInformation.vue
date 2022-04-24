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
    <div class="bg-brown outline outline-rouge drop-shadow-lg outline-4 h-full">
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
                  <div class="flex justify-end">
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
import { sortBy } from "lodash";
import Vue from "vue";

function createDummy(order: number): RunningInformationPart {
  return {
    title: `Item ${order + 1}`,
    content: `Content for item ${order + 1}`,
    sortOrder: order,
  };
}

type RunningInformationPart = {
  title: string;
  content: string;
  sortOrder: number;
};

export default Vue.extend({
  data() {
    return {
      isOpen: false,
      items: [
        createDummy(0),
        createDummy(3),
        createDummy(1),
        createDummy(4),
        createDummy(2),
      ],
      editing: [] as number[],
    };
  },
  computed: {
    sortedItems(): (RunningInformationPart & { isEditing: boolean })[] {
      return sortBy(this.items, (i) => i.sortOrder).map((i) => {
        return {
          ...i,
          isEditing: this.editing.findIndex((e) => e === i.sortOrder) !== -1,
        };
      });
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    addInformation() {
      this.items.push(createDummy(this.items.length));
    },
    editInformation(order: number) {
      console.log("edit");

      this.editing.push(order);
    },
    saveInformation(data: RunningInformationPart) {
      const order = data.sortOrder;
      this.editing = this.editing.filter((e) => e !== order);
      const originalIndex = this.items.findIndex((i) => i.sortOrder === order);
      this.items[originalIndex] = {
        ...data,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
