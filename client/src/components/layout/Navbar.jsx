function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-xl font-bold text-blue-400">
          DevFlow AI
        </p>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>Home</span>
          <span>Login</span>
          <span>Register</span>
        </div>
      </nav>
    </header>
  )
}

export default Navbar