function Sidebar() {
  const navigationItems = [
    'Dashboard',
    'Projects',
    'AI Workspace',
    'Snippets',
    'Tasks',
    'Profile',
  ]

  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-950 p-6 text-white">
      <h2 className="text-xl font-bold text-blue-400">
        DevFlow AI
      </h2>

      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => (
          <div
            key={item}
            className="rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar