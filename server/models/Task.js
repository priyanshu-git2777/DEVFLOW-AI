import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
      index: true,
    },

    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [2, 'Task title must contain at least 2 characters'],
      maxlength: [150, 'Task title cannot exceed 150 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        'Task description cannot exceed 1000 characters',
      ],
      default: '',
    },

    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid task priority',
      },
      default: 'Medium',
    },

    status: {
      type: String,
      enum: {
        values: ['To Do', 'In Progress', 'Completed'],
        message: '{VALUE} is not a valid task status',
      },
      default: 'To Do',
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

taskSchema.index({
  user: 1,
  project: 1,
  createdAt: -1,
})

const Task = mongoose.model('Task', taskSchema)

export default Task