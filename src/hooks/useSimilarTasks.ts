import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/api'
import { useEffect } from 'react'
import { useSimilarTaskStore } from '../stores/useSimilarTaskStore'
import { useTaskStore } from '../stores/useTaskStore'
import type { TaskResponse } from '@/app/api/endpoints/task.response'

export const useSimilarTasks = () => {
  const setTasks = useSimilarTaskStore(state => state.setTasks)
  const setLoading = useSimilarTaskStore(state => state.setLoading)
  const setError = useSimilarTaskStore(state => state.setError)
  const deleteSimilarTask = useSimilarTaskStore(state => state.deleteTask)
  const insertSimilarTask = useSimilarTaskStore(state => state.insertTask)
  const addTask = useTaskStore(state => state.addTask)
  const replaceTask = useTaskStore(state => state.replaceTask)

  // store에서 selectedTaskIndex와 tasks 가져오기
  const selectedTaskIndex = useTaskStore(state => state.selectedTaskIndex)
  const tasks = useTaskStore(state => state.tasks)

  // 제외할 문제 ID들
  const excludedIds = tasks?.map(task => task.id) || []
  const excludedIdsString = excludedIds.length > 0 ? excludedIds.join(',') : ''

  // GET API - 실제 서버 연결
  const { data, isLoading, error } = useQuery({
    queryKey: ['similarTaskList', selectedTaskIndex],
    queryFn: async () => {
      const currentTaskId =
        selectedTaskIndex !== undefined && selectedTaskIndex < tasks.length
          ? tasks[selectedTaskIndex]?.id
          : 0
      return await apiClient.getSimilarTaskList({
        params: { problemId: currentTaskId },
        queries: { excludedProblemIds: excludedIdsString },
      })
    },
    enabled: selectedTaskIndex !== undefined && selectedTaskIndex !== null,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data, setTasks])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    setError(error)
  }, [error, setError])

  // 로컬 상태 조작 함수들
  const handleAddSimilarTask = (similarTask: TaskResponse) => {
    addTask(similarTask)
    deleteSimilarTask(similarTask.id)
  }

  const handleDeleteSimilarTask = (taskId: number) => {
    deleteSimilarTask(taskId)
  }

  const handleReplaceSimilarTask = (similarTask: TaskResponse) => {
    // 교체된 유사문제의 인덱스를 찾기
    const similarTasks = useSimilarTaskStore.getState().tasks
    const similarTaskIndex = similarTasks.findIndex(task => task.id === similarTask.id)

    // 1. 유사문제를 학습지상세편집의 selectedTask와 교체
    const oldTask = replaceTask(similarTask)

    // 2. 기존 selectedTask를 교체된 유사문제의 인덱스 위치에 삽입
    if (oldTask && similarTaskIndex !== -1) {
      insertSimilarTask(oldTask, similarTaskIndex)
    }

    // 3. 교체된 유사문제를 유사문제 목록에서 삭제
    deleteSimilarTask(similarTask.id)
  }

  return {
    data,
    isLoading,
    error,
    addSimilarTask: handleAddSimilarTask,
    deleteSimilarTask: handleDeleteSimilarTask,
    replaceSimilarTask: handleReplaceSimilarTask,
  }
}
