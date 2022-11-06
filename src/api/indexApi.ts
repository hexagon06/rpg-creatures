import { IdItem } from '@/types'
import { onSnapshot, query, QueryConstraint, Unsubscribe } from 'firebase/firestore'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'

export type Change<T> = (id: string, data: T) => void
export interface ApiIndex<T extends IdItem> {
  subscribe(add: Change<T>, change: Change<T>, removed: Change<T>): void
  unsubscribe(): void
}

export class IndexApi<T extends IdItem> implements ApiIndex<T> {
  private unsub?: Unsubscribe

  constructor(private collection: string) {
  }

  subscribe(added: Change<T>, changed: Change<T>, removed: Change<T>): void {
    if (this.unsub) {
      throw new Error(`there was another subscription on ${this.collection}`)
    }
    const firestore = new FirestoreAcces<T>(firebaseClient.store, this.collection)
    const q = query(firestore.ref())
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New T: ", change.doc.data());
          added(change.doc.id, change.doc.data() as T)
        }
        if (change.type === "modified") {
          changed(change.doc.id, change.doc.data() as T)
        }
        if (change.type === "removed") {
          console.log("Removed T: ", change.doc.data());
          removed(change.doc.id, change.doc.data() as T)
        }
      });
    });
  }
  unsubscribe(): void {
    if (this.unsub) {
      this.unsub()
      this.unsub = undefined
    }
  }
}
