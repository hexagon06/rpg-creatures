import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, UserCredential, signOut as signAuthOut, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"

export const auth = getAuth()
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://localhost:9099")
}

export async function signIn (email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut (): Promise<void> {
  return await signAuthOut(auth)
}
