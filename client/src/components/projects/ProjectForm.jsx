import { useEffect, useState } from 'react'

const initialFormData = {
  title: '',
  description: '',
  technologyStack: '',
  status: 'Planning',
  repositoryUrl: '',
  liveUrl: '',
}

function ProjectForm({
  project,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologyStack:
          project.technologyStack?.join(', ') || '',
        status: project.status || 'Planning',
        repositoryUrl: project.repositoryUrl || '',
        liveUrl: project.liveUrl || '',
      })
    } else {
      setFormData(initialFormData)
    }

    setFormError('')
  }, [project])

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

    if (!formData.title.trim()) {
      setFormError('Project title is required')
      return
    }

    const technologyStack = formData.technologyStack
      .split(',')
      .map((technology) => technology.trim())
      .filter(Boolean)

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologyStack,
      status: formData.status,
      repositoryUrl: formData.repositoryUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
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
          htmlFor="title"
          className="block text-sm font-semibold text-slate-200"
        >
          Project title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: DevFlow AI"
          maxLength={100}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-200"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what your project does."
          rows={5}
          maxLength={1000}
          className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="technologyStack"
          className="block text-sm font-semibold text-slate-200"
        >
          Technology stack
        </label>

        <input
          id="technologyStack"
          name="technologyStack"
          type="text"
          value={formData.technologyStack}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />

        <p className="mt-2 text-xs text-slate-500">
          Separate technologies using commas.
        </p>
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-semibold text-slate-200"
        >
          Project status
        </label>

        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="repositoryUrl"
            className="block text-sm font-semibold text-slate-200"
          >
            GitHub repository URL
          </label>

          <input
            id="repositoryUrl"
            name="repositoryUrl"
            type="url"
            value={formData.repositoryUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-semibold text-slate-200"
          >
            Live website URL
          </label>

          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://example.vercel.app"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />
        </div>
      </div>

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
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? 'Saving...'
            : project
              ? 'Update Project'
              : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm