import { Creature } from '@/types/creatures'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const CREATURE_COLLECTION = 'creatures'

export async function getCreatures (): Promise<Creature[]> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)

    return await firestore.get()
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getCreature (id: string): Promise<Creature | undefined> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)

    return await firestore.getById(id)
  } catch (e) {
    console.error(e)
  }
}

export async function createCreature (creature: Creature): Promise<string> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)

    return await firestore.add(creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateCreature (creature: Creature): Promise<void> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)
    await firestore.update(creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
