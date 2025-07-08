import { create } from 'zustand'
import type { TaskListResponse, TaskResponse } from '../app/api/endpoints/task.response'

interface TaskState {
  tasks: TaskListResponse
  selectedTaskIndex: number | undefined
  selectedTaskId: number | undefined
  isLoading: boolean
  error: Error | null
  setTasks: (tasks: TaskListResponse) => void
  setSelectedTaskIndex: (index: number | undefined) => void
  setSelectedTaskId: (id: number | undefined) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  addTask: (task: TaskResponse) => void
  deleteTask: (taskId: number) => void
  replaceTask: (newTask: TaskResponse) => TaskResponse | undefined
  activateTask: (taskId: number) => void
  getDifficultyCounts: () => { 하: number; 중하: number; 중: number; 상: number; 최상: number }
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  selectedTaskIndex: undefined,
  selectedTaskId: undefined,
  isLoading: false,
  error: null,
  setTasks: tasks => {
    const tasksWithActiveState = tasks.map(task => ({
      ...task,
      isActive: false,
    }))
    set({ tasks: tasksWithActiveState })
  },
  setSelectedTaskIndex: index => set({ selectedTaskIndex: index }),
  setSelectedTaskId: id => set({ selectedTaskId: id }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
  addTask: (task: TaskResponse) => {
    const { tasks, selectedTaskIndex } = get()

    if (selectedTaskIndex === undefined) {
      set({ tasks: [...tasks, task] })
      return
    }

    // selectedTaskIndex가 유효한지 확인
    if (selectedTaskIndex < 0 || selectedTaskIndex >= tasks.length) {
      set({ tasks: [...tasks, task] })
      return
    }

    const newTasks = [...tasks]
    newTasks.splice(selectedTaskIndex + 1, 0, task)
    set({ tasks: newTasks })
  },
  deleteTask: (taskId: number) => {
    const { tasks, selectedTaskIndex } = get()
    const newTasks = tasks.filter(task => task.id !== taskId)

    // 삭제된 task가 선택된 task였다면 선택 해제
    let newSelectedTaskIndex = selectedTaskIndex
    if (
      selectedTaskIndex !== undefined &&
      selectedTaskIndex < tasks.length &&
      tasks[selectedTaskIndex].id === taskId
    ) {
      newSelectedTaskIndex = undefined
    }

    set({
      tasks: newTasks,
      selectedTaskIndex: newSelectedTaskIndex,
    })
  },
  replaceTask: (newTask: TaskResponse): TaskResponse | undefined => {
    const { tasks, selectedTaskIndex } = get()

    if (selectedTaskIndex === undefined) {
      console.error('유효하지 않아요: selectedTaskIndex가 undefined입니다.')
      // selectedTaskIndex가 없으면 교체할 수 없으므로 맨 뒤에 추가
      const newTaskWithActive = { ...newTask, isActive: true }
      const newTasksWithActive = tasks.map(task => ({ ...task, isActive: false }))
      set({ tasks: [...newTasksWithActive, newTaskWithActive] })
      return undefined
    }

    // selectedTaskIndex가 유효한지 확인
    if (selectedTaskIndex < 0 || selectedTaskIndex >= tasks.length) {
      console.error('유효하지 않아요: selectedTaskIndex가 범위를 벗어났습니다.', {
        selectedTaskIndex,
        tasksLength: tasks.length,
      })
      // selectedTaskIndex가 유효하지 않으면 맨 뒤에 추가
      const newTaskWithActive = { ...newTask, isActive: true }
      const newTasksWithActive = tasks.map(task => ({ ...task, isActive: false }))
      set({ tasks: [...newTasksWithActive, newTaskWithActive] })
      return undefined
    }

    // 기존 selectedTask를 저장 (isActive 제거)
    const oldTask = tasks[selectedTaskIndex]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isActive, ...oldTaskWithoutActive } = oldTask

    // 새로운 태스크로 교체하고 isActive 상태 업데이트
    const newTasks = tasks.map((task, index) => ({
      ...task,
      isActive: index === selectedTaskIndex,
    }))
    newTasks[selectedTaskIndex] = { ...newTask, isActive: true }

    set({ tasks: newTasks })

    // 기존 태스크를 유사문제 store에 추가하기 위해 반환 (isActive 없이)
    return oldTaskWithoutActive
  },
  activateTask: (taskId: number) => {
    const { tasks } = get()
    const newTasks = tasks.map(task => ({
      ...task,
      isActive: task.id === taskId,
    }))
    set({ tasks: newTasks })
  },
  getDifficultyCounts: () => {
    const { tasks } = get()
    const counts = {
      하: 0,
      중하: 0,
      중: 0,
      상: 0,
      최상: 0,
    }

    tasks.forEach(task => {
      switch (task.level) {
        case 1:
          counts.하++
          break
        case 2:
          counts.중하++
          break
        case 3:
          counts.중++
          break
        case 4:
          counts.상++
          break
        case 5:
          counts.최상++
          break
      }
    })

    return counts
  },
}))
