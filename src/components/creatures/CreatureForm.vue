<template>
  <div>
    <b-form-group id="input-name-group" label="Name" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="creature.name"
        placeholder="Wolf"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-link-group" label="Link" label-for="input-link">
      <b-form-input
        id="input-link"
        v-model="creature.link"
        placeholder="http://google.doc.share/..."
      ></b-form-input>
    </b-form-group>
    <div class="d-flex">
      <b-form-group
        id="input-source-group"
        label="Source name"
        label-for="input-source"
        class="flex-fill"
      >
        <b-form-input
          id="input-source"
          v-model="creature.source"
          placeholder="Monster Manual"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-page-group"
        label="Page"
        label-for="input-page"
        class="flex-shrink"
      >
        <div class="d-flex">
          <b-button
            :disabled="creature.page === undefined"
            @click="() => creature.page--"
            >&lt;</b-button
          >
          <b-form-input
            id="input-page"
            v-model="creature.page"
            placeholder="#"
            number
            @keypress="isNumber"
            :disabled="creature.source === '' || creature.source === undefined"
          ></b-form-input>
          <b-button
            :disabled="creature.page === undefined"
            @click="() => creature.page++"
            >&gt;</b-button
          >
        </div>
      </b-form-group>
    </div>
    <!-- todo suggestions based on current systems -->
    <!-- todo set this when a book is set with a system -->
    <b-form-group
      id="input-system-group"
      label="Game System"
      label-for="input-system"
    >
      <b-form-input
        id="input-system"
        v-model="creature.system"
        placeholder="Pathfinder"
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
          v-model="creature.image"
          placeholder="http://google.image.share/..."
          @update="imgUrlUpdate"
        ></b-form-input>
      </b-form-group>
      <thumbnail v-if="creature.image" :url="creature.image" />
    </div>
    <div class="d-flex">
      <b-form-group id="input-size-group" label="Size" label-for="input-size">
        <multiselect
          id="input-size"
          v-model="creature.size"
          :options="options.size"
          :clear-on-select="false"
          :show-labels="false"
          :preselect-first="false"
          @input="sizeChange"
        ></multiselect>
      </b-form-group>
      <!-- todo add suggestion based dropdown with custom option -->
      <b-form-group id="input-type-group" label="Type" label-for="input-type">
        <b-form-input
          id="input-type"
          v-model="creature.type"
          placeholder="humanoid"
        ></b-form-input>
      </b-form-group>
    </div>
    <b-form-group
      id="input-alignment-group"
      label="Alignment"
      label-for="input-alignment"
    >
      <alignment-editor id="input-alignment" v-model="creature.alignment" />
    </b-form-group>
    <div class="d-flex">
      <b-form-group
        id="input-ac-group"
        label="Armor class"
        label-for="input-ac"
      >
        <b-form-input
          id="input-ac"
          v-model="creature.ac"
          placeholder="13"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-cr-group"
        label="Challenge Rating"
        label-for="input-cr"
      >
        <b-form-input
          id="input-cr"
          v-model="creature.cr"
          placeholder="2"
          number
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="d-flex">
      <b-form-group
        id="input-hit-dice-amount-group"
        label="# hit dice"
        label-for="input-hit-dice-amount"
        class="flex-shrink"
      >
        <b-form-input
          id="input-hit-dice-amount"
          v-model="creature.amountHitDice"
          placeholder="3"
          number
          @keypress="isNumber"
          :disabled="creature.hp + 0 > 0"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-hit-dice-group"
        label="Hit Dice"
        label-for="input-hit-dice"
        class="flex-shrink"
      >
        <b-form-input
          id="input-hit-dice"
          v-model="creature.hitDice"
          placeholder="8"
          number
          @keypress="isNumber"
          :disabled="creature.hp + 0 > 0"
        ></b-form-input>
      </b-form-group>
      <span class="align-self-end pb-3 my-1 mx-1"> {{ hpFormula }}</span>
      <b-form-group
        id="input-hp-group"
        label="Hitpoints"
        label-for="input-hp"
        class="flex-shrink"
      >
        <b-form-input
          id="input-hp"
          v-model="creature.hp"
          placeholder="13"
          number
          @keypress="isNumber"
          :disabled="creature.hitDice + creature.amountHitDice > 0"
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="d-flex">
      <b-form-group
        id="input-strength-group"
        label="Strength"
        label-for="input-strength"
        :description="modString(strMod)"
      >
        <b-form-input
          id="input-strength"
          v-model="creature.strength"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-dexterity-group"
        label="Dexterity"
        label-for="input-dexterity"
        :description="modString(dexMod)"
      >
        <b-form-input
          id="input-dexterity"
          v-model="creature.dexterity"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-constitution-group"
        label="Constitution"
        label-for="input-constitution"
        :description="modString(conMod)"
      >
        <b-form-input
          id="input-constitution"
          v-model="creature.constitution"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-intelligence-group"
        label="Intelligence"
        label-for="input-intelligence"
        :description="modString(intMod)"
      >
        <b-form-input
          id="input-intelligence"
          v-model="creature.intelligence"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-wisdom-group"
        label="Wisdom"
        label-for="input-wisdom"
        :description="modString(wisMod)"
      >
        <b-form-input
          id="input-wisdom"
          v-model="creature.wisdom"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-charisma-group"
        label="Charisma"
        label-for="input-charisma"
        :description="modString(chaMod)"
      >
        <b-form-input
          id="input-charisma"
          v-model="creature.charisma"
          placeholder="10"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="d-flex">
      <b-form-group
        id="input-speed-group"
        label="Speed"
        label-for="input-speed"
      >
        <b-form-input
          id="input-speed"
          v-model="creature.speed"
          placeholder="30"
          number
          @keypress="isNumber"
        ></b-form-input>
      </b-form-group>
      <span class="flex-fill"></span>
      <b-button
        v-b-toggle.collapse-speed
        variant="primary"
        class="align-self-end mb-3"
        >More options</b-button
      >
    </div>
    <b-collapse id="collapse-speed" class="mt-2">
      <div class="d-flex">
        <b-form-group
          id="input-flying-group"
          label="Flying"
          label-for="input-flying"
        >
          <b-form-input
            id="input-flying"
            v-model="creature.flyingSpeed"
            number
            @keypress="isNumber"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-swim-group" label="Swim" label-for="input-swim">
          <b-form-input
            id="input-swim"
            v-model="creature.swimSpeed"
            number
            @keypress="isNumber"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-climb-group"
          label="Climbing"
          label-for="input-climb"
        >
          <b-form-input
            id="input-climb"
            v-model="creature.climbSpeed"
            number
            @keypress="isNumber"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-burrow-group"
          label="Burrow"
          label-for="input-burrow"
        >
          <b-form-input
            id="input-burrow"
            v-model="creature.burrowSpeed"
            number
            @keypress="isNumber"
          ></b-form-input>
        </b-form-group>
      </div>
    </b-collapse>
    <b-form-group
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
    </b-form-group>
    <b-form-group
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
    </b-form-group>

    <b-form-group id="input-tags-group" label="Tags" label-for="input-tags">
      <pill-multiselect
        id="input-tags"
        v-model="creature.tags"
        :options="tagsOptions"
        :taggable="true"
        @tag="tagTag"
        placeholder="Select size(s)"
      ></pill-multiselect>
    </b-form-group>

    <b-form-group
      id="input-favorite-group"
      label="Favorite"
      label-for="input-favorite"
    >
      <b-form-checkbox
        id="input-favorite"
        v-model="creature.favorite"
      ></b-form-checkbox>
    </b-form-group>
    <b-form-group
      id="input-comments-group"
      label="Comments"
      label-for="input-comments"
    >
      <b-form-textarea
        id="input-comments"
        v-model="creature.comments"
        placeholder="Something interesting..."
        rows="3"
      ></b-form-textarea>
    </b-form-group>
    <!-- </b-tab>
    </b-tabs> -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import PillMultiselect from "../shared/PillMultiselect.vue";
import { Multiselect } from "vue-multiselect";
import { filterStore } from "@/store";
import { filterMapper } from "@/store/filter";
import { Creature } from "@/types/creatures";
import Thumbnail from "./Thumbnail.vue";
import AlignmentEditor from "./AlignmentEditor.vue";

export default Vue.extend({
  components: {
    "pill-multiselect": PillMultiselect,
    Multiselect,
    Thumbnail,
    "alignment-editor": AlignmentEditor,
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
    ...filterMapper.mapState([
      "tagsOptions",
      "environmentOptions",
      "organisationOptions",
    ]),
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
      if (this.creature.hitDice && this.creature.amountHitDice) {
        if (this.conMod !== undefined) {
          const diceAverage = (this.creature.hitDice + 1) / 2;
          const mod = this.conMod > 0 ? this.conMod : 0;
          const hpAverage = Math.floor(
            this.creature.amountHitDice * (diceAverage + mod)
          );

          return `${hpAverage} (${this.creature.amountHitDice}d${
            this.creature.hitDice
          }${
            mod && mod !== 0
              ? this.modString(this.creature.amountHitDice * mod)
              : ""
          })`;
        } else {
          return `${this.creature.amountHitDice}d${this.creature.hitDice}`;
        }
      }
      return "";
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

function toMod(ability?: number): number | undefined {
  if (ability) {
    return Math.floor((ability - 10) / 2);
  }
}
</script>

<style lang="scss" scoped>
</style>
