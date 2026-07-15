import { Link } from 'react-router'

const sampleProjects = [
  {
    id: 'devflow-ai',
    title: 'DevFlow AI',
    status: 'In Progress',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    status: 'Planning',
    technologies: ['React', 'Tailwind CSS'],
  },
  {
    id: 'task-manager',
    title: 'Smart Task Manager',
    status: 'Completed',
    technologies: ['JavaScript', 'Express'],
  },
]

const statusClasses = {
  'In Progress':
    'border-blue-500/20 bg-blue-500/10 text-blue-300',
  Planning:
    'border-amber-500/20 bg-amber-500/10 text-amber-300',
  Completed:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
}

function RecentProjects() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-white">
            Recent Projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest development work
          </p>
        </div>

        <Link
          to="/projects"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-slate-800">
        {sampleProjects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-800/30 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <Link
                to={`/projects/${project.id}`}
                className="font-semibold text-white transition hover:text-blue-300"
              >
                {project.title}
              </Link>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[project.status]}`}
            >
              {project.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentProjects