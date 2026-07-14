function FeatureCard({
  icon,
  title,
  description,
  accent = 'blue',
}) {
  const accentClasses = {
    blue: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
    violet:
      'border-violet-500/20 bg-violet-500/10 text-violet-300',
    emerald:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    amber:
      'border-amber-500/20 bg-amber-500/10 text-amber-300',
    rose: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
  }

  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${accentClasses[accent]}`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </article>
  )
}

export default FeatureCard