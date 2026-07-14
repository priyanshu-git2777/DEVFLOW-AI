import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import healthRoutes from './routes/healthRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)

app.use(express.json())

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Welcome to the DevFlow AI API',
  })
})

app.use('/api/health', healthRoutes)

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  })
})

app.listen(PORT, () => {
  console.log(`DevFlow AI server is running on http://localhost:${PORT}`)
})