// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app"
import { Analytics, getAnalytics } from "firebase/analytics"
import { connectFirestoreEmulator, Firestore, getFirestore, initializeFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: setup Auth
// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/firestore/security/overview

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyColDAlhQJz7vJVn0ABmfWTR3WFM9Gh0Fo",
  authDomain: "roleplaying-creatures.firebaseapp.com",
  projectId: "roleplaying-creatures",
  storageBucket: "roleplaying-creatures.appspot.com",
  messagingSenderId: "428643646844",
  appId: "1:428643646844:web:a8a9498502af2bb7abf8f9",
  measurementId: "G-SJ9H02MKD3"
}

class FirebaseClient {
  public readonly app: FirebaseApp
  public readonly analytics: Analytics
  public readonly store: Firestore

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.store = initializeFirestore(this.app, {
      ignoreUndefinedProperties: true
    })
    this.analytics = getAnalytics(this.app)

    if (process.env.NODE_ENV === 'development') {
      connectFirestoreEmulator(this.store, 'localhost', 3000)
    }
  }
}

export const firebaseClient = new FirebaseClient()
