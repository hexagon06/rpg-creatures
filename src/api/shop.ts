
import { Shop } from '@/types/shops'
import axios from 'axios'

const CREATURE_URI = 'http://localhost:3000/shop/'

export async function getShops (): Promise<Shop[]> {
  try {
    const response = await axios
      .get<Shop[]>(CREATURE_URI)
    return response.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function updateShop (Shop: Shop): Promise<void> {
  try {
    await axios.post<{ id: number }>(`${CREATURE_URI}update`, Shop)
  } catch (e) {
    console.error(e)
    throw new Error('failed to update')
  }
}
