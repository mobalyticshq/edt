export interface StaticDataType {
  slug: string
  name: string
}

export interface StaticDataContainer {
  type: string
  version: string
  descriptions: StaticDataType[]
}