import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, UserCredential, signOut as signAuthOut, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"
import * as firebaseui from "firebaseui"

export const auth = getAuth()
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://localhost:9099")
}

const ui = new firebaseui.auth.AuthUI(auth)
export function signIn (): void {
  ui.start('#firebaseui-auth-container', {
    signInFlow: 'popup',
    signInOptions: [
      // List of OAuth providers supported.
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
    // Other config options...
  })
}

export async function signOut (): Promise<void> {
  return await signAuthOut(auth)
}
