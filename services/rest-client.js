import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.timeout = 12000

const getHttpHeaders = (isAuthenticated = false) => {
  // Add your custom logic here, for example add a Token to the Headers
  if (isAuthenticated) {
    return {
      headers: {
        Authorization: 'Bearer YOUR_TOKEN',
      },
    }
  }

  return {}
}

export const get = (path) => axios.get(path, getHttpHeaders())

export const del = (path) => axios.delete(path, getHttpHeaders())

export const post = (path, data) => axios.post(path, data, getHttpHeaders())

export const put = (path, data) => axios.post(path, data, getHttpHeaders())

export const patch = (path, data) => axios.post(path, data, getHttpHeaders())
