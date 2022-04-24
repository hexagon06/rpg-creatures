import { RunningInformation } from '@/types'
import { Api } from '../genericApi'

const RUNNINGINFO_COLLECTION = 'running-info'

export const runningInfoApi = new Api<RunningInformation>(RUNNINGINFO_COLLECTION)
