import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import Sidebar from '../components/layout/Sidebar'

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function handleLogout() {
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="min-w-0 flex-1">
        <DashboardHeader
          onOpenSidebar={openSidebar}
          onLogout={handleLogout}
        />

        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout