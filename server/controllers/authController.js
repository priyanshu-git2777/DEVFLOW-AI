import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

async function registerUser(request, response) {
  try {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      return response.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return response.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      })
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    })

    return response.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Register error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to register user',
    })
  }
}

async function loginUser(request, response) {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail,
    })

    if (!user) {
      return response.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const passwordIsCorrect = await user.comparePassword(password)

    if (!passwordIsCorrect) {
      return response.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user._id.toString())

    return response.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return response.status(500).json({
      success: false,
      message: 'Unable to log in',
    })
  }
}

export {
  loginUser,
  registerUser,
}