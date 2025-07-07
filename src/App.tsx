import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TaskOnePage from './pages/task-one/TaskOnePage'
import TaskTwoPage from './pages/task-two/TaskTwoPage'
import Layout from './components/layouts/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/task-1" replace />} />
          <Route path="task-1" element={<TaskOnePage />} />
          <Route path="task-2" element={<TaskTwoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
