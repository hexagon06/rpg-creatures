import { auth } from '@/api'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useIndexesStore } from './indexes'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      currentUser: undefined as undefined | User,
      isAdmin: false,
    }
  },
  getters: {
    isIsSignedIn (): boolean {
      return this.currentUser !== undefined
    }
  },
  actions: {
    async signOut (): Promise<void> {
      await signOut(auth.auth)
      this.currentUser = undefined
    },
    async signIn (user: User) {
      this.currentUser = user
      await useIndexesStore().initialize(user.uid)
    }
  }
})

onAuthStateChanged(auth.auth, async (user) => {
  if (user) {
    await useUserStore().signIn(user)
  } else {
    await useUserStore().signOut()
  }
})
