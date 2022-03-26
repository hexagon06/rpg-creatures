import { SessionPrep } from '@/types'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const SESSION_COLLECTION = 'session-prep'

export async function getSession (id: string): Promise<SessionPrep | undefined> {
  try {
    const firestore = new FirestoreAcces<SessionPrep>(firebaseClient.store, SESSION_COLLECTION)

    return await firestore.getById(id)
  } catch (e) {
    console.error(e)
  }
}

export async function createSession (session: SessionPrep): Promise<string> {
  try {
    const firestore = new FirestoreAcces<SessionPrep>(firebaseClient.store, SESSION_COLLECTION)

    return await firestore.add(session)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateSession (session: SessionPrep): Promise<void> {
  try {
    const firestore = new FirestoreAcces<SessionPrep>(firebaseClient.store, SESSION_COLLECTION)
    await firestore.update(session)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
