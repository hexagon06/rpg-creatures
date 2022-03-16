<template>
  <div class="text-left">
    <div class="d-flex">
      <div
        id="input-name-group"
        label="Name"
        label-for="input-name"
        class="flex-fill"
      >
        <input
          id="input-name"
          v-model="creature.name"
          placeholder="Wolf"
          required
        />
      </div>
      <div
        id="input-is-noun-group"
        label-for="input-is-noun"
        class="flex-shrink align-self-end ml-3 mb-4"
      >
        <input
          id="input-is-noun"
          v-model="creature.nameIsNoun"
          type="checkbox"
          required
        />
        Is Noun
        <!-- <input
          id="input-is-noun"
          v-model="creature.nameIsNoun"
          required
        /> -->
      </div>
      <div
        v-if="creature.nameIsNoun"
        id="input-pronoun1-group"
        label="pronoun 1"
        label-for="input-pronoun1"
        class="flex-shrink align-self-end ml-2"
      >
        <input
          id="input-pronoun1"
          v-model="creature.pronoun1"
          placeholder="it"
        />
      </div>
      <div
        v-if="creature.nameIsNoun"
        id="input-pronoun2-group"
        label="pronoun 2"
        label-for="input-pronoun2"
        class="flex-shrink align-self-end ml-2"
      >
        <input
          id="input-pronoun2"
          v-model="creature.pronoun2"
          placeholder="its"
        />
      </div>
    </div>
    <div id="input-link-group" label="Link" label-for="input-link">
      <input
        id="input-link"
        v-model="creature.link"
        placeholder="http://google.doc.share/..."
      />
    </div>
    <div class="d-flex">
      <div
        id="input-source-group"
        label="Source name"
        label-for="input-source"
        class="flex-fill"
      >
        <input
          id="input-source"
          v-model="creature.source"
          placeholder="Monster Manual"
        />
      </div>
      <div
        id="input-page-group"
        label="Page"
        label-for="input-page"
        class="flex-shrink"
      >
        <div class="d-flex">
          <button
            :disabled="creature.page === undefined"
            @click="() => (creature.page--).toString()"
          >
            &lt;
          </button>
          <input
            id="input-page"
            v-model="creature.page"
            placeholder="#"
            number
            @keypress="isNumber"
            :disabled="creature.source === '' || creature.source === undefined"
          />
          <button
            :disabled="creature.page === undefined"
            @click="() => (creature.page++).toString()"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
    <!-- todo suggestions based on current systems -->
    <!-- todo set this when a book is set with a system -->
    <div id="input-system-group" label="Game System" label-for="input-system">
      <input
        id="input-system"
        v-model="creature.system"
        placeholder="Pathfinder"
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
          v-model="creature.image"
          placeholder="http://google.image.share/..."
          @update="imgUrlUpdate"
        />
      </div>
      <thumbnail v-if="creature.image" :url="creature.image" />
    </div>
    <div class="d-flex">
      <div id="input-size-group" label="Size" label-for="input-size">
        <multiselect
          id="input-size"
          v-model="creature.size"
          :options="options.size"
          :clear-on-select="false"
          :show-labels="false"
          :preselect-first="false"
          @input="sizeChange"
        ></multiselect>
      </div>
      <!-- todo add suggestion based dropdown with custom option -->
      <div id="input-type-group" label="Type" label-for="input-type">
        <input id="input-type" v-model="creature.type" placeholder="humanoid" />
      </div>
    </div>
    <div
      id="input-alignment-group"
      label="Alignment"
      label-for="input-alignment"
    >
      <alignment-editor id="input-alignment" v-model="creature.alignment" />
    </div>
    <div class="d-flex">
      <div id="input-ac-group" label="Armor class" label-for="input-ac">
        <input
          id="input-ac"
          v-model="creature.ac"
          placeholder="13"
          number
          @keypress="isNumber"
        />
      </div>
      <div id="input-cr-group" label="Challenge Rating" label-for="input-cr">
        <input id="input-cr" v-model="creature.cr" placeholder="2" number />
      </div>
    </div>
    <div class="d-flex">
      <div
        id="input-hit-dice-amount-group"
        label="# hit dice"
        label-for="input-hit-dice-amount"
        class="flex-shrink"
      >
        <input
          id="input-hit-dice-amount"
          v-model="creature.amountHitDice"
          placeholder="3"
          number
          @keypress="isNumber"
          :disabled="creature.hp + 0 > 0"
        />
      </div>
      <div
        id="input-hit-dice-group"
        label="Hit Dice"
        label-for="input-hit-dice"
        class="flex-shrink"
      >
        <input
          id="input-hit-dice"
          v-model="creature.hitDice"
          placeholder="8"
          number
          @keypress="isNumber"
          :disabled="creature.hp + 0 > 0"
        />
      </div>
      <span class="align-self-end pb-3 my-1 mx-1"> {{ hpFormula }}</span>
      <div
        id="input-hp-group"
        label="Hitpoints"
        label-for="input-hp"
        class="flex-shrink"
      >
        <input
          id="input-hp"
          v-model="creature.hp"
          placeholder="13"
          number
          @keypress="isNumber"
          :disabled="creature.hitDice + creature.amountHitDice > 0"
        />
      </div>
    </div>
    <div class="d-flex">
      <div
        id="input-strength-group"
        label="Strength"
        label-for="input-strength"
        :description="modString(strMod)"
      >
        <input
          id="input-strength"
          v-model="creature.strength"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
      <div
        id="input-dexterity-group"
        label="Dexterity"
        label-for="input-dexterity"
        :description="modString(dexMod)"
      >
        <input
          id="input-dexterity"
          v-model="creature.dexterity"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
      <div
        id="input-constitution-group"
        label="Constitution"
        label-for="input-constitution"
        :description="modString(conMod)"
      >
        <input
          id="input-constitution"
          v-model="creature.constitution"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
      <div
        id="input-intelligence-group"
        label="Intelligence"
        label-for="input-intelligence"
        :description="modString(intMod)"
      >
        <input
          id="input-intelligence"
          v-model="creature.intelligence"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
      <div
        id="input-wisdom-group"
        label="Wisdom"
        label-for="input-wisdom"
        :description="modString(wisMod)"
      >
        <input
          id="input-wisdom"
          v-model="creature.wisdom"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
      <div
        id="input-charisma-group"
        label="Charisma"
        label-for="input-charisma"
        :description="modString(chaMod)"
      >
        <input
          id="input-charisma"
          v-model="creature.charisma"
          placeholder="10"
          number
          @keypress="isNumber"
        />
      </div>
    </div>
    <div class="d-flex">
      <div id="input-speed-group" label="Speed" label-for="input-speed">
        <input
          id="input-speed"
          v-model="creature.speed"
          placeholder="30"
          number
          @keypress="isNumber"
        />
      </div>
      <span class="flex-fill"></span>
      <button variant="primary" class="align-self-end mb-3">
        More options
      </button>
    </div>
    <div id="collapse-speed" class="mt-2">
      <div class="d-flex">
        <div id="input-flying-group" label="Flying" label-for="input-flying">
          <input
            id="input-flying"
            v-model="creature.flyingSpeed"
            number
            @keypress="isNumber"
          />
        </div>
        <div id="input-swim-group" label="Swim" label-for="input-swim">
          <input
            id="input-swim"
            v-model="creature.swimSpeed"
            number
            @keypress="isNumber"
          />
        </div>
        <div id="input-climb-group" label="Climbing" label-for="input-climb">
          <input
            id="input-climb"
            v-model="creature.climbSpeed"
            number
            @keypress="isNumber"
          />
        </div>
        <div id="input-burrow-group" label="Burrow" label-for="input-burrow">
          <input
            id="input-burrow"
            v-model="creature.burrowSpeed"
            number
            @keypress="isNumber"
          />
        </div>
      </div>
    </div>
    <div
      id="input-organisation-group"
      label="Organisation"
      label-for="input-organisation"
    >
      <pill-multiselect
        id="input-organisation"
        v-model="creature.organisation"
        :options="organisationOptions"
        :taggable="true"
        @tag="tagOrganisation"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </div>
    <div
      id="input-environment-group"
      label="Environment"
      label-for="input-environment"
    >
      <pill-multiselect
        id="input-environment"
        v-model="creature.environment"
        :options="environmentOptions"
        :taggable="true"
        @tag="tagEnvironment"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </div>

    <div id="input-tags-group" label="Tags" label-for="input-tags">
      <pill-multiselect
        id="input-tags"
        v-model="creature.tags"
        :options="tagsOptions"
        :taggable="true"
        @tag="tagTag"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </div>

    <creature-ability-editor v-model="creature.abilityKeys" />

    <div id="input-favorite-group" label="Favorite" label-for="input-favorite">
      <input id="input-favorite" v-model="creature.favorite" />
    </div>
    <div id="input-comments-group" label="Comments" label-for="input-comments">
      <input
        id="input-comments"
        v-model="creature.comments"
        placeholder="Something interesting..."
        rows="3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Multiselect } from "vue-multiselect";
import { filterStore, filterMapper } from "@/store";
import { Creature } from "@/types/creatures";
import { toHitDiceFormula, toMod } from "@/shared";

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
    };
  },
  async created() {
    if (!filterStore.state.initialized) {
      await filterStore.actions.fetchSearch();
    }
  },
  computed: {
    ...filterMapper.mapState(["creatureOptions"]),
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
    async tagEnvironment(newEnvironment: string) {
      await filterStore.actions.addEnvironment(newEnvironment);
      this.creature.environment.push(newEnvironment);
    },
    async tagOrganisation(newOrganisation: string) {
      await filterStore.actions.addOrganisation(newOrganisation);
      this.creature.organisation.push(newOrganisation);
    },
    async tagTag(newTag: string) {
      await filterStore.actions.addTag(newTag);
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
input {
  color: black;
}
</style>
