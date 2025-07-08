import axios from "axios";

const api = axios.create({
  baseURL: 'https://pizzaria-v2-api.vercel.app'
})

export { api }