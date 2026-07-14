import { Link, useParams } from 'react-router'

function ProjectDetailsPage() {
  const { id } = useParams()

  return (
    <section className="min-h-screen bg-slate-950 p-6 text-white sm:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/projects"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Projects
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Project Details
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Selected Project
          </h1>

          <p className="mt-4 text-slate-400">
            Detailed project information will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="text-sm text-slate-500">
              Project ID from the URL
            </p>

            <p className="mt-2 break-all font-mono text-blue-300">
              {id}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetailsPage