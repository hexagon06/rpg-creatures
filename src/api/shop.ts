
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

// export async function getShop (id: number): Promise<Shop | undefined> {
//   try {
//     const response = await axios
//       .get<Shop>(`${CREATURE_URI}${id}`)
//     return response.data
//   } catch (e) {
//     console.error(e)
//   }
// }

// export async function createShop (Shop: Shop): Promise<number> {
//   try {
//     const response = await axios
//       .post<{ id: number }>(`${CREATURE_URI}create`, Shop)
//     return response.data.id
//   } catch (e) {
//     console.error(e)
//     throw new Error('failed to create')
//   }
// }

export async function updateShop (Shop: Shop): Promise<void> {
  try {
    await axios.post<{ id: number }>(`${CREATURE_URI}update`, Shop)
  } catch (e) {
    console.error(e)
    throw new Error('failed to create')
  }
}
