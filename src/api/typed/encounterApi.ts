import { Encounter } from '@/types'
import { Api } from '../genericApi'

const ENCOUNTER_COLLECTION = 'encounter'

export const encounterApi = new Api<Encounter>(ENCOUNTER_COLLECTION)
