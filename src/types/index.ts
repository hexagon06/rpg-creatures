export * from './indexes'
export {
  Ability, AbilityType, MappedAbility, toAbilityValues, toMappedAbility,
  ChapterPrep, ImagePrep, LinkPrep, ListPrep, PlayerCharacterPrep, PrepSection, PrepSectionBase, PrepType, TextPrep,
  Creature, CreatureAbilityValues, CreatureBase, CreatureIndex, RPGAbilities, UserCreatureData, creatureLabel,
  Encounter, EncounterBase, EncounterIndex, FilledEncounter,
  FilledIdea, Idea, IdeaBase, IdeaIndex,
  RunSection, SessionNote, SessionPrep, SessionPrepBase, SessionPrepIndex, SessionRun,
  FilledRollingList, ListItem, ListRun, RollingList, RollingListBase, RollingListIndex, RollingListItem,
  IdItem, LabeledReference, Reference, ReferenceCount, ReferenceInstance, ReferenceLink, ReferenceListItem, ReferenceType,
  PlayerCharacter,
  Tag,
  diceRegex, justDiceRegex,
  getCreatureIndex, getEncounterIndex, getIdeaIndex, getRollingListIndex, getRollingListItem, getSessionPrepIndex,
  AbillityFilterOptions, CreatureFilter, CreatureFilterOptions, Filter, FilterResult, IdeaFilterOptions, defaultCreatureFilterOptions, defaultResult,
  RunningInformation, RunningInformationPart, createDummyInfo,
} from 'rpg-vue-base'

export type EntityType = "Creature" | "Encounter" | "List" | "Session" | "Item"

export const entityTypeOptions = ["Creature", "Encounter", "List", "Session"]

export type EntityTypeIcon = 'checklist' | 'chest' | 'flat-paw-print' | 'slalom' | 'wooden-door'

export function entityTypeToIcon(type: EntityType): EntityTypeIcon {
  switch (type) {
    case 'Creature': return 'flat-paw-print'
    case 'Encounter': return 'wooden-door'
    case 'List': return 'checklist'
    case 'Session': return 'slalom'
    case 'Item': return 'chest'
    default: throw new Error(`type ${type} has no matched icon`)
  }
}

export type CreatureType =
  'Aberration' |
  'Beast' |
  'Celestial' |
  'Construct' |
  'Dragon' |
  'Elemental' |
  'Fey' |
  'Fiend' |
  'Giant' |
  'Humanoid' |
  'Monstrosity' |
  'Ooze' |
  'Plant' |
  'Undead'

export const creatureTypes = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
] as CreatureType[]

export type CreatureIconType =
  'angel-wings' |
  'behold' |
  'carnivorous-plant' |
  'fairy' |
  'giant' |
  'gooey-daemon' |
  'mimic-chest' |
  'person' |
  'raise-zombie' |
  'rat' |
  'robot-golem' |
  'sharped-teeth-skull' |
  'slime' |
  'spiked-dragon-head' |
  'triple-yin'

export function creatureTypeToIcon(type: CreatureType): CreatureIconType | undefined {
  switch (type.toLowerCase()) {
    case 'aberration': return 'behold'
    case 'beast': return 'rat'
    case 'celestial': return 'angel-wings'
    case 'construct': return 'robot-golem'
    case 'dragon': return 'spiked-dragon-head'
    case 'elemental': return 'triple-yin'
    case 'fey': return 'fairy'
    case 'fiend': return 'sharped-teeth-skull'
    case 'giant': return 'giant'
    case 'humanoid': return 'person'
    case 'monstrosity': return 'mimic-chest'
    case 'ooze': return 'gooey-daemon'
    case 'plant': return 'carnivorous-plant'
    case 'undead': return 'raise-zombie'
  }
}
