import { DatedItem, IdItem, Reference, Tag } from 'rpg-vue-base';

/** The information shown on a list view */
export type CreatureBase = {
  cr?: number;
  name: string;
  tags: string[]; // fancy tags should be done separately. It should be a separate lookup, used to translate to display properties
  image?: string;
  size?: string;
  type?: string;
  subType?: string;
}

/** These are the properties the creature search should have available */
export type CreatureFilterTarget = CreatureBase & {
  environment?: string[];
  source?: string;
  system?: string;
}

/** Standard abilities used in many RPG stat blocks */
export declare type RPGAbilities = {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
};

/** Information of a D&D 5th edition creature */
export type Dnd5eCreature = IdItem & {
  id: 'stats'
  type: 'stats'
  system: 'dnd5e',
  abilityScores: RPGAbilities;
  armor: {
    ac?: number;
    type?: string
  };
  hp?: {
    hitDice: number;
    amountHitDice: number;
  };
  abilityKeys: string[]; // should link to an ability in the store
  alignment: string[];
  speed: {
    burrow?: number;
    climb?: number;
    flying?: number;
    swim?: number;
    walking?: number;
    note?: string;
  };
}

export type CreatureSpeed = {
  burrow?: number;
  climb?: number;
  flying?: number;
  swim?: number;
  walking?: number;
  note?: string;
};

/** Information of a Pathfinder 1st edition creature */
export type PathfinderCreature = IdItem & {
  id: 'stats'
  type: 'stats'
  system: 'pathfinder',
  abilityScores: RPGAbilities;
  armor: {
    ac?: number;
    type?: string
  };
  hp?: {
    hitDice: number;
    amountHitDice: number;
  };
  abilityKeys?: string[]; // should link to an ability in the store
  alignment: string[];
  speed: CreatureSpeed;
}

/** Reference to where this material can be found */
export type SourceReference = IdItem & {
  id: 'source-reference'
  type: 'source-reference'
  name: string,
  link?: string;
  page?: number;
}

/** System agnostic information about the creature */
export type StandardCreatureInfo = IdItem & {
  id: 'standard-info';
  type: 'standard-info';
  nameIsNoun: boolean;
  pronoun1?: string;
  pronoun2?: string;
  organisation?: string[];
}

/** Data specific for a user. This is not authorisation data */
export type UserData = IdItem & {
  type: 'user-data',
  userId: string;
  comments?: string;
};

/** The type we expect from the api.list() type calls */
export type ListCreature = Reference & DatedItem & CreatureBase;

/** The creature for details */
export type Creature = IdItem & DatedItem & CreatureFilterTarget & {
  info?: StandardCreatureInfo
  sourceReference?: SourceReference
  stats?: Dnd5eCreature | PathfinderCreature
  userData?: UserData
}
