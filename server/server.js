import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDatabase from './config/database.js'
import aiRoutes from './routes/aiRoutes.js'
import authRoutes from './routes/authRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config()

await connectDatabase()

const app = express()

const PORT = process.env.PORT || 5001

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:5173',
  }),
)

app.use(
  express.json({
    limit: '1mb',
  }),
)

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Welcome to the DevFlow AI API',
  })
})

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/ai', aiRoutes)
app.use("/api/chats", chatRoutes);

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  })
})

app.listen(PORT, () => {
  console.log(
    `DevFlow AI server is running on http://localhost:${PORT}`,
  )
})