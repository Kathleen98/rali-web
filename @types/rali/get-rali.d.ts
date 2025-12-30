export interface RaliProps {
  Allrali: GetRali[]
}

export interface GetRali {
  id: string
  name: string
  description: string
  status: string
  startDate: string
  endDate: string
  createdById: string
  createdAt: string
  updatedAt: string
}
