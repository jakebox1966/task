import React from 'react'
import SimilarTaskComponents from '../components/SimilarTaskComponent'
import TaskComponent from '../components/TaskComponent'
import { useTasks } from '@/hooks/useTasks'
import { useSimilarTasks } from '@/hooks/useSimilarTasks'
import { useTaskStore } from '@/stores/useTaskStore'

/**
 * 학습지 상세 편집 페이지의 메인 컨테이너 컴포넌트
 *
 * 주요 기능:
 * - 학습지 상세 편집과 유사 문항 컴포넌트를 가로로 배치
 * - 데이터 페칭 및 상태 관리 훅들을 초기화
 * - 로딩 및 에러 상태 처리
 * - 반응형 레이아웃 제공
 */
const TaskOneContainer = () => {
  // React Query로 데이터 페치 + store에 저장
  useTasks()

  // 유사 문제 자동 페치 (selectedTask 변경 시 자동 실행)
  useSimilarTasks()

  // store에서 상태 가져오기
  const isLoading = useTaskStore(state => state.isLoading) // 로딩 상태
  const error = useTaskStore(state => state.error) // 에러 상태

  // 로딩 중일 때 표시
  if (isLoading) return <div>로딩 중...</div>

  // 에러 발생 시 표시
  if (error) return <div>에러: {error.message}</div>

  return (
    <div className="flex h-full w-full flex-row justify-center gap-4 gap-5">
      {/* 유사 문항 컴포넌트 */}
      <SimilarTaskComponents />

      {/* 학습지 상세 편집 컴포넌트 */}
      <TaskComponent />
    </div>
  )
}

export default TaskOneContainer
