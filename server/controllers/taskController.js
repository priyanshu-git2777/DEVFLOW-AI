import mongoose from 'mongoose'
import Project from '../models/Project.js'
import Task from '../models/Task.js'

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

function normalizeDueDate(dueDate) {
  if (dueDate === undefined) {
    return undefined
  }

  if (dueDate === null || dueDate === '') {
    return null
  }

  const parsedDate = new Date(dueDate)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'invalid'
  }

  return parsedDate
}

async function findOwnedProject(projectId, userId) {
  return Project.findOne({
    _id: projectId,
    user: userId,
  })
}

async function createTask(request, response) {
  try {
    const {
      project,
      title,
      description = '',
      priority = 'Medium',
      status = 'To Do',
      dueDate = null,
    } = request.body

    if (!project) {
      return response.status(400).json({
        success: false,
        message: 'Project ID is required',
      })
    }

    if (!isValidObjectId(project)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid project ID',
      })
    }

    if (!title || !title.trim()) {
      return response.status(400).json({
        success: false,
        message: 'Task title is required',
      })
    }

    const ownedProject = await findOwnedProject(
      project,
      request.user._id,
    )

    if (!ownedProject) {
      return response.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    const normalizedDueDate = normalizeDueDate(dueDate)

    if (normalizedDueDate === 'invalid') {
      return response.status(400).json({
        success: false,
        message: 'Due date is invalid',
      })
    }

    const task = await Task.create({
      user: request.user._id,
      project: ownedProject._id,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: normalizedDueDate,
    })

    await task.populate('project', 'title status')

    return response.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    })
  } catch (error) {
    console.error('Create task error:', error)

    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]

      return response.status(400).json({
        success: false,
        message: firstError.message,
      })
    }

    return response.status(500).json({
      success: false,
      message: 'Unable to create task',
    })
  }
}

async function getTasks(request, response) {
  try {
    const {
      status,
      priority,
      project,
    } = request.query

    const filter = {
      user: request.user._id,
    }

    if (status) {
      filter.status = status
    }

    if (priority) {
      filter.priority = priority
    }

    if (project) {
      if (!isValidObjectId(project)) {
        return response.status(400).json({
          success: false,
          message: 'Invalid project ID',
        })
      }

      filter.project = project
    }

    const tasks = await Task.find(filter)
      .populate('project', 'title status')
      .sort({
        createdAt: -1,
      })

    return response.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    })
  } catch (error) {
    console.error('Get tasks error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to retrieve tasks',
    })
  }
}

async function getProjectTasks(request, response) {
  try {
    const { projectId } = request.params

    if (!isValidObjectId(projectId)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid project ID',
      })
    }

    const ownedProject = await findOwnedProject(
      projectId,
      request.user._id,
    )

    if (!ownedProject) {
      return response.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    const tasks = await Task.find({
      project: ownedProject._id,
      user: request.user._id,
    })
      .populate('project', 'title status')
      .sort({
        createdAt: -1,
      })

    return response.status(200).json({
      success: true,
      project: {
        id: ownedProject._id,
        title: ownedProject.title,
      },
      count: tasks.length,
      tasks,
    })
  } catch (error) {
    console.error('Get project tasks error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to retrieve project tasks',
    })
  }
}

async function updateTask(request, response) {
  try {
    const { id } = request.params

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid task ID',
      })
    }

    const task = await Task.findOne({
      _id: id,
      user: request.user._id,
    })

    if (!task) {
      return response.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    const {
      project,
      title,
      description,
      priority,
      status,
      dueDate,
    } = request.body

    if (project !== undefined) {
      if (!isValidObjectId(project)) {
        return response.status(400).json({
          success: false,
          message: 'Invalid project ID',
        })
      }

      const ownedProject = await findOwnedProject(
        project,
        request.user._id,
      )

      if (!ownedProject) {
        return response.status(404).json({
          success: false,
          message: 'Project not found',
        })
      }

      task.project = ownedProject._id
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return response.status(400).json({
          success: false,
          message: 'Task title cannot be empty',
        })
      }

      task.title = title.trim()
    }

    if (description !== undefined) {
      task.description = description.trim()
    }

    if (priority !== undefined) {
      task.priority = priority
    }

    if (status !== undefined) {
      task.status = status
    }

    if (dueDate !== undefined) {
      const normalizedDueDate = normalizeDueDate(dueDate)

      if (normalizedDueDate === 'invalid') {
        return response.status(400).json({
          success: false,
          message: 'Due date is invalid',
        })
      }

      task.dueDate = normalizedDueDate
    }

    await task.save()
    await task.populate('project', 'title status')

    return response.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    })
  } catch (error) {
    console.error('Update task error:', error)

    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]

      return response.status(400).json({
        success: false,
        message: firstError.message,
      })
    }

    return response.status(500).json({
      success: false,
      message: 'Unable to update task',
    })
  }
}

async function deleteTask(request, response) {
  try {
    const { id } = request.params

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid task ID',
      })
    }

    const task = await Task.findOne({
      _id: id,
      user: request.user._id,
    })

    if (!task) {
      return response.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    await task.deleteOne()

    return response.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error('Delete task error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to delete task',
    })
  }
}

export {
  createTask,
  deleteTask,
  getProjectTasks,
  getTasks,
  updateTask,
}