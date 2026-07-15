import { NavLink } from 'react-router'

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '⌂',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: '▣',
  },
  {
    label: 'AI Workspace',
    path: '/ai-workspace',
    icon: '✦',
  },
  {
    label: 'Snippets',
    path: '/snippets',
    icon: '</>',
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: '✓',
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: '●',
  },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white">
              D
            </span>

            <span className="text-xl font-bold text-white">
              DevFlow
              <span className="text-blue-400"> AI</span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs"
                aria-hidden="true"
              >
                {item.icon}
              </span>

              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-5">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-sm font-semibold text-blue-300">
              DevFlow AI
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Organize your projects and build faster with intelligent
              developer tools.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar