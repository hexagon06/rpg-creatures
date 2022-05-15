import { World } from '@/types'
import { Api } from '../genericApi'

const WORLD_COLLECTION = 'world'
export const WORLD_PAGE_COLLECTION = 'session-run'

export const worldApi = new Api<World>(WORLD_COLLECTION)
