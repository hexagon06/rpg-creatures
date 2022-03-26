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

  state?: SessionState
  notes?: SessionNote[]
}

// During play the session the prep can be executed
export type SessionState = {

}

// During play the gm can make notes to view later
export type SessionNote = {

}

export type PrepType = PrepSection['prepType']

export type PrepSectionBase = {
  sortOrder: number
  label: string
}

export type PrepSection = IdItem & (
  PlayerCharacterPrep |
  SecretsPrep |
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

export type SecretsPrep = PrepSectionBase & {
  prepType: 'secrets'
  label: 'Secrets'
  secrets: string[]
}

export type ListItem = IdItem & {
  item: string
}

export type ListPrep = PrepSectionBase & {
  prepType: 'list'
  listType: 'bullet' | 'check' | 'numeric'
  items: ListItem[]
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
