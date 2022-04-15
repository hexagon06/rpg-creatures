import { SessionPrep } from '@/types'
import { Api } from '../genericApi'

const SESSION_COLLECTION = 'session-prep'
export const SESSION_RUN_COLLECTION = 'session-run'

export const sessionApi = new Api<SessionPrep>(SESSION_COLLECTION)
