import { Ability } from '@/types/abilities'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const ABILITY_COLLECTION = 'abilities'

export async function getAbilities (): Promise<Ability[]> {
  try {
    const firestore = new FirestoreAcces<Ability>(firebaseClient.store, ABILITY_COLLECTION)

    return await firestore.get()
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getAbility (id: string): Promise<Ability | undefined> {
  try {
    const firestore = new FirestoreAcces<Ability>(firebaseClient.store, ABILITY_COLLECTION)

    return await firestore.getById(id)
  } catch (e) {
    console.error(e)
  }
}

export async function createAbility (ability: Ability): Promise<string> {
  try {
    const firestore = new FirestoreAcces<Ability>(firebaseClient.store, ABILITY_COLLECTION)

    return await firestore.add(ability)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateAbility (ability: Ability): Promise<void> {
  try {
    const firestore = new FirestoreAcces<Ability>(firebaseClient.store, ABILITY_COLLECTION)
    await firestore.update(ability)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}
