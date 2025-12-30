export interface AllFlashMissionProps {
  allFlashMissions: AllFlashMission[]
}

export interface AllFlashMission {
  id: string
  title: string
  description: string
  points: number
  status: string
  requiresPhoto: boolean
  requiresText: boolean
  deadline: string
  rallyId: string
  createdById: string
  createdAt: string
  updatedAt: string
}
