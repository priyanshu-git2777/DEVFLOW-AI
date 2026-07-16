import express from 'express'
import {
  generateDeveloperResponse,
  getAIModes,
} from '../controllers/aiController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/modes', protect, getAIModes)

router.post(
  '/generate',
  protect,
  generateDeveloperResponse,
)

export default router