import { CreatureIndex, Indexes, UserIndexes } from '@/types'
import { cloneDeep } from 'lodash'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const INDEXES_COLLECTION = 'indexes'
const CREATURE_INDEXES_COLLECTION = 'creatures'

type CreatureIndexDoc = {
  id: string,
  creatures: CreatureIndex[],
}

async function fetchCreatureIndexes (): Promise<CreatureIndex[]> {
  const firestore = new FirestoreAcces<CreatureIndexDoc>(firebaseClient.store, INDEXES_COLLECTION)
  const result = await firestore.getById(CREATURE_INDEXES_COLLECTION)
  return result?.creatures ?? []
}

export async function setCreatureIndexes (indexes: CreatureIndex[]): Promise<void> {
  const firestore = new FirestoreAcces<CreatureIndexDoc>(firebaseClient.store, INDEXES_COLLECTION)
  const data = {
    id: CREATURE_INDEXES_COLLECTION,
    creatures: indexes
  } as CreatureIndexDoc

  if (await firestore.getById(CREATURE_INDEXES_COLLECTION)) {
    await firestore.update(data)
  } else {
    await firestore.addAt(data, CREATURE_INDEXES_COLLECTION)
  }
}

export async function inititialize (userId: string): Promise<Indexes> {
  try {
    const firestore = new FirestoreAcces<UserIndexes>(firebaseClient.store, INDEXES_COLLECTION)
    const result = await firestore.getById(userId)
    const creatures = await fetchCreatureIndexes()
    if (result) return {
      ...result,
      creatures
    }
    else {
      const indexes = defaultIndexes(userId)
      await firestore.addAt(indexes, userId)
      return {
        ...indexes,
        creatures,
      }
    }
  } catch (e) {
    console.error(e)
    return {
      ...defaultIndexes(userId),
      creatures: []
    }
  }
}

function defaultIndexes (id: string): UserIndexes {
  return {
    id,
    encounters: [],
  }
}

export async function set (indexes: Indexes): Promise<void> {
  try {
    const firestore = new FirestoreAcces<UserIndexes>(firebaseClient.store, INDEXES_COLLECTION)
    await setCreatureIndexes(indexes.creatures)
    const indexesData = cloneDeep(indexes) as any
    delete indexesData.creatures
    await firestore.update(indexes)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
