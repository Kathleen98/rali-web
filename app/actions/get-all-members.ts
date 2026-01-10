'use server'

import { raliAPI } from "@/lib/axios/rali-api"

export async function getMembersAction(groupId: string) {
  const { data } = await raliAPI.get(`/members/${groupId}`)
  return data
}