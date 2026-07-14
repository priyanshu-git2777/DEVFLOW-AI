import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

router.get('/', (request, response) => {
  const databaseStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }

  response.status(200).json({
    success: true,
    message: 'DevFlow AI server is running',
    environment: process.env.NODE_ENV || 'development',
    database:
      databaseStates[mongoose.connection.readyState] || 'unknown',
    timestamp: new Date().toISOString(),
  })
})

export default router