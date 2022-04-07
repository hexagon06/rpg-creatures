import { Idea } from '@/types'
import { Api } from '../genericApi'

const ENCOUNTER_COLLECTION = 'idea'

export const ideaApi = new Api<Idea>(ENCOUNTER_COLLECTION)
