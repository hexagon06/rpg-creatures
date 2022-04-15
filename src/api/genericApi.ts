import { IdItem } from '@/types'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'


export class Api<T extends IdItem> {

  constructor(private collection: string) {

  }

  async get (id: string): Promise<T | undefined> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.getById(id)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to get ${id} in ${this.collection}`)
    }
  }

  async create (creature: T): Promise<string> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.add(creature)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to create in ${this.collection}`)
    }
  }

  async update (creature: T): Promise<void> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      await firestore.update(creature)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to update ${creature.id} in ${this.collection}`)
    }
  }


  async getAll (): Promise<T[]> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.get()
    } catch (e) {
      console.error(e)
      throw new Error(`failed to getAll in ${this.collection}`)
    }
  }

  public childOf<C extends IdItem> (id: string, childPath: string) {
    return new Api<C>(`${this.collection}/${id}/${childPath}`)
  }
}
