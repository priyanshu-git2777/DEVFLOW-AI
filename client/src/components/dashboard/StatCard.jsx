function StatCard({
  title,
  value,
  description,
  icon,
  accent = 'blue',
}) {
  const accentClasses = {
    blue: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    violet:
      'border-violet-500/20 bg-violet-500/10 text-violet-300',
    emerald:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    amber:
      'border-amber-500/20 bg-amber-500/10 text-amber-300',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-slate-700 hover:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border font-bold ${accentClasses[accent]}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </article>
  )
}

export default StatCard