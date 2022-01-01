import { Creature } from '@/types/creatures'
import axios from 'axios'

export async function getCreatures (): Promise<Creature[]> {
  try {
    const response = await axios
      .get<Creature[]>('http://localhost:3000/creature')
    return response.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getCreature (id: number): Promise<Creature | undefined> {
  try {
    const response = await axios
      .get<Creature>(`http://localhost:3000/creature/${id}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
