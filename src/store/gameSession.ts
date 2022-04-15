import { sessionApi } from '@/api'
import { getSessionPrepIndex, ListPrep, ListRun, SessionPrep, SessionPrepIndex, SessionRun } from '@/types'
import { deepEqual } from '@firebase/util'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useIndexesStore } from './indexes'
import { useUserStore } from './users'
import { SESSION_RUN_COLLECTION } from '@/api/typed/sessionApi'
import { SessionRunActions } from '@/components/sessions'

export const useSessionStore = defineStore('sessions', {
  state: () => {
    return {
      session: undefined as undefined | SessionPrep,
      sessionForm: undefined as undefined | SessionPrep,
      runs: [] as SessionRun[],
      sessionRun: undefined as undefined | SessionRun,
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
    },
  },
  actions: {
    async createSession (): Promise<string> {
      const user = useUserStore().currentUser
      if (!user) throw new Error('there should be a currentUser')
      const session: SessionPrep = {
        sections: [],
        synopsis: '',
        title: 'New Session',
        userId: user.uid
      }
      const id = await sessionApi.create(session)
      session.id = id
      const sessionIndex: SessionPrepIndex = getSessionPrepIndex(session)
      useIndexesStore().sessions.push(sessionIndex)
      this.session = session
      return id
    },
    async fetch (id: string) {
      this.session = undefined
      // this.filledSession = undefined
      this.sessionForm = undefined
      this.sessionRun = undefined
      this.runs = []

      const session = await sessionApi.get(id)

      if (session) {
        this.session = session

        this.fetchRunsFor(id)
      }
      else throw new Error('session not found')
    },
    async save (session: SessionPrep) {
      try {
        await sessionApi.update(session)
        const index = getSessionPrepIndex(session)
        useIndexesStore().mutateIndex(useIndexesStore().sessions, index)
      } catch (error) {
        console.error('Session update failed: ', error)
        throw error
      }
    },
    async fetchRunsFor (sessionId: string) {
      const runs = await sessionApi
        .childOf<SessionRun>(sessionId, SESSION_RUN_COLLECTION)
        .getAll()
      this.runs = runs
    },
    async createRunFor (sessionId: string): Promise<string> {
      if (this.session?.id !== sessionId) {
        await this.fetch(sessionId)
        if (this.session?.id !== sessionId) throw new Error('invalid session base')
      }
      if (!this.session) throw new Error('invalid session operation')
      const listStates: ListRun[] = (this.session.sections
        .filter(s => s.prepType === 'list' && s.listType === 'check'))
        .map(s => {
          return {
            id: s.id,
            label: s.label,
            sortOrder: s.sortOrder,
            prepType: 'list-run',
            listType: 'check',
            items: s.prepType === 'list' ? s.items : [], // will always be true
            checked: [],
          }
        })

      return await sessionApi
        .childOf<SessionRun>(sessionId, SESSION_RUN_COLLECTION)
        .create({
          ...this.session,
          id: undefined,
          sessionId,
          listStates,
          notes: '',
          startDate: Date.now()
        })
    },
    async fetchRun (sessionId: string, id: string) {
      this.sessionRun = undefined

      const run = await sessionApi.childOf<SessionRun>(sessionId, SESSION_RUN_COLLECTION).get(id)

      if (run) {
        this.sessionRun = run
      }
      else throw new Error('session run not found')
    },
    async saveRun () {
      if (this.sessionRun) {
        const run = cloneDeep(this.sessionRun)
        await sessionApi
          .childOf<SessionRun>(run.sessionId, SESSION_RUN_COLLECTION)
          .update(run)
      }
    },
    async saveEdit () {
      if (this.sessionForm) {
        const session = cloneDeep(this.sessionForm)
        await this.save(session)
        this.session = session
      }
    },
    async startEdit () {
      if (this.session) {
        this.sessionForm = cloneDeep(this.session)
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
