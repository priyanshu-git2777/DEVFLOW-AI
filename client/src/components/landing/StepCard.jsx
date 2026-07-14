function StepCard({
  number,
  title,
  description,
}) {
  return (
    <article className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
        {number}
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

export default StepCard