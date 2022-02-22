import { getAuth, connectAuthEmulator, sendSignInLinkToEmail, signInWithEmailAndPassword, UserCredential, signOut as signAuthOut } from "firebase/auth"

export const auth = getAuth()
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://localhost:9099")
}

export function createByEmail (email: string) {
  sendSignInLinkToEmail(auth, email, {
    url: 'http://localhost:8080/finishSignup',
    handleCodeInApp: true
  })
}

export async function signIn (email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut (): Promise<void> {
  return await signAuthOut(auth)
}
