import axiosInstance from '@/lib/axios.factory'
import { makeApi, Zodios } from '@zodios/core'
import { taskApi } from './endpoints/task.api'

export const freeWheelinApi = makeApi([...taskApi])

export const apiClient = new Zodios(freeWheelinApi, {
  axiosInstance,
  validate: false,
})

export * from './common.types'
export * from './endpoints/task.api'
