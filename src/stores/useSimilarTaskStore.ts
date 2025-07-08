import { create } from 'zustand'
import type { TaskListResponse, TaskResponse } from '../app/api/endpoints/task.response'

interface SimilarTaskState {
  tasks: TaskListResponse
  isLoading: boolean
  error: Error | null
  setTasks: (tasks: TaskListResponse) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  deleteTask: (taskId: number) => void
  addTask: (task: TaskResponse) => void
  insertTask: (task: TaskResponse, index: number) => void
}

export const useSimilarTaskStore = create<SimilarTaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  setTasks: tasks => set({ tasks }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
  deleteTask: (taskId: number) => {
    const { tasks } = get()
    const newTasks = tasks.filter(task => task.id !== taskId)
    set({ tasks: newTasks })
  },
  addTask: (task: TaskResponse) => {
    const { tasks } = get()
    set({ tasks: [...tasks, task] })
  },
  insertTask: (task: TaskResponse, index: number) => {
    const { tasks } = get()
    const newTasks = [...tasks]
    newTasks.splice(index, 0, task)
    set({ tasks: newTasks })
  },
}))
