function ProjectModal({
  isOpen,
  title,
  children,
  onClose,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-10 max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-800 px-5 py-5 sm:px-6">
          <h2
            id="project-modal-title"
            className="text-xl font-bold text-white"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close project dialog"
          >
            ✕
          </button>
        </header>

        <div className="p-5 sm:p-6">
          {children}
        </div>
      </section>
    </div>
  )
}

export default ProjectModal