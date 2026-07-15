import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },

    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [2, 'Project title must contain at least 2 characters'],
      maxlength: [100, 'Project title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        'Project description cannot exceed 1000 characters',
      ],
      default: '',
    },

    technologyStack: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        'Planning',
        'In Progress',
        'Completed',
        'On Hold',
      ],
      default: 'Planning',
    },

    repositoryUrl: {
      type: String,
      trim: true,
      default: '',
    },

    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

const Project = mongoose.model('Project', projectSchema)

export default Project