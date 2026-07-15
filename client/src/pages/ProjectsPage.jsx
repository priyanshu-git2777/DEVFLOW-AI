import { useCallback, useEffect, useState } from 'react'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectForm from '../components/projects/ProjectForm'
import ProjectModal from '../components/projects/ProjectModal'
import api from '../services/api'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const response = await api.get('/projects')
      setProjects(response.data.projects)
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to load projects'

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  function openCreateModal() {
    setSelectedProject(null)
    setError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  function openEditModal(project) {
    setSelectedProject(project)
    setError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  function closeModal() {
    if (isSubmitting) {
      return
    }

    setIsModalOpen(false)
    setSelectedProject(null)
  }

  async function handleSaveProject(projectData) {
    try {
      setIsSubmitting(true)
      setError('')
      setSuccessMessage('')

      if (selectedProject) {
        const response = await api.put(
          `/projects/${selectedProject._id}`,
          projectData,
        )

        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project._id === selectedProject._id
              ? response.data.project
              : project,
          ),
        )

        setSuccessMessage('Project updated successfully')
      } else {
        const response = await api.post(
          '/projects',
          projectData,
        )

        setProjects((currentProjects) => [
          response.data.project,
          ...currentProjects,
        ])

        setSuccessMessage('Project created successfully')
      }

      setIsModalOpen(false)
      setSelectedProject(null)
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to save project'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteProject(project) {
    const shouldDelete = window.confirm(
      `Delete "${project.title}"? This action cannot be undone.`,
    )

    if (!shouldDelete) {
      return
    }

    try {
      setError('')
      setSuccessMessage('')

      await api.delete(`/projects/${project._id}`)

      setProjects((currentProjects) =>
        currentProjects.filter(
          (currentProject) =>
            currentProject._id !== project._id,
        ),
      )

      setSuccessMessage('Project deleted successfully')
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to delete project'

      setError(message)
    }
  }

  return (
    <section className="px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Projects
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Create projects, record their technology stacks and
              keep important development links organized.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="w-fit rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            + Create Project
          </button>
        </div>

        {successMessage && (
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>{error}</p>

              <button
                type="button"
                onClick={fetchProjects}
                className="w-fit rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold transition hover:bg-red-500/30"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-300">
              ▣
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No projects yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
              Create your first project to start organizing your
              development work.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-7 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={openEditModal}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        title={
          selectedProject
            ? 'Edit Project'
            : 'Create New Project'
        }
        onClose={closeModal}
      >
        <ProjectForm
          project={selectedProject}
          isSubmitting={isSubmitting}
          onSubmit={handleSaveProject}
          onCancel={closeModal}
        />
      </ProjectModal>
    </section>
  )
}

export default ProjectsPage