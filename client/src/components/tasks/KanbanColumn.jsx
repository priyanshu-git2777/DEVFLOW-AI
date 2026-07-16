import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

const columnStyles = {
  'To Do': {
    badge: 'bg-slate-700 text-slate-200',
    dot: 'bg-slate-400',
  },
  'In Progress': {
    badge: 'bg-blue-500/15 text-blue-300',
    dot: 'bg-blue-400',
  },
  Completed: {
    badge: 'bg-emerald-500/15 text-emerald-300',
    dot: 'bg-emerald-400',
  },
}

function KanbanColumn({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
}) {
  const styles = columnStyles[status]

  return (
    <section className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/50">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
          />

          <h2 className="font-bold text-white">
            {status}
          </h2>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {tasks.length}
        </span>
      </header>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-52 space-y-4 p-4 transition ${
              snapshot.isDraggingOver
                ? 'bg-blue-500/5'
                : ''
            }`}
          >
            {tasks.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-700 px-4 py-10 text-center">
                <p className="text-sm text-slate-500">
                  Drop a task here
                </p>
              </div>
            )}

            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  )
}

export default KanbanColumn