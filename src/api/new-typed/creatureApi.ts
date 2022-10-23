import { useUserStore } from '@/store/users'
import { Creature, ListCreature, UserData } from '@/types/creatures'
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { firebaseClient } from '../firebaseClient'
import { FirestoreAcces } from '../firestoreAccess'
import { Api, ApiGet, ApiList, IdItemApi } from '../genericApi'
import { CreatureData, CreatureDocument, fromStoreData, toStoreData } from './store-types/creature-store'

const CREATURE_COLLECTION = 'rpg-creatures'

class CreatureApi implements ApiGet<Creature>, ApiGet<Creature>, ApiList<ListCreature>  {
  dataApi: IdItemApi<CreatureDocument>
  listData: ApiList<ListCreature>

  constructor() {
    this.dataApi = new Api<CreatureDocument>(CREATURE_COLLECTION)
    this.listData = new Api<ListCreature>(CREATURE_COLLECTION)
  }

  async get(id: string) {
    const creatureData = await this.dataApi.get(id)
    if (!creatureData) throw Error('No creature found with that id')

    const creatureDataStore = new FirestoreAcces<CreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/data`)
    const childData = await creatureDataStore.get()

    const colRef = collection(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
    const q = query(colRef, where('userId', '==', useUserStore().currentUser?.uid))

    const userData = toUserData(await getDocs(q))


    return fromStoreData({
      creatureData,
      childData,
      userData
    })
  }

  async create(creature: Creature) {
    const {
      creatureData,
      childData,
      userData,
    } = toStoreData(creature)
    // first create the creature
    const id = await this.dataApi.create(creatureData)
    // then its sub collection for userdata
    if (userData) {
      const userDataStore = new FirestoreAcces<CreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
      await userDataStore.add(userData)
    }

    // then its subcollection of other data
    const creatureDataStore = new FirestoreAcces<CreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/data`)
    for (let i = 0; i < childData.length; i++) {
      const data = childData[i]
      if (data.id) await creatureDataStore.addAt(data, data.id)
      else await creatureDataStore.add(data)
    }
    return id
  }

  async update(creature: Creature) {
    const {
      creatureData,
      childData,
      userData,
    } = toStoreData(creature)
    const id = creature.id
    // first update the creature
    await this.dataApi.update(creatureData)
    // then its sub collection for userdata
    if (userData) {
      const userDataStore = new FirestoreAcces<CreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/userData`)
      if (userData.id) await userDataStore.update(userData)
      else await userDataStore.add(userData)
    }

    // then its subcollection of other data
    const creatureDataStore = new FirestoreAcces<CreatureData>(firebaseClient.store, `${CREATURE_COLLECTION}/${id}/data`)
    for (let i = 0; i < childData.length; i++) {
      const data = childData[i]
      if (data.id) await creatureDataStore.update(data)
      else await creatureDataStore.add(data)
    }
    return id
  }

  async list(): Promise<ListCreature[]> {
    return await this.listData.list()
  }
}

function toUserData(userData: QuerySnapshot<DocumentData>): UserData | undefined {
  if (userData.docs.length > 0) {
    if (userData.docs.length > 1) console.warn('WARNING WARNING More than one doc retrieved')

    return {
      ...(userData.docs[0].data() as UserData),
      id: userData.docs[0].id
    }
  }
}

export const creatureApi = new CreatureApi()
