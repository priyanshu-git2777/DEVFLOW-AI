import {
  DragDropContext,
} from '@hello-pangea/dnd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import KanbanColumn from '../components/tasks/KanbanColumn'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskForm from '../components/tasks/TaskForm'
import TaskModal from '../components/tasks/TaskModal'
import TaskStatistics from '../components/tasks/TaskStatistics'
import api from '../services/api'

const taskStatuses = [
  'To Do',
  'In Progress',
  'Completed',
]

const initialFilters = {
  search: '',
  status: 'All',
  priority: 'All',
  project: 'All',
}

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const [tasksResponse, projectsResponse] =
        await Promise.all([
          api.get('/tasks'),
          api.get('/projects'),
        ])

      setTasks(tasksResponse.data.tasks || [])
      setProjects(projectsResponse.data.projects || [])
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to load tasks'

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredTasks = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        !searchText ||
        task.title.toLowerCase().includes(searchText) ||
        task.description
          ?.toLowerCase()
          .includes(searchText) ||
        task.project?.title
          ?.toLowerCase()
          .includes(searchText)

      const matchesStatus =
        filters.status === 'All' ||
        task.status === filters.status

      const matchesPriority =
        filters.priority === 'All' ||
        task.priority === filters.priority

      const projectId =
        task.project?._id || task.project

      const matchesProject =
        filters.project === 'All' ||
        projectId === filters.project

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject
      )
    })
  }, [tasks, filters])

  const statistics = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter(
        (task) => task.status === 'To Do',
      ).length,
      inProgress: tasks.filter(
        (task) => task.status === 'In Progress',
      ).length,
      completed: tasks.filter(
        (task) => task.status === 'Completed',
      ).length,
      highPriority: tasks.filter(
        (task) => task.priority === 'High',
      ).length,
    }),
    [tasks],
  )

  const tasksByStatus = useMemo(() => {
    return taskStatuses.reduce((columns, status) => {
      columns[status] = filteredTasks.filter(
        (task) => task.status === status,
      )

      return columns
    }, {})
  }, [filteredTasks])

  function openCreateModal() {
    setSelectedTask(null)
    setError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  function openEditModal(task) {
    setSelectedTask(task)
    setError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  function closeModal() {
    if (isSubmitting) {
      return
    }

    setIsModalOpen(false)
    setSelectedTask(null)
  }

  function handleFilterChange(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

  async function handleSaveTask(taskData) {
    try {
      setIsSubmitting(true)
      setError('')
      setSuccessMessage('')

      if (selectedTask) {
        const response = await api.put(
          `/tasks/${selectedTask._id}`,
          taskData,
        )

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task._id === selectedTask._id
              ? response.data.task
              : task,
          ),
        )

        setSuccessMessage('Task updated successfully')
      } else {
        const response = await api.post(
          '/tasks',
          taskData,
        )

        setTasks((currentTasks) => [
          response.data.task,
          ...currentTasks,
        ])

        setSuccessMessage('Task created successfully')
      }

      setSelectedTask(null)
      setIsModalOpen(false)
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to save task'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteTask(task) {
    const shouldDelete = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    )

    if (!shouldDelete) {
      return
    }

    try {
      setError('')
      setSuccessMessage('')

      await api.delete(`/tasks/${task._id}`)

      setTasks((currentTasks) =>
        currentTasks.filter(
          (currentTask) =>
            currentTask._id !== task._id,
        ),
      )

      setSuccessMessage('Task deleted successfully')
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to delete task'

      setError(message)
    }
  }

  async function handleDragEnd(result) {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newStatus = destination.droppableId

    if (!taskStatuses.includes(newStatus)) {
      return
    }

    const draggedTask = tasks.find(
      (task) => task._id === draggableId,
    )

    if (!draggedTask || draggedTask.status === newStatus) {
      return
    }

    const previousTasks = tasks

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === draggableId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    )

    setError('')
    setSuccessMessage('')

    try {
      const response = await api.put(
        `/tasks/${draggableId}`,
        {
          status: newStatus,
        },
      )

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === draggableId
            ? response.data.task
            : task,
        ),
      )

      setSuccessMessage(
        `Task moved to ${newStatus}`,
      )
    } catch (requestError) {
      setTasks(previousTasks)

      const message =
        requestError.response?.data?.message ||
        'Unable to move task'

      setError(message)
    }
  }

  return (
    <section className="px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Project Workflow
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Tasks
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Create, organize and move development tasks through
              your project workflow.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            disabled={projects.length === 0}
            className="w-fit rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Create Task
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
                onClick={fetchData}
                className="w-fit rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold transition hover:bg-red-500/30"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <TaskStatistics statistics={statistics} />
        </div>

        <div className="mt-6">
          <TaskFilters
            filters={filters}
            projects={projects}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>

        {projects.length === 0 && !isLoading && (
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200">
            <h2 className="font-bold">
              Create a project first
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-200/80">
              Every task must belong to a project. Open the
              Projects page and create at least one project.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((column) => (
              <div
                key={column}
                className="h-[500px] animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70"
              />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-300">
              ✓
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No tasks yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
              Create your first development task and organize it
              using the Kanban board.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              disabled={projects.length === 0}
              className="mt-7 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Your First Task
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center">
            <h2 className="text-xl font-bold">
              No matching tasks
            </h2>

            <p className="mt-2 text-slate-400">
              Change or clear your filters to see more tasks.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {taskStatuses.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  tasks={tasksByStatus[status]}
                  onEditTask={openEditModal}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </div>
          </DragDropContext>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        title={
          selectedTask
            ? 'Edit Task'
            : 'Create New Task'
        }
        onClose={closeModal}
      >
        <TaskForm
          task={selectedTask}
          projects={projects}
          isSubmitting={isSubmitting}
          onSubmit={handleSaveTask}
          onCancel={closeModal}
        />
      </TaskModal>
    </section>
  )
}

export default TasksPage