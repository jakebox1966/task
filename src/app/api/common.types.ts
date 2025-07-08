import { z } from 'zod'

export const commonErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  timestamp: z.coerce.date(),
})

// 400
export const badrequest = z.object({}).merge(commonErrorSchema)

// 404
export const notFound = z.object({}).merge(commonErrorSchema)

// 500
export const internalServerError = z.object({}).merge(commonErrorSchema)

export type Badrequest = z.infer<typeof badrequest>
export type NotFoundType = z.infer<typeof notFound>
export type InternalServerErrorType = z.infer<typeof internalServerError>
export type CommonErrorSchema = z.infer<typeof commonErrorSchema>
