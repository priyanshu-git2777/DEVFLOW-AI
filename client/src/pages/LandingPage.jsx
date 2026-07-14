import { Link } from 'react-router'
function LandingPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),_transparent_45%)]" />

      <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />

      <section className="relative z-10 w-full max-w-4xl rounded-3xl border border-slate-700/70 bg-slate-900/80 px-6 py-14 text-center shadow-2xl shadow-blue-950/40 backdrop-blur md:px-12 md:py-20">
        <p className="mx-auto mb-6 w-fit rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-blue-300">
          AI-Powered Developer Workspace
        </p>

        <h1 className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          DevFlow AI
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-slate-200 sm:text-3xl">
          Your Intelligent Developer Workspace
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Organize projects, manage development tasks, save useful code
          snippets, and access intelligent AI development tools from one
          professional workspace.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
  <Link
    to="/register"
    className="w-full rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/40 sm:w-auto"
  >
    Start DevFlow AI
  </Link>

  <Link
    to="/projects"
    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-7 py-3.5 font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-500/30 sm:w-auto"
  >
    Explore Features
  </Link>
</div>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
            <p className="text-sm font-semibold text-blue-300">
              AI Assistance
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Explain, improve, debug, and generate code using AI.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
            <p className="text-sm font-semibold text-cyan-300">
              Project Management
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Keep coding projects, tasks, and progress organized.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
            <p className="text-sm font-semibold text-violet-300">
              Developer Tools
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Store snippets and generate README and commit messages.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default LandingPage