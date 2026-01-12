'use server'

import { AllMembersProps } from "@/@types/members/get-all-members"
import { raliAPI } from "@/lib/axios/rali-api"

export async function getMembersAction(groupId: string)  {
  const { data } = await raliAPI.get<AllMembersProps>(`/members/${groupId}`)
  return data 
}