import { IdItem, Reference } from '.'

export type SessionPrepBase = {
  title: string
  synopsis: string
  previousSessionId?: string
}

export type SessionPrepIndex = Reference & SessionPrepBase

export function getSessionPrepIndex (session: SessionPrep): SessionPrepIndex {
  if (!session.id || session.id.length === 0) throw new Error('session should have an id')
  const { title, id, synopsis, previousSessionId } = session
  return { title, id, synopsis, previousSessionId }
}

export type SessionPrep = IdItem & SessionPrepBase & {
  userId: string

  sections: PrepSection[]
}

export type SessionRun = IdItem & SessionPrepBase & {
  userId: string
  sessionId: string
  sections: PrepSection[]
  listStates: ListRun[]
  notes: string
  startDate: number
  endDate?: number
}

// During play the gm can make notes to view later
export type SessionNote = {

}

export type PrepType = PrepSection['prepType']

export type PrepSectionBase = {
  sortOrder: number
  label: string
}

export type RunSection = IdItem & (
  PlayerCharacterPrep |
  ListPrep |
  ListRun |
  TextPrep |
  ChapterPrep |
  ImagePrep |
  LinkPrep)

export type PrepSection = IdItem & (
  PlayerCharacterPrep |
  ListPrep |
  TextPrep |
  ChapterPrep |
  ImagePrep |
  LinkPrep)

export type ChapterPrep = PrepSectionBase & {
  prepType: 'chapter'
  // only a title
}

export type PlayerCharacter = {
  player: string
  character: string
  /** What makes this player happy */
  playerHappiness: string
  characterHooks: string
}

export type PlayerCharacterPrep = PrepSectionBase & {
  prepType: 'player-characters'
  characters: PlayerCharacter[]
}

export type ListItem = IdItem & {
  item: string
}

export type ListPrep = PrepSectionBase & {
  prepType: 'list'
  listType: 'bullet' | 'check' | 'numeric'
  items: ListItem[]
}

export type ListRun = PrepSectionBase & {
  prepType: 'list-run'
  listType: 'check'
  items: ListItem[]
  checked: string[] // ids
}

export type TextPrep = PrepSectionBase & {
  prepType: 'text'
  text: string
}

export type ImagePrep = PrepSectionBase & {
  prepType: 'image'
  source: string
}

export type LinkPrep = PrepSectionBase & {
  prepType: 'link'
  link: string
}
