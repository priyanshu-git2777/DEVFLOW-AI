import dayjs from 'dayjs'
import { Draggable } from '@hello-pangea/dnd'

const priorityClasses = {
  Low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  High: 'border-red-500/30 bg-red-500/10 text-red-300',
}

function TaskCard({
  task,
  index,
  onEdit,
  onDelete,
}) {
  const dueDateText = task.dueDate
    ? dayjs(task.dueDate).format('DD MMM YYYY')
    : 'No due date'

  const isOverdue =
    task.dueDate &&
    task.status !== 'Completed' &&
    dayjs(task.dueDate).endOf('day').isBefore(dayjs())

  return (
    <Draggable
      draggableId={task._id}
      index={index}
    >
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-2xl border bg-slate-900 p-4 shadow-lg transition ${
            snapshot.isDragging
              ? 'rotate-1 border-blue-500 shadow-blue-950/50'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                priorityClasses[task.priority] ||
                priorityClasses.Medium
              }`}
            >
              {task.priority}
            </span>

            <span
              className={`text-xs ${
                isOverdue
                  ? 'font-semibold text-red-400'
                  : 'text-slate-500'
              }`}
            >
              {isOverdue ? 'Overdue' : dueDateText}
            </span>
          </div>

          <h3 className="mt-4 break-words text-base font-bold text-white">
            {task.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
            {task.description || 'No description added.'}
          </p>

          <div className="mt-4 rounded-lg bg-slate-950 px-3 py-2">
            <p className="text-xs text-slate-500">
              Project
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-blue-300">
              {task.project?.title || 'Unknown project'}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(task)}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        </article>
      )}
    </Draggable>
  )
}

export default TaskCard