export type Shop = {
  id: number
  name: string
  location?: string
  speciality?: string
  proprietor?: string
  description?: string
  image?: string
  link?: string
}

export type ShopFilter = {
  search: string
}
