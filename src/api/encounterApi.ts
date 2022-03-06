import { Encounter } from '@/types'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const ENCOUNTER_COLLECTION = 'encounter'

export async function getEncounter (id: string): Promise<Encounter | undefined> {
  try {
    const firestore = new FirestoreAcces<Encounter>(firebaseClient.store, ENCOUNTER_COLLECTION)

    return await firestore.getById(id)
  } catch (e) {
    console.error(e)
  }
}

export async function createEncounter (creature: Encounter): Promise<string> {
  try {
    const firestore = new FirestoreAcces<Encounter>(firebaseClient.store, ENCOUNTER_COLLECTION)

    return await firestore.add(creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateEncounter (creature: Encounter): Promise<void> {
  try {
    const firestore = new FirestoreAcces<Encounter>(firebaseClient.store, ENCOUNTER_COLLECTION)
    await firestore.update(creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
