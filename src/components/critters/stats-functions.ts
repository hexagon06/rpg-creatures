import { Dnd5eCreature, PathfinderCreature } from "@/types/creatures";
import { deepEqual } from "@firebase/util";

export function areDefaultStats(stats: Dnd5eCreature | PathfinderCreature): boolean {
  if (stats.system === 'dnd5e') return deepEqual(stats, createDefault5eCreature());
  if (stats.system === 'pathfinder') return deepEqual(stats, createDefaultPathfinderCreature());
  throw Error(`System not supported for default comparison`)
}

export function createDefault5eCreature(): Dnd5eCreature {
  return {
    abilityKeys: [],
    abilityScores: { charisma: 10, constitution: 10, dexterity: 10, intelligence: 10, strength: 10, wisdom: 10 },
    alignment: [],
    armor: {},
    speed: {},
    system: 'dnd5e',
    type: 'stats',
  };
}

export function createDefaultPathfinderCreature(): PathfinderCreature {
  return {
    abilityKeys: [],
    abilityScores: { charisma: 10, constitution: 10, dexterity: 10, intelligence: 10, strength: 10, wisdom: 10 },
    alignment: [],
    armor: {},
    speed: {},
    system: 'pathfinder',
    type: 'stats',
  };
}
