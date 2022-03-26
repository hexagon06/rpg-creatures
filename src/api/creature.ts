import { userStore } from '@/store'
import { UserCreatureData } from '@/types'
import { Creature } from '@/types/creatures'
import { collection, deleteField, getDocs, query, where } from 'firebase/firestore'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

const CREATURE_COLLECTION = 'creatures'

export async function getCreature (id: string): Promise<Creature | undefined> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)
    const creature = await firestore.getById(id)

    const colRef = collection(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
    const q = query(colRef, where('userId', '==', userStore.state.currentUser?.uid))
    const userData = await getDocs(q)

    console.log(creature)

    if (creature && userData.docs.length > 0) {
      console.log(userData.docs.length, userStore.state.currentUser?.uid)

      if (userData.docs.length > 1) console.warn('WARNING WARNING More than one doc retrieved')

      creature.userData = {
        ...(userData.docs[0].data() as UserCreatureData),
        id: userData.docs[0].id
      }
    }
    return creature
  } catch (e) {
    console.error(e)
  }
}

export async function createCreature (creature: Creature): Promise<string> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)
    const id = await firestore.add(creature)

    if (creature.userData) {
      const userDataStore = new FirestoreAcces<UserCreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
      await userDataStore.add(creature.userData)
    }

    return id
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateCreature (creature: Creature): Promise<void> {
  try {
    const firestore = new FirestoreAcces<Creature>(firebaseClient.store, CREATURE_COLLECTION)

    const entity = { ...creature, userData: deleteField() } as any
    const { id } = creature

    await firestore.update(entity)

    if (creature.userData) {
      const userDataStore = new FirestoreAcces<UserCreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)

      if (creature.userData.id) {
        await userDataStore.update(creature.userData)
      } else {
        await userDataStore.add(creature.userData)
      }

    }
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
