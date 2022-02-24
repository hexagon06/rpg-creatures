import { getAuth, connectAuthEmulator, sendSignInLinkToEmail, signInWithEmailAndPassword, UserCredential, signOut as signAuthOut, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"

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

// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   url: 'http://localhost:8080/#/users/finishSignup',
//   // This must be true.
//   handleCodeInApp: true,
// }

// export async function createByEmail (email: string) {
//   console.log(' sending link ')

//   await sendSignInLinkToEmail(auth, email, actionCodeSettings)
//   console.log(' link sent ')

//   window.localStorage.setItem('emailForSignIn', email)
// }

// export async function finishSignup () {
//   if (isSignInWithEmailLink(auth, window.location.href)) {
//     // Additional state parameters can also be passed via URL.
//     // This can be used to continue the user's intended action before triggering
//     // the sign-in operation.
//     // Get the email if available. This should be available if the user completes
//     // the flow on the same device where they started it.
//     let email = window.localStorage.getItem('emailForSignIn')
//     while (!email) {
//       // User opened the link on a different device. To prevent session fixation
//       // attacks, ask the user to provide the associated email again. For example:
//       email = window.prompt('Please provide your email for confirmation')
//     }
//     // The client SDK will parse the code from the link for you.
//     signInWithEmailLink(auth, email, window.location.href)
//       .then((result) => {
//         console.log('success')

//         // Clear email from storage.
//         window.localStorage.removeItem('emailForSignIn')
//         // You can access the new user via result.user
//         // Additional user info profile not available via:
//         // result.additionalUserInfo.profile == null
//         // You can check if the user is new or existing:
//         // result.additionalUserInfo.isNewUser
//       })
//       .catch((error) => {
//         console.error(error)

//         // Some error occurred, you can inspect the code: error.code
//         // Common errors could be invalid email and invalid or expired OTPs.
//       })
//   }
// }
