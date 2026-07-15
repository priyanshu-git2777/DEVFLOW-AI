import { Link } from 'react-router'

const statusClasses = {
  Planning:
    'border-amber-500/30 bg-amber-500/10 text-amber-300',
  'In Progress':
    'border-blue-500/30 bg-blue-500/10 text-blue-300',
  Completed:
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  'On Hold':
    'border-slate-500/30 bg-slate-500/10 text-slate-300',
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(project.createdAt))

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Project
          </p>

          <Link
            to={`/projects/${project._id}`}
            className="mt-2 block truncate text-xl font-bold text-white transition hover:text-blue-300"
          >
            {project.title}
          </Link>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
            statusClasses[project.status] ||
            statusClasses.Planning
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 leading-7 text-slate-400">
        {project.description ||
          'No project description has been added yet.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologyStack?.length > 0 ? (
          project.technologyStack.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-400"
            >
              {technology}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-600">
            No technologies added
          </span>
        )}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <p className="text-xs text-slate-500">
          Created {formattedDate}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={`/projects/${project._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View
          </Link>

          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard