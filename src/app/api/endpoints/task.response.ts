import { z } from 'zod'

export const taskResponse = z.object({
  id: z.number(), // 문제 고유의 아이디
  level: z.number(), // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상)
  type: z.number(), // 1,2 (1: 객관식, 2: 주관식)
  problemImageUrl: z.string(), // 문제 이미지 경로
  title: z.string(), // 문제 제목
  answerRate: z.number(), // 정답률
  isActive: z.boolean().optional(), // 선택 상태
})

export const taskListResponse = z.array(taskResponse)

export type TaskResponse = z.infer<typeof taskResponse>
export type TaskListResponse = z.infer<typeof taskListResponse>
