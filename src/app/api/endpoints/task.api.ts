import { internalServerError, notFound } from '../common.types'
import { api } from '../zodios-api-shorthand'
import { taskListResponse } from './task.response'
import { z } from 'zod'

const TASK_PREFIX = '/problems'

export const TASK_PATH_MAP = {
  GET_TASK_LIST: `${TASK_PREFIX}`,
  GET_SIMILAR_TASK_LIST: `${TASK_PREFIX}/:problemId/similarity`,
} as const

export const taskApi = api({
  'GET taskList': {
    path: TASK_PATH_MAP.GET_TASK_LIST,
    response: taskListResponse,
    errors: {
      404: notFound,
      500: internalServerError,
    },
    description: {
      path: 'Get task list',
      response: 'Get task list',
    },
  },
  'GET similarTaskList': {
    path: TASK_PATH_MAP.GET_SIMILAR_TASK_LIST,
    response: taskListResponse,
    params: {
      problemId: z.number(),
    },
    queries: {
      excludedProblemIds: z.string(),
    },
    errors: {
      404: notFound,
      500: internalServerError,
    },
    description: {
      path: 'Get similar task list',
      response: 'Get similar task list',
    },
  },
})
