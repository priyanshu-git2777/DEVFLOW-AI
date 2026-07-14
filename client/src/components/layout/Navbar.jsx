import { NavLink } from 'react-router'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Projects', path: '/projects' },
  { label: 'AI Workspace', path: '/ai-workspace' },
  { label: 'Snippets', path: '/snippets' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Profile', path: '/profile' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 px-4 py-4 text-white backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-400"
        >
          DevFlow AI
        </NavLink>

        <div className="flex gap-2 overflow-x-auto pb-1 text-sm lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar