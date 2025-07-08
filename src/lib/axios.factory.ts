import axios, { type InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '../constants/environment'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

function convertRequestData(config: InternalAxiosRequestConfig) {
  if (config.data) {
    if (
      config.headers &&
      config.headers['Content-Type'] !== 'multipart/form-data' &&
      config.headers['Content-Type'] !== 'text/plain'
    ) {
      const convertedRequestBodyData: Record<string, unknown> = {}

      for (const dataKey of Object.keys(config.data)) {
        const dataValue = config.data[dataKey]

        if (dataValue instanceof Set) {
          convertedRequestBodyData[dataKey] = Array.from(dataValue)
        } else if (dataValue !== null && typeof dataValue === 'object') {
          for (const dataValueKey of Object.keys(dataValue)) {
            const dataValueValue = dataValue[dataValueKey]

            if (dataValueValue instanceof Set) {
              dataValue[dataValueKey] = Array.from(dataValueValue)
            }
          }
          convertedRequestBodyData[dataKey] = dataValue
        } else {
          convertedRequestBodyData[dataKey] = dataValue
        }
      }
      config.data = convertedRequestBodyData
    }
  }
  return config
}

instance.interceptors.request.use(
  config => {
    config = convertRequestData(config)

    console.log(
      `📦 API 요청: ${config.method?.toUpperCase()} ${config.url}`,
      config.params,
      config.data,
    )

    return config
  },
  error => {
    console.error('요청 에러:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    console.log(
      `📫 API 응답 성공: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data,
    )

    return response
  },
  error => {
    console.error(
      `📫 API 응답 에러: ${error?.config?.method?.toUpperCase()} ${error?.config?.url}`,
      error.response?.status,
      error.response?.data,
    )

    return Promise.reject(error)
  },
)

export default instance
