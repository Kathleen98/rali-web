import { env } from "@/env";
import axios from "axios";
import { cookies } from "next/headers";


export const raliAPI = axios.create({
  baseURL: env.NEXT_PUBLIC_RALI_API_URL
})

raliAPI.interceptors.request.use( async config => {
  const cookie = await cookies()
  const token = cookie.get('session')

  if(token){
    config.headers.Authorization = `Bearer ${token.value}`
  }

  return config

}, error => {
  return Promise.reject(error)
})