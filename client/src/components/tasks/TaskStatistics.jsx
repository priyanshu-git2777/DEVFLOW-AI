const cards = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: '✓',
    classes:
      'border-blue-500/20 bg-blue-500/10 text-blue-300',
  },
  {
    key: 'todo',
    label: 'To Do',
    icon: '○',
    classes:
      'border-slate-500/20 bg-slate-500/10 text-slate-300',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: '◐',
    classes:
      'border-violet-500/20 bg-violet-500/10 text-violet-300',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: '●',
    classes:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  },
  {
    key: 'highPriority',
    label: 'High Priority',
    icon: '!',
    classes:
      'border-red-500/20 bg-red-500/10 text-red-300',
  },
]

function TaskStatistics({ statistics }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <article
          key={card.key}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                {card.label}
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {statistics[card.key]}
              </p>
            </div>

            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl border font-bold ${card.classes}`}
            >
              {card.icon}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default TaskStatistics