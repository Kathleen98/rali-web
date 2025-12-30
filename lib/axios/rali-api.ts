import axios from "axios";


export const raliAPI = axios.create({
  baseURL: 'http://localhost:3333'
})