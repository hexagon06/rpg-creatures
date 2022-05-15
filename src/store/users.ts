import { auth } from '@/api'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useIndexesStore } from './indexes'
import { defineStore } from 'pinia'
import { getUserDataIndex, UserData, UserDataIndex } from '@/types'
import { userDataApi } from '@/api/typed/userDataApi'
import { setInitialDates } from '@/shared/dates'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      currentUser: undefined as undefined | User,
      isAdmin: false,
      userData: undefined as undefined | UserData,
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
    },
    async initializeUserData () {
      const indexes = useIndexesStore()
      if (!indexes.initialized) throw new Error('indexes not initialized')
      if (!this.currentUser) throw new Error('user is not signed in')
      const user = this.currentUser
      let index = indexes.users.find(userIndex => userIndex.userId === user.uid)

      if (index === undefined) {
        const userData: UserData = setInitialDates({
          name: user.displayName ?? '',
          userId: user.uid,
          created: 0,
          lastEdited: 0,
        })
        const userDataId = await userDataApi.create(userData)
        const userDataIndex: UserDataIndex = getUserDataIndex(userDataId, userData)
        indexes.users.push(userDataIndex)
        await indexes.save()
        index = userDataIndex
      }

      const userData = await userDataApi.get(index.id)
      this.userData = userData
    },
    async saveData () {
      if (this.userData) {
        await userDataApi.update(this.userData)
      }
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
