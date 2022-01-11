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

export async function getCreature (id: number): Promise<Creature | undefined> {
  try {
    const response = await axios
      .get<Creature>(`${CREATURE_URI}${id}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export async function createCreature (creature: Creature): Promise<number> {
  try {
    const response = await axios
      .post<{ id: number }>(`${CREATURE_URI}create`, creature)
    console.log(`post id: ${response.data}`)
    return response.data.id
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateCreature (creature: Creature): Promise<void> {
  try {
    await axios.post<{ id: number }>(`${CREATURE_URI}update`, creature)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}
