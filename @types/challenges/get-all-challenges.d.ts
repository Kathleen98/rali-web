export interface ChallengesProps {
  challenges: Challenge[]
}

export interface Challenge {
  id: string
  title: string
  description: string
  points: number
  status: string
  requiresPhoto: boolean
  requiresText: boolean
  startDate: string
  endDate: string
  rallyId?: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
}
