import { Creature, CreatureFilterTarget, Dnd5eCreature, PathfinderCreature, SourceReference, StandardCreatureInfo, UserData } from "@/types/creatures";
import { DatedItem, IdItem } from "rpg-vue-base";

/** The extra data documents under the data collection */
export type CreatureData = SourceReference | Dnd5eCreature | PathfinderCreature | StandardCreatureInfo | UserData


/** Creature data as stored in the store */
export type CreatureDocument = IdItem & DatedItem & CreatureFilterTarget & {

}

type CreatureStoreData = {
  creatureData: CreatureDocument,
  childData: CreatureData[],
  userData?: UserData,
}

export function toStoreData(creature: Creature): CreatureStoreData {
  const creatureData = { ...creature }
  delete creatureData.info
  delete creatureData.sourceReference
  delete creatureData.stats
  delete creatureData.userData

  const childData = []
  if (creature.info) childData.push(creature.info)
  if (creature.sourceReference) childData.push(creature.sourceReference)
  if (creature.stats) childData.push(creature.stats)
  const userData = creature.userData

  return {
    creatureData,
    childData,
    userData,
  }
}

export function fromStoreData(data: CreatureStoreData): Creature {
  const { creatureData, childData, userData } = data
  return {
    ...creatureData,
    info: childData.find(d => d.type === 'standard-info') as StandardCreatureInfo | undefined,
    sourceReference: childData.find(d => d.type === 'source-reference') as SourceReference | undefined,
    stats: childData.find(d => d.type === 'stats') as Dnd5eCreature | PathfinderCreature | undefined,
    userData
  }
}
