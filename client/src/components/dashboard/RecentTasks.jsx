const sampleTasks = [
  {
    id: 1,
    title: 'Build dashboard layout',
    project: 'DevFlow AI',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Design project cards',
    project: 'DevFlow AI',
    priority: 'Medium',
    status: 'To Do',
  },
  {
    id: 3,
    title: 'Write portfolio content',
    project: 'Developer Portfolio',
    priority: 'Low',
    status: 'Completed',
  },
]

const priorityClasses = {
  High: 'text-red-300',
  Medium: 'text-amber-300',
  Low: 'text-emerald-300',
}

function RecentTasks() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="border-b border-slate-800 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-bold text-white">
          Recent Tasks
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest tasks across your projects
        </p>
      </div>

      <div className="divide-y divide-slate-800">
        {sampleTasks.map((task) => (
          <article
            key={task.id}
            className="px-5 py-5 transition hover:bg-slate-800/30 sm:px-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                  task.status === 'Completed'
                    ? 'bg-emerald-400'
                    : task.status === 'In Progress'
                      ? 'bg-blue-400'
                      : 'bg-slate-500'
                }`}
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">
                  {task.title}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-slate-500">
                    {task.project}
                  </span>

                  <span
                    className={`font-medium ${priorityClasses[task.priority]}`}
                  >
                    {task.priority} priority
                  </span>
                </div>
              </div>

              <span className="hidden rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 sm:block">
                {task.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentTasks