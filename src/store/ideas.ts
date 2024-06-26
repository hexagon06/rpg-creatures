import { ideaApi } from '@/api/typed/ideaApi'
import { setEditedDate, setInitialDates } from '@/shared/dates'
import { Idea, IdeaIndex, FilledIdea, getIdeaIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { useIndexesStore } from './indexes'
import { useUserStore } from './users'

export const useIdeaStore = defineStore('ideas', {
  state: () => {
    return {
      idea: undefined as undefined | Idea,
      ideaForm: undefined as undefined | Idea,
      filledIdea: undefined as undefined | FilledIdea,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.ideaForm && this.idea) {
        return !deepEqual(this.ideaForm, this.idea)
      } else if (!this.ideaForm && !this.idea) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createIdea (): Promise<string> {
      const currentUser = useUserStore().currentUser
      if (!currentUser) throw new Error('no currentUser')
      const userId = currentUser.uid
      const idea: Idea = setInitialDates({
        synopsis: '',
        tags: [],
        text: '',
        title: '',
        userId,
        created: 0,
        lastEdited: 0,
      })
      const id = await ideaApi.create(idea)
      const ideaIndex: IdeaIndex = getIdeaIndex(id, idea)
      useIndexesStore().ideas.push(ideaIndex)
      this.idea = idea
      return id
    },
    async fetch (id: string) {
      this.idea = undefined
      this.filledIdea = undefined
      this.ideaForm = undefined

      const idea = await ideaApi.get(id)

      if (idea) {
        this.idea = idea
      }
      else throw new Error('idea not found')
    },
    async save (idea: Idea) {
      try {
        const dated = setEditedDate(idea)
        await ideaApi.update(dated)
        const index = getIdeaIndex(dated.id!, dated)
        useIndexesStore().mutateIndex(useIndexesStore().ideas, index)
      } catch (error) {
        console.error('Idea update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.ideaForm) {
        const idea = { ...this.ideaForm }
        await this.save(idea)
        this.idea = idea
      }
    },
    async startEdit () {
      if (this.idea) {
        this.ideaForm = cloneDeep(this.idea)
      } else {
        throw new Error('No idea selected')
      }
    },
    async stopEdit () {
      if (this.ideaForm) {
        this.ideaForm = undefined
      }
    }
  }
})
