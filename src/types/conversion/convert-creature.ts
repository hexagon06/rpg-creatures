import { Creature as OldCreature } from "rpg-vue-base";
import { Creature, Dnd5eCreature, PathfinderCreature, RPGAbilities } from '../creatures'

export function convertCreature(source: OldCreature): Creature {
  const basicData: Creature = {
    // id: source.id // we let the insert create a new id
    created: source.created,
    // this should not be edited after conversion, though it normally should
    lastEdited: source.lastEdited,
    cr: source.cr,
    name: source.name,
    tags: source.tags,
    image: source.image,
    size: source.size,
    type: source.type,
    subType: source.subType,
    // these values are not (yet) shown on the list
    environment: length0ToUndefined(source.environment),
    // note, the following properties have duplicate data in 
    info: {
      id: "standard-info",
      type: "standard-info",
      nameIsNoun: source.nameIsNoun,
      pronoun1: source.pronoun1,
      pronoun2: source.pronoun2,
      organisation: length0ToUndefined(source.organisation),
    }
  }

  if (source.source || source.link || source.page) {
    basicData.sourceReference = {
      id: 'source-reference',
      type: 'source-reference',
      name: source.source ?? 'unknown',
      link: source.link,
      page: source.page,
    }
  }

  if (source.userData) {
    basicData.userData = {
      type: 'user-data',
      userId: source.userData.userId,
      comments: source.userData.comments,
    }
  }

  const stats = {
    id: 'stats',
    type: 'stats',
    abilityScores: getAbilityScores(source),
    armor: {
      ac: source.ac,
    },
    hp: getHp(source),
    abilityKeys: length0ToUndefined(source.abilityKeys),
    alignment: source.alignment,
    speed: getSpeed(source),
  }

  if (source.system === 'D&D 5e') {
    return { ...basicData, stats: { ...stats, system: 'dnd5e' } as Dnd5eCreature }
  } else {
    return { ...basicData, stats: { ...stats, system: 'pathfinder' } as PathfinderCreature }
  }
}

function getHp(source: OldCreature) {
  const { hp, hitDice, amountHitDice } = source
  if (hitDice && amountHitDice) {
    return { hitDice, amountHitDice }
  } else if (hp) {
    return { hitDice: 1, amountHitDice: hp }
  } else return undefined
}

function getAbilityScores(source: OldCreature): RPGAbilities {
  return {
    strength: source.strength ?? source.abilityScores ? source.abilityScores.strength : undefined,
    dexterity: source.dexterity ?? source.abilityScores ? source.abilityScores.dexterity : undefined,
    constitution: source.constitution ?? source.abilityScores ? source.abilityScores.constitution : undefined,
    wisdom: source.wisdom ?? source.abilityScores ? source.abilityScores.wisdom : undefined,
    intelligence: source.intelligence ?? source.abilityScores ? source.abilityScores.intelligence : undefined,
    charisma: source.charisma ?? source.abilityScores ? source.abilityScores.charisma : undefined,
  }
}

function length0ToUndefined<T>(source: T[]): T[] | undefined {
  return source.length === 0 ? undefined : source;
}

function getSpeed(source: OldCreature) {
  return {
    burrow: source.burrowSpeed,
    climb: source.climbSpeed,
    flying: source.flyingSpeed,
    swim: source.swimSpeed,
    walking: source.speed,
  }
}
