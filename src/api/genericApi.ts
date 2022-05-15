import { IdItem } from '@/types'
import { QueryConstraint } from 'firebase/firestore'
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

  async query (constraint: QueryConstraint): Promise<T[]> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      return await firestore.query(constraint)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to query on ${this.collection}`)
    }
  }

  async create (entity: T): Promise<string> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.add(entity)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to create in ${this.collection}`)
    }
  }

  async update (entity: T): Promise<void> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      await firestore.update(entity)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to update ${entity.id} in ${this.collection}`)
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
