import { ChapterPrep, ImagePrep, LinkPrep, ListPrep, PlayerCharacterPrep, PrepSection, PrepSectionBase, PrepType, TextPrep } from '@/types'


function createChapter (base: PrepSectionBase): ChapterPrep {
  return {
    ...base,
    prepType: 'chapter'
  }
}
function createImage (base: PrepSectionBase): ImagePrep {
  return {
    ...base,
    prepType: 'image',
    source: ''
  }
}
function createLink (base: PrepSectionBase): LinkPrep {
  return {
    ...base,
    prepType: 'link',
    link: '',
  }
}
function createList (base: PrepSectionBase): ListPrep {
  return {
    ...base,
    prepType: 'list',
    items: [{ item: '' }],
    listType: 'bullet',
  }
}
function createPlayerCharacters (base: PrepSectionBase): PlayerCharacterPrep {
  return {
    ...base,
    prepType: 'player-characters',
    characters: [{
      character: '',
      characterHooks: '',
      player: '',
      playerHappiness: '',
    }],
  }
}
function createText (base: PrepSectionBase): TextPrep {
  return {
    ...base,
    prepType: 'text',
    text: '',
  }
}

export const prepSectionFactory = {
  create (type: PrepType): PrepSection {
    const base = { sortOrder: 0, label: '' }
    switch (type) {
      case 'chapter':
        return createChapter(base)
      case 'image':
        return createImage(base)
      case 'link':
        return createLink(base)
      case 'list':
        return createList(base)
      case 'player-characters':
        return createPlayerCharacters(base)
      case 'text':
        return createText(base)
      default:
        throw new Error(`factory does not support type '${type}'`)
    }
  },
}
