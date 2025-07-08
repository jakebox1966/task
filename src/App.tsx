import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TaskPage from '@/app/pages/task/TaskPage'
import Layout from '@/components/layouts/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/task-1" replace />} />
          <Route path="task-1" element={<TaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
