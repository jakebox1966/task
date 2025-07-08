import { QueryClient } from '@tanstack/react-query'
import type { CommonErrorSchema } from '../app/api/common.types'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

/**
 * Zodios 에러 응답 타입 가드
 */
const isZodiosError = (error: any): error is { response: { data: CommonErrorSchema } } => {
  return error?.response?.data?.code && error?.response?.data?.message
}

/**
 * 공통 에러 처리 함수
 * @param error - 발생한 에러 객체
 * @param context - 에러 컨텍스트 (query/mutation)
 */
const handleCommonError = (error: any, context: 'query' | 'mutation') => {
  console.error(`${context} 에러:`, error)

  // Zodios에서 정의한 에러 응답 처리
  if (isZodiosError(error)) {
    const { code, message, timestamp } = error.response.data
    console.error(`Zodios 에러 [${code}]: ${message}`, { timestamp })

    // 에러 코드별 처리
    switch (code) {
      case 'NOT_FOUND':
        console.error('요청한 리소스를 찾을 수 없습니다.')
        break
      case 'INTERNAL_SERVER_ERROR':
        console.error('서버 내부 오류가 발생했습니다.')
        break
      case 'BAD_REQUEST':
        console.error('잘못된 요청입니다.')
        break
      default:
        console.error(`알 수 없는 에러 코드: ${code}`)
        break
    }
    return
  }

  // 네트워크 에러 처리
  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network Error')) {
    console.error('네트워크 연결 오류가 발생했습니다.')
    return
  }

  // 타임아웃 에러 처리
  if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
    console.error('요청 시간이 초과되었습니다.')
    return
  }

  // 기타 에러 처리
  console.error('알 수 없는 오류가 발생했습니다:', error?.message || error)
}

// 쿼리 전역 에러 처리
queryClient.getQueryCache().subscribe(event => {
  if (event.type === 'updated' && event.query.state.error) {
    handleCommonError(event.query.state.error, 'query')
  }
})

// 뮤테이션 전역 에러 처리
queryClient.getMutationCache().subscribe(event => {
  if (event.type === 'updated' && event.mutation.state.error) {
    handleCommonError(event.mutation.state.error, 'mutation')
  }
})
