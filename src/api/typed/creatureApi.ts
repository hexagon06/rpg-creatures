import { useUserStore } from '@/store/users'
import { UserCreatureData } from '@/types'
import { Creature } from '@/types'
import { collection, deleteField, getDocs, query, where } from 'firebase/firestore'
import { firebaseClient } from '../firebaseClient'
import { FirestoreAcces } from '../firestoreAccess'
import { Api } from '../genericApi'

const CREATURE_COLLECTION = 'creatures'

class CreatureApi extends Api<Creature> {
  constructor() {
    super(CREATURE_COLLECTION)
  }

  async get (id: string) {
    const creature = await super.get(id)

    const colRef = collection(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
    const q = query(colRef, where('userId', '==', useUserStore().currentUser?.uid))
    const userData = await getDocs(q)

    if (creature && userData.docs.length > 0) {
      if (userData.docs.length > 1) console.warn('WARNING WARNING More than one doc retrieved')

      creature.userData = {
        ...(userData.docs[0].data() as UserCreatureData),
        id: userData.docs[0].id
      }
    }

    return creature
  }

  async create (creature: Creature) {
    const id = await super.create(creature)
    if (creature.userData) {
      const userDataStore = new FirestoreAcces<UserCreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
      await userDataStore.add(creature.userData)
    }
    return id
  }

  async update (creature: Creature) {
    const entity = { ...creature, userData: deleteField() } as any
    const { id } = creature

    await super.update(entity)

    if (creature.userData) {
      const userDataStore = new FirestoreAcces<UserCreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)

      if (creature.userData.id) {
        await userDataStore.update(creature.userData)
      } else {
        await userDataStore.add(creature.userData)
      }

    }
  }
}

export const creatureApi = new CreatureApi()
