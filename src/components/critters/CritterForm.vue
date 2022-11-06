<template>
  <div class="text-left flex flex-col gap-3">
    <!-- naming -->
    <div class="flex flex-full gap-2">
      <input-wrapper label="Creature Name"
                     validation="Invalid name"
                     :is-valid="creature.name && creature.name.length > 0"
                     class="flex-grow">

        <input id="input-1"
               v-model="creature.name"
               placeholder="Enter name"
               required />
        <template v-slot:help> Is this a named character? </template>
      </input-wrapper>

    </div>
    <h3>General Information</h3>
    <creature-info v-model="creature.info" />
    <!-- source -->
    <h3>Source Reference</h3>
    <source-reference v-model="creature.sourceReference" />
    <!-- image -->
    <div>
      <div class="flex flex-wrap w-full">
        <input-wrapper label="Image source"
                       validation="Image url is too big"
                       :is-valid="
                         creature.image &&
                         creature.image.length > 0 &&
                         creature.image.length < 512
                       "
                       class="w-full md:w-2/3">
          <input id="input-1"
                 v-model="creature.image"
                 placeholder="http://..."
                 required />
        </input-wrapper>
      </div>
      <div>
        <thumbnail v-if="creature.image"
                   :url="creature.image"
                   class="w-24 h-24" />
      </div>
    </div>
    <h3>Common stats</h3>
    <!-- creature type & size -->
    <input-wrapper label="Size"
                   class="flex-grow">
      <multiselect id="input-size"
                   v-model="creature.size"
                   :options="options.size"
                   :clear-on-select="false"
                   :show-labels="false"
                   :preselect-first="false"
                   @input="sizeChange"></multiselect>
    </input-wrapper>
    <div class="flex gap-2">
      <input-wrapper label="Type"
                     class="flex-grow">
        <multiselect id="input-size"
                     v-model="creature.type"
                     :options="typeOptions"
                     :clear-on-select="false"
                     :show-labels="false"
                     :preselect-first="false"></multiselect>
      </input-wrapper>
      <input-wrapper label="sub type"
                     class="flex-grow">
        <input id="input-type"
               v-model="creature.subType"
               placeholder="(descriptor)" />
      </input-wrapper>
    </div>
    <!-- stats -->
    <h3>Stats per game system</h3>
    <input-wrapper label="Game System">
      <!-- todo suggestions based on current systems -->
      <!-- todo set this when a book is set with a system -->
      <multiselect id="input-size"
                   v-model="creature.system"
                   :options="options.system"
                   :clear-on-select="false"
                   :show-labels="false"
                   :preselect-first="false"
                   :disabled="disableSystemSelection"
                   @input="systemChange"></multiselect>
      <template v-slot:help> What system this creature is made for </template>
    </input-wrapper>
    <dhd-5e-stats v-if="creature.stats"
                  v-model="creature.stats" />

    <h3>Meta Data</h3>
    <input-wrapper label="Environments">
      <pill-multiselect id="input-environment"
                        v-model="environment"
                        :options="environmentOptions"
                        :taggable="true"
                        @tag="tagEnvironment"
                        placeholder="Select size(s)"></pill-multiselect>
    </input-wrapper>

    <input-wrapper label="Tags">
      <pill-multiselect id="input-tags"
                        v-model="creature.tags"
                        :options="tagsOptions"
                        :taggable="true"
                        @tag="tagTag"
                        placeholder="Select size(s)"></pill-multiselect>
    </input-wrapper>

    <input-wrapper label="Comments">
      <textarea id="input-comments"
                v-model="comments"
                placeholder="Something interesting..."
                rows="3" />
      <template v-slot:help>
        Any comments you want to remember about this creature. It is linked to
        your account
      </template>
    </input-wrapper>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Multiselect } from "vue-multiselect";
import { Creature, Dnd5eCreature, PathfinderCreature } from "@/types/creatures";
import { useFilterStore } from "@/store/filter";
import { mapState } from "pinia";
import { useUserStore } from "@/store/users";
import { useCritterStore } from "@/store/critters";
// import { useCreatureStore } from "@/store/creatures";
import CreatureInfo from './form/CreatureInfo.vue'
import SourceReference from "./form/SourceReference.vue";
import Dnd5eStats from './form/Dnd5eStats.vue'
import { areDefaultStats, createDefault5eCreature, createDefaultPathfinderCreature } from "./stats-functions";

export default Vue.extend({
  components: {
    Multiselect,
    CreatureInfo,
    SourceReference,
    'dhd-5e-stats': Dnd5eStats
  },
  props: {
    value: Object as PropType<Creature>,
  },
  data() {
    return {
      options: {
        size: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
        system: ["Pathfinder", 'D&D 5e']
      },
      creature: this.value,
      showSpeedsClicked: false,
      environment: this.value.environment ?? []
    };
  },
  async created() {
    const store = useFilterStore();
    if (!store.initialized) {
      await store.fetchSearch();
    }
  },
  computed: {
    ...mapState(useFilterStore, ["creatureOptions"]),
    ...mapState(useUserStore, ["currentUser"]),
    ...mapState(useCritterStore, ["typeOptions"]),
    tagsOptions(): string[] {
      return this.creatureOptions.tags;
    },
    environmentOptions(): string[] {
      return this.creatureOptions.environment;
    },
    organisationOptions(): string[] {
      return this.creatureOptions.organisation;
    },
    comments: {
      get(): string {
        return this.creature.userData?.comments ?? "";
      },
      set(value: string) {
        if (this.creature.userData) {
          this.creature.userData = {
            ...this.creature.userData,
            comments: value,
          };
        } else if (this.currentUser) {
          this.creature.userData = {
            type: 'user-data',
            userId: this.currentUser.uid,
            comments: value,
            // favorite: false,
          };
        } else throw new Error("currentUser should be set");
      },
    },
    disableSystemSelection(): boolean {
      if (this.creature.stats) {
        return !areDefaultStats(this.creature.stats)
      }
      return false;
    }
  },
  watch: {
    creature: {
      handler(newvalue: Creature) {
        this.$emit("input", { ...newvalue, environment: this.environment });
      },
      deep: true,
      immediate: true,
    },
    environment() { this.$emit("input", { ...this.creature, environment: this.environment }); }
  },
  methods: {
    systemChange(system: string) {
      if (system === 'Pathfinder') {
        const stats = createDefaultPathfinderCreature()
        this.creature.stats = stats
      } else if (system === 'D&D 5e') {
        const stats = createDefault5eCreature()
        this.creature.stats = stats
      } else {
        this.creature.stats = undefined
      }
    },
    toggleSpeeds() {
      this.showSpeedsClicked = true;
    },
    async tagEnvironment(newEnvironment: string) {
      await useFilterStore().addEnvironment(newEnvironment);
      if (this.creature.environment) {
        this.creature.environment.push(newEnvironment);
      }
      else {
        this.creature.environment = [newEnvironment]
      }
    },
    async tagOrganisation(newOrganisation: string) {
      await useFilterStore().addOrganisation(newOrganisation);
      if (!this.creature.info) this.creature.info = { id: 'standard-info', type: 'standard-info', nameIsNoun: false }
      if (!this.creature.info.organisation) this.creature.info.organisation = []
      this.creature.info.organisation.push(newOrganisation);
    },
    async tagTag(newTag: string) {
      await useFilterStore().addTag(newTag);
      this.creature.tags.push(newTag);
    },
    isNumber(evt: KeyboardEvent | undefined): boolean {
      if (evt) {
        switch (evt.key) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          case "0":
            return true;
          default:
            evt.preventDefault();
            return false;
        }
      }
      return false;
    },
    imgUrlUpdate(value: string) {
      var rx = new RegExp(
        "^(https://static.wikia.nocookie.net/.*)(?=/revision/latest?)"
      );
      const result = rx.exec(value);
      if (result) {
        this.creature.image = result[1];
      } else {
        this.creature.image = value;
      }
    },
    // todo make this based on a watched property instead of an interface event
    sizeChange(newSize: string) {
      if (this.creature.stats?.hp) {
        switch (newSize) {
          case "Tiny":
            this.creature.stats.hp.hitDice = 4;
            break;
          case "Small":
            this.creature.stats.hp.hitDice = 6;
            break;
          case "Medium":
            this.creature.stats.hp.hitDice = 8;
            break;
          case "Large":
            this.creature.stats.hp.hitDice = 10;
            break;
          case "Huge":
            this.creature.stats.hp.hitDice = 12;
            break;
          case "Gargantuan":
            this.creature.stats.hp.hitDice = 20;
            break;
          default:
            break;
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
input,
textarea {
  color: black;
}
</style>
