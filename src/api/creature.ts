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

export async function createCreature (creature: Creature): Promise<void> {
  try {
    const response = await axios
      .post(CREATURE_URI, creature)
  } catch (e) {
    console.error(e)
  }
}
