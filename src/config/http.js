import axios from 'axios'
import AuthService from '@/network/services/auth-service'
import { PUBLIC_URLS } from '@/config/http-public-urls-helper'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

http.interceptors.request.use(config => {
  if (!PUBLIC_URLS.find(url => config.url.includes(url))) {
    const token = AuthService.getToken()

    if (token) {
      config.headers[process.env.REACT_APP_API_TOKEN] = `Bearer ${token}`
    } else {
      const error = new Error('TOKEN_EXPIRED')
      error.config = config
      error.response = {
        status: 401
      }
      throw error
    }
  }

  return config
}, error => {
  return Promise.reject(error)
})


export default http
