import { auth } from '@/api'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import Vue from 'vue'
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module'
import { userStore } from './index'
import { cloneDeep } from 'lodash'

class UserState {
  currentUser?: User
}

class UserGetters extends Getters<UserState> {
  isIsSignedIn (): boolean {
    return this.state.currentUser !== undefined
  }
}

class UserMutations extends Mutations<UserState> {
  setUser (user?: User) {
    if (user) {
      Vue.set(this.state, 'currentUser', cloneDeep(user))
    } else {
      Vue.set(this.state, 'currentUser', user)
    }
  }
}

class UserActions extends Actions<UserState, UserGetters, UserMutations, UserActions> {
  async signOut (): Promise<void> {
    await signOut(auth.auth)
    this.mutations.setUser(undefined)
  }
  async signIn (user: User) {
    this.mutations.setUser(user)
  }
}

export const userModule = new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
})

onAuthStateChanged(auth.auth, (user) => {
  if (user) {
    userStore.actions.signIn(user)
  } else {
    userStore.actions.signOut()
  }
})

export const userMapper = createMapper(userModule)
