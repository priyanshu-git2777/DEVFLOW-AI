function TechBadge({ name, category }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4 transition hover:border-blue-500/40 hover:bg-slate-900">
      <p className="font-semibold text-slate-100">
        {name}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {category}
      </p>
    </div>
  )
}

export default TechBadge