import { UserData } from '@/types'
import { Api } from '../genericApi'

const USERDATA_COLLECTION = 'user-data'

export const userDataApi = new Api<UserData>(USERDATA_COLLECTION)
