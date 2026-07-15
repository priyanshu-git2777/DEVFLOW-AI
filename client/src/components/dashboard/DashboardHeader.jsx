function DashboardHeader({
  onOpenSidebar,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Open navigation menu"
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>

        <div>
          <p className="text-sm text-slate-500">
            Developer Workspace
          </p>

          <h1 className="text-lg font-bold text-white sm:text-xl">
            Welcome back, Priyanshu
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-white">
            Priyanshu Jaggi
          </p>

          <p className="text-xs text-slate-500">
            Developer
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white">
          P
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="hidden rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300 md:block"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader