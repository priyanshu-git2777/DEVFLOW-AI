import mongoose from 'mongoose'
import Project from '../models/Project.js'

function normalizeTechnologyStack(technologyStack) {
  if (!Array.isArray(technologyStack)) {
    return []
  }

  return technologyStack
    .map((technology) => String(technology).trim())
    .filter(Boolean)
}

async function createProject(request, response) {
  try {
    const {
      title,
      description = '',
      technologyStack = [],
      status = 'Planning',
      repositoryUrl = '',
      liveUrl = '',
    } = request.body

    if (!title || !title.trim()) {
      return response.status(400).json({
        success: false,
        message: 'Project title is required',
      })
    }

    const project = await Project.create({
      user: request.user._id,
      title: title.trim(),
      description: description.trim(),
      technologyStack:
        normalizeTechnologyStack(technologyStack),
      status,
      repositoryUrl: repositoryUrl.trim(),
      liveUrl: liveUrl.trim(),
    })

    return response.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    })
  } catch (error) {
    console.error('Create project error:', error)

    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]

      return response.status(400).json({
        success: false,
        message: firstError.message,
      })
    }

    return response.status(500).json({
      success: false,
      message: 'Unable to create project',
    })
  }
}

async function getProjects(request, response) {
  try {
    const projects = await Project.find({
      user: request.user._id,
    }).sort({
      createdAt: -1,
    })

    return response.status(200).json({
      success: true,
      count: projects.length,
      projects,
    })
  } catch (error) {
    console.error('Get projects error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to retrieve projects',
    })
  }
}

async function getProjectById(request, response) {
  try {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid project ID',
      })
    }

    const project = await Project.findOne({
      _id: id,
      user: request.user._id,
    })

    if (!project) {
      return response.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    return response.status(200).json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Get project error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to retrieve project',
    })
  }
}

async function updateProject(request, response) {
  try {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid project ID',
      })
    }

    const project = await Project.findOne({
      _id: id,
      user: request.user._id,
    })

    if (!project) {
      return response.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    const {
      title,
      description,
      technologyStack,
      status,
      repositoryUrl,
      liveUrl,
    } = request.body

    if (title !== undefined) {
      if (!title.trim()) {
        return response.status(400).json({
          success: false,
          message: 'Project title cannot be empty',
        })
      }

      project.title = title.trim()
    }

    if (description !== undefined) {
      project.description = description.trim()
    }

    if (technologyStack !== undefined) {
      if (!Array.isArray(technologyStack)) {
        return response.status(400).json({
          success: false,
          message: 'Technology stack must be an array',
        })
      }

      project.technologyStack =
        normalizeTechnologyStack(technologyStack)
    }

    if (status !== undefined) {
      project.status = status
    }

    if (repositoryUrl !== undefined) {
      project.repositoryUrl = repositoryUrl.trim()
    }

    if (liveUrl !== undefined) {
      project.liveUrl = liveUrl.trim()
    }

    await project.save()

    return response.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project,
    })
  } catch (error) {
    console.error('Update project error:', error)

    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]

      return response.status(400).json({
        success: false,
        message: firstError.message,
      })
    }

    return response.status(500).json({
      success: false,
      message: 'Unable to update project',
    })
  }
}

async function deleteProject(request, response) {
  try {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: 'Invalid project ID',
      })
    }

    const project = await Project.findOne({
      _id: id,
      user: request.user._id,
    })

    if (!project) {
      return response.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    await project.deleteOne()

    return response.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Delete project error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to delete project',
    })
  }
}

export {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
}