import { IdItem } from '@/types'
import { QueryConstraint } from 'firebase/firestore'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

export interface IdItemApi<T extends IdItem> extends ApiGet<T>, ApiCreate<T>, ApiDelete {
  query(constraint: QueryConstraint): Promise<T[]>
  update(creature: T): Promise<void>
  getAll(): Promise<T[]>
}

export interface ApiGet<T extends IdItem> {
  get(id: string): Promise<T | undefined>
}

export interface ApiCreate<T extends IdItem> {
  create(creature: T): Promise<string>
}

export interface ApiList<T extends IdItem> {
  list(): Promise<T[]>
}

export interface ApiDelete {
  delete(item: string): Promise<void>
}

export class Api<T extends IdItem> implements IdItemApi<T>, ApiList<T>, ApiDelete {

  constructor(private collection: string) {
  }

  async get(id: string): Promise<T | undefined> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.getById(id)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to get ${id} in ${this.collection}`)
    }
  }

  async query(constraint: QueryConstraint): Promise<T[]> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      return await firestore.query(constraint)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to query on ${this.collection}`)
    }
  }

  async create(creature: T): Promise<string> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.add(creature)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to create in ${this.collection}`)
    }
  }

  async update(creature: T): Promise<void> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      await firestore.update(creature)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to update ${creature.id} in ${this.collection}`)
    }
  }

  async delete(creatureId: string): Promise<void> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
      await firestore.delete(creatureId)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to delete ${creatureId} in ${this.collection}`)
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)

      return await firestore.get()
    } catch (e) {
      console.error(e)
      throw new Error(`failed to getAll in ${this.collection}`)
    }
  }

  async list(): Promise<T[]> {
    return this.getAll();
  }

  public childOf<C extends IdItem>(id: string, childPath: string) {
    return new Api<C>(`${this.collection}/${id}/${childPath}`)
  }
}
