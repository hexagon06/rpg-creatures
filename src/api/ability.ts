import { Ability } from '@/types/abilities'
import axios from 'axios'

const CREATURE_URI = 'http://localhost:3000/ability/'

export async function getAbilities (): Promise<Ability[]> {
  try {
    const response = await axios
      .get<Ability[]>(CREATURE_URI)
    return response.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getAbility (id: number): Promise<Ability | undefined> {
  try {
    const response = await axios
      .get<Ability>(`${CREATURE_URI}${id}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export async function createAbility (ability: Ability): Promise<number> {
  try {
    const response = await axios
      .post<{ id: number }>(`${CREATURE_URI}create`, ability)
    return response.data.id
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}

export async function updateAbility (ability: Ability): Promise<void> {
  try {
    await axios.post<{ id: number }>(`${CREATURE_URI}update`, ability)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}
