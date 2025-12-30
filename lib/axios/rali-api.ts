import { env } from "@/env";
import axios from "axios";


export const raliAPI = axios.create({
  baseURL: env.NEXT_PUBLIC_RALI_API_URL
})