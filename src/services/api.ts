import axios from 'axios';

const api = axios.create({
  baseURL: 'https://63ac72a334c46cd7ae823568.mockapi.io/api'
})

export default api;