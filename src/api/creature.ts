import { Creature } from '@/types/creatures'
import axios from 'axios'

const CREATURE_URI = 'http://localhost:3000/creature/'

export async function getCreatures (): Promise<Creature[]> {
  try {
    const response = await axios
      .get<Creature[]>(CREATURE_URI)
    return response.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getCreature (id: string): Promise<Creature | undefined> {
  try {
    const response = await axios
      .get<Creature>(`${CREATURE_URI}${id}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export async function createCreature (creature: Creature): Promise<string> {
  try {
    const response = await axios
      .post<{ id: string }>(`${CREATURE_URI}create`, creature)
    return response.data.id
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateCreature (creature: Creature): Promise<void> {
  try {
    await axios.post<{ id: string }>(`${CREATURE_URI}update`, creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
