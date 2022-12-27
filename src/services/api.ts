import axios from 'axios';

const api = axios.create({
  baseURL: 'https://63ab4020fdc006ba605a5018.mockapi.io/api'
})

export default api;