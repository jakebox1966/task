import React from 'react'
import type { TaskResponse } from '../../../api/endpoints/task.response'
import { useTasks } from '@/hooks/useTasks'

/**
 * TaskActionButton 컴포넌트의 Props 타입 정의
 */
type Props = {
  task: TaskResponse // 문제 데이터
  isActive: boolean // 활성화 상태 (유사문제 버튼 색상 변경용)
}

/**
 * 학습지 상세 편집에서 사용되는 액션 버튼 컴포넌트
 *
 * 주요 기능:
 * - 유사문제 버튼 (활성화 상태에 따라 아이콘 색상 변경)
 * - 삭제 버튼 (문제를 학습지에서 제거)
 * - 클릭 이벤트 전파 방지
 */
const TaskActionButton = ({ task, isActive }: Props) => {
  // 문제 삭제 훅
  const { deleteTask } = useTasks()

  /**
   * 삭제 버튼 클릭 핸들러
   * @param e - 마우스 이벤트
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation() // 카드 클릭 이벤트 전파 방지
    deleteTask(task.id)
  }

  return (
    <div className="flex-end flex flex-row gap-2 text-xs">
      {/* 유사문제 버튼 - 활성화 상태에 따라 아이콘 색상 변경 */}
      <div className="flex cursor-pointer flex-row items-center gap-1 text-[#707070]">
        {/* 활성화 상태에 따라 다른 아이콘 표시 */}
        <img
          src={isActive ? '/icons/add-active.svg' : '/icons/add-inactive.svg'}
          alt="유사문제"
          className="h-[14px] w-[14px]"
        />
        <div className="whitespace-nowrap text-[#959595]">유사문제</div>
      </div>

      {/* 삭제 버튼 */}
      <div
        className="flex cursor-pointer flex-row items-center gap-1 text-[#707070]"
        onClick={handleDelete}
      >
        <img src={'/icons/delete.svg'} alt="삭제" className="h-[14px] w-[14px]" />
        <div className="whitespace-nowrap text-[#959595]">삭제</div>
      </div>
    </div>
  )
}

export default TaskActionButton
