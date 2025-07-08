import TaskCard from './TaskCard'
import { useTaskStore } from '../../../../stores/useTaskStore'
import type { TaskResponse } from '../../../api/endpoints/task.response'
import TaskActionButton from './TaskActionButton'

/**
 * 학습지 상세 편집 컴포넌트
 *
 * 주요 기능:
 * - 학습지에 추가된 문제들을 카드 형태로 표시
 * - 문제 선택 및 활성화 상태 관리
 * - 난이도별 문제 수 표시
 * - 반응형 디자인 지원 (1024px, 1280px 브레이크포인트)
 */
const Taskcomponent = () => {
  // Zustand store에서 필요한 상태와 액션들을 가져옴
  const tasks = useTaskStore(state => state.tasks) // 현재 학습지에 추가된 문제들
  const setSelectedTaskIndex = useTaskStore(state => state.setSelectedTaskIndex) // 선택된 문제 인덱스 설정
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId) // 선택된 문제 ID 설정
  const activateTask = useTaskStore(state => state.activateTask) // 문제 활성화 (파란색 테두리)
  const getDifficultyCounts = useTaskStore(state => state.getDifficultyCounts) // 난이도별 문제 수 계산

  /**
   * 문제 선택 핸들러
   * @param index - 선택된 문제의 인덱스
   */
  const handleSelectTask = (index: number) => {
    setSelectedTaskIndex(index)
    setSelectedTaskId(tasks[index]?.id)
    activateTask(tasks[index]?.id)
  }

  return (
    <div className="relative flex h-full max-h-[740px] w-full max-w-[480px] min-w-[480px] flex-col rounded-xl bg-[#5C5C5C] lg:max-h-[1022px] lg:max-w-[712px]">
      {/* 고정 헤더 - 제목 표시 */}
      <div className="flex-shrink-0 px-4 py-4">
        <div className="text-base font-bold text-white">학습지 상세 편집</div>
      </div>

      {/* 스크롤 영역 - 문제 카드들이 표시되는 영역 */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* 문제가 없을 때 표시되는 빈 상태 */}
        {tasks.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-sm">
            <div className="text-white">학습지 문제수가 없습니다.</div>
            <div className="text-white">다음단계로 넘어가기 위해 문제를 추가해주세요.</div>
          </div>
        )}

        {/* 문제가 있을 때 카드 목록 표시 */}
        {tasks.length > 0 && (
          <div className="flex flex-col gap-4">
            {tasks.map((task: TaskResponse, index: number) => (
              <TaskCard
                actionButtonArea={<TaskActionButton task={task} isActive={!!task.isActive} />}
                key={index}
                task={task}
                index={index}
                onClick={() => handleSelectTask(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 고정 푸터 - 난이도별 문제 수 및 전체 문제 수 표시 */}
      <div className="flex w-full flex-shrink-0 px-5 py-4">
        <div className={`font-base flex w-full flex-row justify-end font-bold`}>
          {/* 문제가 있을 때만 난이도별 통계 표시 */}
          {tasks.length > 0 && (
            <>
              {/* 난이도별 문제 수 (하, 중하, 중, 상, 최상) */}
              <div className="flex flex-row items-center gap-0.5 text-xs text-[#959595]">
                <p className="text-xs">하{getDifficultyCounts().하}</p>
                <p className="text-xs">·</p>
                <p className="text-xs">중하{getDifficultyCounts().중하}</p>
                <p className="text-xs">·</p>
                <p className="text-xs">중{getDifficultyCounts().중}</p>
                <p className="text-xs">·</p>
                <p className="text-xs">상{getDifficultyCounts().상}</p>
                <p className="text-xs">·</p>
                <p className="text-xs">최상{getDifficultyCounts().최상}</p>
              </div>
              {/* 구분선 */}
              <div className="mx-2 h-5 border-r border-[#959595]"></div>
            </>
          )}
          {/* 전체 문제 수 (문제가 없으면 빨간색, 있으면 흰색) */}
          <div
            className={`flex flex-row items-end whitespace-nowrap ${tasks.length === 0 ? 'text-[#FD5354]' : 'text-white'}`}
          >
            문제 수 {tasks.length}개
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskcomponent
