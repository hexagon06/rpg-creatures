import { RollingList } from '@/types'
import { Api } from '../genericApi'

const LIST_COLLECTION = 'rolling-list'

export const listApi = new Api<RollingList>(LIST_COLLECTION)
