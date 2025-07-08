// 문제 난이도 타입 + 색상코드
export const TASK_LEVEL = {
  1: { label: '하', color: '#5C5C5C' },
  2: { label: '중하', color: '#00ABFF' },
  3: { label: '중', color: '#54C0B1' },
  4: { label: '상', color: '#FD5354' },
  5: { label: '최상', color: '#FD5354' },
} as const

export type TaskLevel = keyof typeof TASK_LEVEL

// 문제 타입
export const TASK_TYPE = {
  1: '객관식',
  2: '주관식',
} as const

export type TaskType = keyof typeof TASK_TYPE
