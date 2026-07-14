import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {
  response.status(200).json({
    success: true,
message: 'DevFlow AI backend is working correctly',    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

export default router