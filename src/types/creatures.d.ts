export type Creature = {
  id: number
  link?: string
  source?: string
  page?: string
  name: string
  size?: string
  type?: string
  alignment: string[]
  ac?: number
  hp?: number
  hpFormula?: string
  speed?: number
  cr?: number
  organisation: string[]
  environment: string[]
  system?: string
  tags: string[]
  flyingSpeed?: number
  swimSpeed?: number
  climbSpeed?: number
  burrowSpeed?: number
  inspiration: boolean
  comments?: string
  image?: string
}
