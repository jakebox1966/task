import React from 'react'
import type { TaskResponse } from '../../../api/endpoints/task.response'
import { TASK_LEVEL, TASK_TYPE } from '../types'

/**
 * TaskCard 컴포넌트의 Props 타입 정의
 */
type Props = {
  task: TaskResponse // 문제 데이터
  index: number // 문제 인덱스 (번호 표시용)
  onClick?: (index: number) => void // 클릭 이벤트 핸들러 (선택적)
  actionButtonArea?: React.ReactNode // 액션 버튼 영역 (추가/교체/삭제 등)
}

/**
 * 문제 카드 컴포넌트
 *
 * 주요 기능:
 * - 문제 정보를 카드 형태로 표시
 * - 선택 상태에 따른 파란색 테두리 표시
 * - 문제 번호, 제목, 난이도, 정답률, 유형, 이미지 표시
 * - 클릭 이벤트 처리
 *
 */
const TaskCard = React.memo(({ task, index, onClick, actionButtonArea }: Props) => {
  return (
    <div className="flex flex-col" onClick={() => onClick?.(index)}>
      {/* 카드 컨테이너 - 선택 상태에 따라 파란색 테두리 표시 */}
      <div
        className={`w-full overflow-hidden rounded-xl bg-white ${
          task.isActive === true ? 'border-3 border-[#00ABFF]' : ''
        }`}
      >
        {/* 카드 헤더 - 문제 번호, 제목, 액션 버튼 */}
        <div className="flex h-[44px] w-full items-center justify-between rounded-t-xl bg-[#FAFAFA] px-4">
          {/* 문제 번호 (1부터 시작) */}
          <div className="min-w-[48px] text-center font-[#707070] text-lg font-bold">
            {index + 1}
          </div>

          {/* 문제 제목 - 길이가 길면 말줄임표로 처리 */}
          <div className="w-full max-w-[238px] overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            {task.title}
          </div>

          {/* 액션 버튼 영역 (추가/교체/삭제 등) */}
          {actionButtonArea}
        </div>

        {/* 카드 본문 - 배지와 이미지를 가로로 배치 */}
        <div className="flex flex-row gap-4 px-4 py-4">
          {/* 배지 그룹 - 난이도, 정답률, 유형을 세로로 배치 */}
          <div className="flex min-w-[48px] flex-col items-center gap-1 text-xs">
            {/* 난이도 배지 - 난이도에 따른 색상 적용 */}
            <label
              className="w-full rounded-sm bg-[#F5F5F5] px-1 py-1 text-center"
              style={{ color: TASK_LEVEL[task.level as keyof typeof TASK_LEVEL].color }}
            >
              {TASK_LEVEL[task.level as keyof typeof TASK_LEVEL].label}
            </label>
            {/* 정답률 배지 */}
            <label className="w-full rounded-sm bg-[#F5F5F5] px-1 py-1 text-center text-[#333333]">
              {task.answerRate}%
            </label>
            {/* 문제 유형 배지 (객관식/주관식) */}
            <label className="w-full rounded-sm bg-[#F5F5F5] px-1 py-1 text-center text-[#333333]">
              {TASK_TYPE[task.type as keyof typeof TASK_TYPE]}
            </label>
          </div>

          {/* 문제 이미지 - 오른쪽에 배치 */}
          <div>
            <img src={task.problemImageUrl} alt="problem" />
          </div>
        </div>
      </div>
    </div>
  )
})

TaskCard.displayName = 'TaskCard'

export default TaskCard
