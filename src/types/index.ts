export * from './abilities'
export * from './creatures'
export * from './encounter'
export * from './shops'
export * from './tags'
export * from './indexes'

export type IdItem = { id?: string }

export type Reference = { id: string }

export type ReferenceCount = Reference & { count: number }
