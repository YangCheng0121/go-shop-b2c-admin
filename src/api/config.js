import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import cookies from 'vue-cookies'
import { BASE_URL } from '@/config/axios.config.js'
import { Message } from 'ant-design-vue'

export const ERR_ERROR = 0
export const ERR_OK = 1
export const UNAUTHORIZED = 401
export const SERVER_ERROR = 500

export const HEADERS = {
  POST: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  PUT: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  FromData: {
    'Content-Type': 'multipart/form-data'
  }
}

function creatAxios() {
  const instance = axios.create({
    baseURL: BASE_URL
  })

  // 允许携带 cookie
  instance.defaults.withCredentials = true

  // Add a request interceptor
  instance.interceptors.request.use(function(config) {
    const { headers, data } = config
    if (headers['Content-Type'] === HEADERS.POST['Content-Type']) {
      // 把一个参数对象格式化为一个字符串
      config.data = qs.stringify(data)
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      config.data = data
    } else {
      headers['Content-Type'] = 'application/json'
    }
    return config
  }, function(error) {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  instance.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.err_code === UNAUTHORIZED) {
      cookies.remove('admin_login')
      router.push('/user/login')
      return response
    }
    if (response.data.err_code === ERR_ERROR) {
      Message.error(response.data.data)
      return response
    }
    return response
  }, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  })

  return instance
}

const Axios = creatAxios()

export default Axios
