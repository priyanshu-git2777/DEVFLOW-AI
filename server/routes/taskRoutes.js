import express from 'express'
import {
  createTask,
  deleteTask,
  getProjectTasks,
  getTasks,
  updateTask,
} from '../controllers/taskController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(protect, createTask)
  .get(protect, getTasks)

router.get(
  '/project/:projectId',
  protect,
  getProjectTasks,
)

router
  .route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask)

export default router