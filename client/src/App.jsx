import { Route, Routes } from 'react-router'
import Navbar from './components/layout/Navbar'
import AIWorkspacePage from './pages/AIWorkspacePage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ProjectsPage from './pages/ProjectsPage'
import RegisterPage from './pages/RegisterPage'
import SnippetsPage from './pages/SnippetsPage'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/:id"
          element={<ProjectDetailsPage />}
        />
        <Route
          path="/ai-workspace"
          element={<AIWorkspacePage />}
        />
        <Route path="/snippets" element={<SnippetsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App