import { useEffect, useState } from 'react'

const initialFormData = {
  project: '',
  title: '',
  description: '',
  priority: 'Medium',
  status: 'To Do',
  dueDate: '',
}

function getDateInputValue(date) {
  if (!date) {
    return ''
  }

  return new Date(date).toISOString().split('T')[0]
}

function TaskForm({
  task,
  projects,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (task) {
      setFormData({
        project: task.project?._id || task.project || '',
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'To Do',
        dueDate: getDateInputValue(task.dueDate),
      })
    } else {
      setFormData({
        ...initialFormData,
        project: projects[0]?._id || '',
      })
    }

    setFormError('')
  }, [task, projects])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormError('')

    if (!formData.project) {
      setFormError('Please select a project')
      return
    }

    if (!formData.title.trim()) {
      setFormError('Task title is required')
      return
    }

    onSubmit({
      project: formData.project,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate || '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {formError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {formError}
        </div>
      )}

      <div>
        <label
          htmlFor="task-project"
          className="block text-sm font-semibold text-slate-200"
        >
          Project
        </label>

        <select
          id="task-project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        >
          <option value="">Select a project</option>

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

      <div>
        <label
          htmlFor="task-title"
          className="block text-sm font-semibold text-slate-200"
        >
          Task title
        </label>

        <input
          id="task-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          maxLength={150}
          placeholder="Example: Build the login page"
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="block text-sm font-semibold text-slate-200"
        >
          Description
        </label>

        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          maxLength={1000}
          placeholder="Describe what needs to be completed."
          className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="task-priority"
            className="block text-sm font-semibold text-slate-200"
          >
            Priority
          </label>

          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-status"
            className="block text-sm font-semibold text-slate-200"
          >
            Status
          </label>

          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="task-due-date"
          className="block text-sm font-semibold text-slate-200"
        >
          Due date
        </label>

        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />

        <p className="mt-2 text-xs text-slate-500">
          You can leave the due date empty.
        </p>
      </div>

      {projects.length === 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          You must create a project before creating a task.
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-semibold text-slate-300 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || projects.length === 0}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? 'Saving...'
            : task
              ? 'Update Task'
              : 'Create Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm