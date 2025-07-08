// 문제 난이도 타입
export const TASK_LEVEL = {
  1: '하',
  2: '중하',
  3: '중',
  4: '상',
  5: '최상',
} as const

export type TaskLevel = keyof typeof TASK_LEVEL

// 문제 타입
export const TASK_TYPE = {
  1: '객관식',
  2: '주관식',
} as const

export type TaskType = keyof typeof TASK_TYPE
