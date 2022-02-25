import { Indexes } from '@/types'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const INDEXES_COLLECTION = 'indexes'

export async function inititialize (userId: string): Promise<Indexes> {
  try {
    const firestore = new FirestoreAcces<Indexes>(firebaseClient.store, INDEXES_COLLECTION)
    const result = await firestore.getById(userId)
    if (result) return result
    else {
      const indexes = defaultIndexes(userId)
      await firestore.addAt(indexes, userId)
      return indexes
    }
  } catch (e) {
    console.error(e)
    return defaultIndexes(userId)
  }
}

function defaultIndexes (id: string): Indexes {
  return {
    id,
    encounters: []
  }
}

export async function set (indexes: Indexes): Promise<void> {
  try {
    const firestore = new FirestoreAcces<Indexes>(firebaseClient.store, INDEXES_COLLECTION)
    await firestore.update(indexes)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
