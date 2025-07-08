import React from 'react'
import { useSimilarTaskStore } from '../../../../stores/useSimilarTaskStore'
import TaskCard from './TaskCard'
import type { TaskResponse } from '../../../api/endpoints/task.response'
import SimilarTaskActionButton from './SimilarTaskActionButton'

/**
 * 유사 문항 컴포넌트
 *
 * 주요 기능:
 * - 선택된 문제와 유사한 문제들을 카드 형태로 표시
 * - 유사 문제 추가/교체 기능 제공
 * - 빈 상태일 때 안내 메시지 표시
 * - 반응형 디자인 지원 (1024px, 1280px 브레이크포인트)
 */
const SimilarTaskComponents = () => {
  // Zustand store에서 유사 문제 목록을 가져옴
  const tasks = useSimilarTaskStore(state => state.tasks)

  return (
    <div className="relative flex h-full max-h-[740px] w-full max-w-[480px] min-w-[480px] flex-col rounded-xl bg-[#E8E8E8] lg:max-h-[1022px] lg:max-w-[504px]">
      {/* 유사 문제가 없을 때 표시되는 안내 메시지 */}
      {tasks.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-sm">
          <div className="flex flex-row items-center gap-2">
            {/* 유사문제 버튼 아이콘과 텍스트 */}
            <div className="flex cursor-pointer flex-row items-center gap-1 bg-white p-2 text-[9px] text-[#707070]">
              <img src={'/icons/add-inactive.svg'} alt="유사문제" className="h-[8.3px] w-[8.3px]" />
              <div className="text-[#959595]">유사문제</div>
            </div>
            버튼을 누르면
          </div>
          <div className="">문제를 추가 또는 교체할수 있습니다.</div>
        </div>
      )}

      {/* 유사 문제가 있을 때 카드 목록 표시 */}
      {tasks.length > 0 && (
        <>
          {/* 고정 헤더 - 제목 표시 */}
          <div className="flex-shrink-0 px-4 py-4">
            <div className="text-base font-bold">유사 문항</div>
          </div>

          {/* 스크롤 영역 - 유사 문제 카드들이 표시되는 영역 */}
          <div className="flex-1 overflow-y-auto px-4">
            {tasks.length > 0 && (
              <div className="flex flex-col gap-4">
                {tasks.map((task: TaskResponse, index: number) => (
                  <TaskCard
                    actionButtonArea={<SimilarTaskActionButton task={task} />}
                    key={index}
                    task={task}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 고정 푸터 - 여백용 */}
          <div className="flex-shrink-0 px-4 py-4"></div>
        </>
      )}
    </div>
  )
}

export default SimilarTaskComponents
