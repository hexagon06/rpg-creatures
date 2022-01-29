export type Shop = {
  id: number
  name: string
  location?: string
  speciality?: string
  proprietor?: string
  description?: string
  image?: string
  link?: string
  favorite: boolean
}

export type ShopFilter = {
  search: string
}
