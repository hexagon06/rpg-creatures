import { IdItem, Reference } from '.'

export type SessionPrepBase = {
  title: string
  synopsis: string
}

export type SessionPrepIndex = Reference & SessionPrepBase

export function getSessionPrepIndex (session: SessionPrep): SessionPrepIndex {
  if (!session.id || session.id.length === 0) throw new Error('session should have an id')
  const { title, id, synopsis } = session
  return { title, id, synopsis }
}

export type SessionPrep = IdItem & SessionPrepBase & {
  userId: string
  previousSessionId?: string

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

function getPrep (label: string): PrepSection {
  return {
    prepType: 'image',
    label,
  } as PrepSection
}

export const t = getPrep('list')

export type PrepSection = IdItem & {
  sortOrder: number
  label: string
} & (
    PlayerCharacterPrep |
    SecretsPrep |
    ListPrep |
    TextPrep |
    ChapterPrep |
    ImagePrep |
    LinkPrep)

export type PlayerCharacter = {
  player: string
  character: string
  /** What makes this player happy */
  playerHappiness: string
  characterHooks: string
}

export type PlayerCharacterPrep = {
  prepType: 'playerCharacters'
  characters: PlayerCharacter[]
}

export type SecretsPrep = {
  prepType: 'secrets'
  label: 'Secrets'
  secrets: string[]
}

export type ListItem = IdItem & {
  item: string
}

export type ListPrep = {
  prepType: 'list'
  listType: 'bullet' | 'check' | 'numeric'
  items: ListItem[]
}

export type TextPrep = {
  prepType: 'text'
  text: string
}

export type ChapterPrep = {
  prepType: 'chapter'
  // only a title
}

export type ImagePrep = {
  prepType: 'image'
  source: string
}

export type LinkPrep = {
  prepType: 'link'
  link: string
}
