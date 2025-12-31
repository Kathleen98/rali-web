export interface AllGroupsProps {
  allGroups: AllGroup[]
}

export interface AllGroup {
  id?: string
  name: string
  description?: string
  color: string
  points: number
  rallyId?: string
  coordinatorId?: string
  createdAt?: string
  updatedAt?: string
  image: string
}
