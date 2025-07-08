import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/api'
import { useTaskStore } from '@/stores/useTaskStore'
import { useSimilarTaskStore } from '@/stores/useSimilarTaskStore'
import { useEffect } from 'react'
import type { TaskResponse } from '@/app/api/endpoints/task.response'

export const useTasks = () => {
  const setTasks = useTaskStore(state => state.setTasks)
  const setLoading = useTaskStore(state => state.setLoading)
  const setError = useTaskStore(state => state.setError)
  const addTask = useTaskStore(state => state.addTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const replaceTask = useTaskStore(state => state.replaceTask)
  const selectedTaskId = useTaskStore(state => state.selectedTaskId)
  const setSimilarTasks = useSimilarTaskStore(state => state.setTasks)

  // GET API - 실제 서버 연결
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['taskList'],
    queryFn: async () => await apiClient.getTaskList(),
  })

  useEffect(() => {
    // 초기 로딩 시에만 API 데이터로 설정
    if (data && !useTaskStore.getState().tasks.length) {
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
  const handleAddTask = (task: TaskResponse) => {
    addTask(task)
  }

  const handleDeleteTask = (taskId: number) => {
    // task 삭제
    deleteTask(taskId)

    // 삭제된 task가 selectedTask였다면 유사문제 목록도 비우기
    if (selectedTaskId === taskId) {
      setSimilarTasks([])
    }
  }

  const handleReplaceTask = (newTask: TaskResponse) => {
    const oldTask = replaceTask(newTask)
    return oldTask
  }

  return {
    data,
    isLoading,
    error,
    refetch,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    replaceTask: handleReplaceTask,
  }
}
