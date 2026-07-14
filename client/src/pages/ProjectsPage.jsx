import { Link } from 'react-router'

function ProjectsPage() {
  return (
    <section className="min-h-screen bg-slate-950 p-6 text-white sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Projects</h1>

        <p className="mt-3 text-slate-400">
          Your development projects will appear here.
        </p>

        <div className="mt-8 max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-blue-400">
            Temporary test project
          </p>

          <h2 className="mt-2 text-xl font-bold">
            DevFlow AI
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            This project card is only being used to test the dynamic
            project-details route.
          </p>

          <Link
            to="/projects/devflow-ai-demo"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
          >
            View Project
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage