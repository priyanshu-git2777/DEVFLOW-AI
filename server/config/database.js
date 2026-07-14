import mongoose from 'mongoose'

async function connectDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from server/.env')
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI)

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`,
    )
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDatabase