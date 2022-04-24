<template>
  <div class="text-left flex flex-col gap-3">
    <!-- naming -->
    <div class="flex flex-full gap-2">
      <input-wrapper
        label="Creature Name"
        validation="Invalid name"
        :is-valid="creature.name && creature.name.length > 0"
        class="flex-grow"
      >
        <input
          id="input-1"
          v-model="creature.name"
          placeholder="Enter name"
          required
        />
        <template v-slot:help> Is this a named character? </template>
      </input-wrapper>
      <input-wrapper label="Is Noun" class="flex-shrink">
        <div class="flex h-6">
          <input
            id="input-is-noun"
            v-model="creature.nameIsNoun"
            type="checkbox"
            required
          />
        </div>
      </input-wrapper>
    </div>
    <div v-if="creature.nameIsNoun" class="flex flex-full gap-2">
      <input-wrapper label="Subject">
        <input
          id="input-pronoun1"
          v-model="creature.pronoun1"
          placeholder="it"
          class="w-16"
        />
      </input-wrapper>
      <input-wrapper label="Possessive">
        <input
          id="input-pronoun2"
          v-model="creature.pronoun2"
          placeholder="its"
          class="w-16"
        />
      </input-wrapper>
    </div>
    <!-- source -->
    <input-wrapper label="Link">
      <input
        id="input-link"
        v-model="creature.link"
        placeholder="http://google.doc.share/..."
      />
      <template v-slot:help>
        Link to a source where this creature can be found
      </template>
    </input-wrapper>
    <div class="flex gap-2">
      <input-wrapper label="Page">
        <div class="flex gap-2">
          <button
            :disabled="creature.page === undefined"
            @click="() => (creature.page--).toString()"
            class="button-round button-on-gold"
          >
            <font-awesome-icon icon="fa-solid fa-minus" />
          </button>
          <input
            id="input-page"
            v-model="creature.page"
            placeholder="#"
            number
            @keypress="isNumber"
            :disabled="creature.source === '' || creature.source === undefined"
            class="w-9 text-center"
          />
          <button
            :disabled="creature.page === undefined"
            @click="() => (creature.page++).toString()"
            class="button-round button-on-gold"
          >
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
        </div>
      </input-wrapper>
      <input-wrapper label="Source">
        <input
          id="input-source"
          v-model="creature.source"
          placeholder="Monster Manual"
        />
        <template v-slot:help>
          Name of a source where this creature can be found.
        </template>
      </input-wrapper>
    </div>
    <input-wrapper label="Game System">
      <!-- todo suggestions based on current systems -->
      <!-- todo set this when a book is set with a system -->
      <input
        id="input-system"
        v-model="creature.system"
        placeholder="Pathfinder"
      />
      <template v-slot:help> What system this creature is made for </template>
    </input-wrapper>
    <!-- image -->
    <div>
      <div class="flex flex-wrap w-full">
        <input-wrapper
          label="Source"
          validation="Image url is too big"
          :is-valid="
            creature.image &&
            creature.image.length > 0 &&
            creature.image.length < 512
          "
          class="w-full md:w-2/3"
        >
          <input
            id="input-1"
            v-model="creature.image"
            placeholder="http://..."
            required
          />
        </input-wrapper>
      </div>
      <div>
        <thumbnail
          v-if="creature.image"
          :url="creature.image"
          class="w-24 h-24"
        />
      </div>
    </div>
    <!-- creature type & size -->
    <input-wrapper label="Size" class="flex-grow">
      <multiselect
        id="input-size"
        v-model="creature.size"
        :options="options.size"
        :clear-on-select="false"
        :show-labels="false"
        :preselect-first="false"
        @input="sizeChange"
      ></multiselect>
    </input-wrapper>
    <div class="flex gap-2">
      <input-wrapper label="Type" class="flex-grow">
        <multiselect
          id="input-size"
          v-model="creature.type"
          :options="typeOptions"
          :clear-on-select="false"
          :show-labels="false"
          :preselect-first="false"
        ></multiselect>
      </input-wrapper>
      <input-wrapper label="sub type" class="flex-grow">
        <input
          id="input-type"
          v-model="creature.subType"
          placeholder="(descriptor)"
        />
      </input-wrapper>
    </div>
    <!-- alignment -->
    <input-wrapper label="Alignment">
      <alignment-editor id="input-alignment" v-model="creature.alignment" />
    </input-wrapper>
    <!-- difficulty -->
    <div class="flex flex-full gap-2">
      <input-wrapper label="Armor class" class="w-20">
        <input
          id="input-ac"
          v-model="creature.ac"
          placeholder="13"
          number
          @keypress="isNumber"
          class="w-16"
        />
      </input-wrapper>
      <input-wrapper label="Challenge Rating">
        <input
          id="input-cr"
          v-model="creature.cr"
          placeholder="2"
          number
          class="w-16"
        />
      </input-wrapper>
    </div>
    <div class="flex gap-2">
      <input-wrapper label="Hit dice">
        <div class="flex gap-2">
          <input
            id="input-hit-dice-amount"
            v-model="creature.amountHitDice"
            placeholder="3"
            number
            @keypress="isNumber"
            :disabled="creature.hp + 0 > 0"
            class="w-10 text-center"
          />
          <input
            id="input-hit-dice"
            v-model="creature.hitDice"
            placeholder="8"
            number
            @keypress="isNumber"
            :disabled="creature.hp + 0 > 0"
            class="w-16 text-center"
          />
        </div>
        <template v-slot:help> # and size of dice. </template>
      </input-wrapper>
      <span class="mt-7"> {{ hpFormula }}</span>
      <input-wrapper label="Hitpoints">
        <input
          id="input-hp"
          v-model="creature.hp"
          placeholder="13"
          number
          @keypress="isNumber"
          :disabled="creature.hitDice + creature.amountHitDice > 0"
          class="w-16"
        />
      </input-wrapper>
    </div>
    <!-- ability scores -->
    <input-wrapper label="Ability scores">
      <div class="flex gap-2">
        <input-wrapper label="STR">
          <input
            id="input-strength"
            v-model="creature.strength"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(strMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="DEX">
          <input
            id="input-dexterity"
            v-model="creature.dexterity"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(dexMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="CON">
          <input
            id="input-constitution"
            v-model="creature.constitution"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(conMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="INT">
          <input
            id="input-intelligence"
            v-model="creature.intelligence"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(intMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="WIS">
          <input
            id="input-wisdom"
            v-model="creature.wisdom"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(wisMod) }}
          </template>
        </input-wrapper>
        <input-wrapper label="CHA">
          <input
            id="input-charisma"
            v-model="creature.charisma"
            placeholder="10"
            number
            @keypress="isNumber"
            class="w-9"
          />
          <template v-slot:help>
            {{ modString(chaMod) }}
          </template>
        </input-wrapper>
      </div>
    </input-wrapper>
    <div class="flex gap-2 items-end">
      <input-wrapper label="Speed">
        <input
          id="input-speed"
          v-model="creature.speed"
          placeholder="30"
          number
          @keypress="isNumber"
          class="w-20"
        />
      </input-wrapper>

      <button
        v-if="!showSpeeds && !showSpeedsClicked"
        variant="primary"
        class="border-2 px-2 mb-3 button-on-gold rounded-lg"
        @click="toggleSpeeds"
      >
        More options
      </button>
    </div>
    <div v-if="showSpeeds" class="grid gap-2 max-w-full grid-cols-4">
      <input-wrapper label="Flying">
        <input
          id="input-flying"
          v-model="creature.flyingSpeed"
          number
          @keypress="isNumber"
        />
      </input-wrapper>
      <input-wrapper label="Swim">
        <input
          id="input-swim"
          v-model="creature.swimSpeed"
          number
          @keypress="isNumber"
        />
      </input-wrapper>
      <input-wrapper label="Climbing">
        <input
          id="input-climb"
          v-model="creature.climbSpeed"
          number
          @keypress="isNumber"
        />
      </input-wrapper>
      <input-wrapper label="Burrow">
        <input
          id="input-burrow"
          v-model="creature.burrowSpeed"
          number
          @keypress="isNumber"
        />
      </input-wrapper>
    </div>
    <input-wrapper label="Organisation">
      <pill-multiselect
        id="input-organisation"
        v-model="creature.organisation"
        :options="organisationOptions"
        :taggable="true"
        @tag="tagOrganisation"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </input-wrapper>
    <input-wrapper label="Environments">
      <pill-multiselect
        id="input-environment"
        v-model="creature.environment"
        :options="environmentOptions"
        :taggable="true"
        @tag="tagEnvironment"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </input-wrapper>
    <input-wrapper label="Tags">
      <pill-multiselect
        id="input-tags"
        v-model="creature.tags"
        :options="tagsOptions"
        :taggable="true"
        @tag="tagTag"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </input-wrapper>

    <creature-ability-editor v-model="creature.abilityKeys" />

    <input-wrapper label="Favorite">
      <input id="input-is-noun" v-model="favorite" type="checkbox" />
    </input-wrapper>

    <input-wrapper label="Comments">
      <textarea
        id="input-comments"
        v-model="comments"
        placeholder="Something interesting..."
        rows="3"
      />
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
import { Creature } from "@/types";
import { toHitDiceFormula, toMod } from "@/shared";
import { useFilterStore } from "@/store/filter";
import { mapState } from "pinia";
import { useUserStore } from "@/store/users";
import { useCreatureStore } from "@/store/creatures";

export default Vue.extend({
  components: {
    Multiselect,
  },
  props: {
    value: Object as PropType<Creature>,
  },
  data() {
    return {
      options: {
        size: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
      },
      creature: this.value,
      showSpeedsClicked: false,
    };
  },
  async created() {
    const store = useFilterStore();
    if (!store.initialized) {
      await store.fetchSearch();
    }
  },
  computed: {
    showSpeeds(): boolean {
      return (
        this.showSpeedsClicked ||
        this.creature.swimSpeed !== undefined ||
        this.creature.burrowSpeed !== undefined ||
        this.creature.flyingSpeed !== undefined ||
        this.creature.climbSpeed !== undefined
      );
    },
    ...mapState(useFilterStore, ["creatureOptions"]),
    ...mapState(useUserStore, ["currentUser"]),
    ...mapState(useCreatureStore, ["typeOptions"]),
    tagsOptions(): string[] {
      return this.creatureOptions.tags;
    },
    environmentOptions(): string[] {
      return this.creatureOptions.environment;
    },
    organisationOptions(): string[] {
      return this.creatureOptions.organisation;
    },
    strMod(): number | undefined {
      return toMod(this.creature.strength);
    },
    dexMod(): number | undefined {
      return toMod(this.creature.dexterity);
    },
    conMod(): number | undefined {
      return toMod(this.creature.constitution);
    },
    intMod(): number | undefined {
      return toMod(this.creature.intelligence);
    },
    wisMod(): number | undefined {
      return toMod(this.creature.wisdom);
    },
    chaMod(): number | undefined {
      return toMod(this.creature.charisma);
    },
    hpFormula(): string {
      return toHitDiceFormula(
        this.creature.hitDice,
        this.creature.amountHitDice,
        this.conMod
      );
    },
    favorite: {
      get(): boolean {
        return this.creature.userData?.favorite ?? false;
      },
      set(value: boolean) {
        if (this.creature.userData) {
          this.creature.userData = {
            ...this.creature.userData,
            favorite: value,
          };
        } else if (this.currentUser) {
          this.creature.userData = {
            userId: this.currentUser.uid,
            favorite: value,
          };
        } else throw new Error("currentUser should be set");
      },
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
            userId: this.currentUser.uid,
            comments: value,
            favorite: false,
          };
        } else throw new Error("currentUser should be set");
      },
    },
  },
  watch: {
    creature: {
      handler(newvalue: Creature) {
        this.$emit("input", newvalue);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    toggleSpeeds() {
      this.showSpeedsClicked = true;
    },
    async tagEnvironment(newEnvironment: string) {
      await useFilterStore().addEnvironment(newEnvironment);
      this.creature.environment.push(newEnvironment);
    },
    async tagOrganisation(newOrganisation: string) {
      await useFilterStore().addOrganisation(newOrganisation);
      this.creature.organisation.push(newOrganisation);
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
    modString(mod?: number): string | undefined {
      if (mod !== undefined) {
        if (mod < 0) return mod.toString();
        else return `+${mod}`;
      }
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
      switch (newSize) {
        case "Tiny":
          this.creature.hitDice = 4;
          break;
        case "Small":
          this.creature.hitDice = 6;
          break;
        case "Medium":
          this.creature.hitDice = 8;
          break;
        case "Large":
          this.creature.hitDice = 10;
          break;
        case "Huge":
          this.creature.hitDice = 12;
          break;
        case "Gargantuan":
          this.creature.hitDice = 20;
          break;
        default:
          break;
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
