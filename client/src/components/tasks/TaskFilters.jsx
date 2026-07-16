function TaskFilters({
  filters,
  projects,
  onFilterChange,
  onClearFilters,
}) {
  function handleChange(event) {
    const { name, value } = event.target

    onFilterChange(name, value)
  }

  const filtersAreActive =
    filters.search ||
    filters.status !== 'All' ||
    filters.priority !== 'All' ||
    filters.project !== 'All'

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label
            htmlFor="task-search"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Search
          </label>

          <input
            id="task-search"
            name="search"
            type="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search title or description"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Status
          </label>

          <select
            id="status-filter"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="All">All statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority-filter"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Priority
          </label>

          <select
            id="priority-filter"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="All">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="project-filter"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Project
          </label>

          <select
            id="project-filter"
            name="project"
            value={filters.project}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="All">All projects</option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtersAreActive && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          Clear all filters
        </button>
      )}
    </section>
  )
}

export default TaskFilters