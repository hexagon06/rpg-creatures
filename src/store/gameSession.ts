import { createSession, getSession, updateSession } from '@/api/sessionApi'
import { getSessionPrepIndex, SessionPrep, SessionPrepIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { indexesStore, userStore } from '.'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('sessions', {
  state: () => {
    return {
      session: undefined as undefined | SessionPrep,
      sessionForm: undefined as undefined | SessionPrep,
      // filledSession: undefined as undefined | FilledSessionPrep,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.sessionForm && this.session) {
        return !deepEqual(this.sessionForm, this.session)
      } else if (!this.sessionForm && !this.session) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createSession (): Promise<string> {
      const user = userStore.state.currentUser
      if (!user) throw new Error('there should be a currentUser')
      const session: SessionPrep = {
        sections: [],
        synopsis: '',
        title: 'Session',
        userId: user.uid
      }
      session.id = await createSession(session)
      const sessionIndex: SessionPrepIndex = getSessionPrepIndex(session)
      await indexesStore.actions.addSession(sessionIndex)
      this.session = session
      return session.id
    },
    async fetch (id: string) {
      this.session = undefined
      // this.filledSession = undefined
      this.sessionForm = undefined

      const session = await getSession(id)

      if (session) {
        this.session = session
      }
      else throw new Error('session not found')
    },
    async save (session: SessionPrep) {
      try {
        await updateSession(session)
        const index = getSessionPrepIndex(session)
        await indexesStore.actions.updateSession(index)
      } catch (error) {
        console.error('Session update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.sessionForm) {
        const session = { ...this.sessionForm }
        await this.save(session)
        this.session = session
      }
    },
    async startEdit () {
      if (this.session) {
        this.sessionForm = { ...this.session }
      } else {
        throw new Error('No session selected')
      }
    },
    async stopEdit () {
      if (this.sessionForm) {
        this.sessionForm = undefined
      }
    }
  }
})
