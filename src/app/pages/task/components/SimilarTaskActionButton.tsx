import React from 'react'
import type { TaskResponse } from '../../../api/endpoints/task.response'
import { useTasks } from '../../../../hooks/useTasks'
import { useSimilarTasks } from '../../../../hooks/useSimilarTasks'

/**
 * SimilarTaskActionButton 컴포넌트의 Props 타입 정의
 */
type Props = {
  task: TaskResponse // 유사 문제 데이터
}

/**
 * 유사 문항에서 사용되는 액션 버튼 컴포넌트
 *
 * 주요 기능:
 * - 교체 버튼 (선택된 문제를 현재 문제로 교체)
 * - 추가 버튼 (유사 문제를 학습지에 추가)
 * - 클릭 이벤트 전파 방지
 */
const SimilarTaskActionButton = ({ task }: Props) => {
  // 학습지 관련 훅들
  const { addTask } = useTasks() // 학습지에 문제 추가
  const { deleteSimilarTask, replaceSimilarTask } = useSimilarTasks() // 유사 문제 관리

  /**
   * 교체 버튼 클릭 핸들러
   * @param e - 마우스 이벤트
   */
  const handleReplace = (e: React.MouseEvent) => {
    e.stopPropagation() // 카드 클릭 이벤트 전파 방지

    // useSimilarTasks에서 교체 로직 처리
    replaceSimilarTask(task)
  }

  /**
   * 추가 버튼 클릭 핸들러
   * @param e - 마우스 이벤트
   */
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation() // 카드 클릭 이벤트 전파 방지

    // 학습지에 문제 추가 후 유사 문제 목록에서 제거
    addTask(task)
    deleteSimilarTask(task.id)
  }

  return (
    <div className="flex-end flex flex-row gap-2 text-xs">
      {/* 교체 버튼 - 선택된 문제를 현재 문제로 교체 */}
      <div
        className="flex cursor-pointer flex-row items-center gap-1 text-[#707070]"
        onClick={handleReplace}
      >
        <img src={'/icons/change.svg'} alt="교체" className="h-[14px] w-[14px]" />
        <div className="text-[#959595]">교체</div>
      </div>

      {/* 추가 버튼 - 유사 문제를 학습지에 추가 */}
      <div
        className="flex cursor-pointer flex-row items-center gap-1 text-[#707070]"
        onClick={handleAdd}
      >
        <img src={'/icons/add-inactive.svg'} alt="추가" className="h-[14px] w-[14px]" />
        <div className="text-[#959595]">추가</div>
      </div>
    </div>
  )
}

export default SimilarTaskActionButton
