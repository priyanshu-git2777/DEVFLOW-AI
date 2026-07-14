function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
}) {
  const alignmentClasses =
    align === 'left'
      ? 'items-start text-left'
      : 'items-center text-center'

  return (
    <div className={`flex flex-col ${alignmentClasses}`}>
      {badge && (
        <p className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
          {badge}
        </p>
      )}

      <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading