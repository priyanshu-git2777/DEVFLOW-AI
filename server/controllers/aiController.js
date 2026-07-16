import { generateAIResponse } from "../services/geminiService.js";

const allowedModes = [
  'chat',
  'generate',
  'explain',
  'debug',
  'improve',
  'documentation',
]

async function generateDeveloperResponse(
  request,
  response,
) {
  try {
    const {
      mode = 'chat',
      prompt,
      code = '',
      language = '',
    } = request.body

    if (!prompt || !prompt.trim()) {
      return response.status(400).json({
        success: false,
        message: 'Prompt is required',
      })
    }

    if (!allowedModes.includes(mode)) {
      return response.status(400).json({
        success: false,
        message: `Invalid AI mode. Use one of: ${allowedModes.join(', ')}`,
      })
    }

    if (prompt.trim().length > 8000) {
      return response.status(400).json({
        success: false,
        message:
          'Prompt cannot exceed 8000 characters',
      })
    }

    if (code.length > 30000) {
      return response.status(400).json({
        success: false,
        message:
          'Code cannot exceed 30000 characters',
      })
    }

    const result = await generateAIResponse({
      mode,
      prompt,
      code,
      language,
    })

    return response.status(200).json({
      success: true,
      message: 'AI response generated successfully',
      data: {
        mode,
        response: result.text,
        model: result.model,
      },
    })
  } catch (error) {
    console.error('Gemini generation error:', error)

    const errorMessage =
      error?.message || 'Unknown Gemini error'

    if (
      errorMessage.includes('API_KEY') ||
      errorMessage.includes('API key')
    ) {
      return response.status(500).json({
        success: false,
        message:
          'Gemini API key is missing or invalid',
      })
    }

    if (
      errorMessage.toLowerCase().includes('quota') ||
      errorMessage.includes('429')
    ) {
      return response.status(429).json({
        success: false,
        message:
          'Gemini usage limit reached. Please try again later.',
      })
    }

    return response.status(500).json({
      success: false,
      message:
        'Unable to generate an AI response',
    })
  }
}

async function getAIModes(request, response) {
  return response.status(200).json({
    success: true,
    modes: [
      {
        value: 'chat',
        label: 'Ask AI',
        description:
          'Ask general programming questions.',
      },
      {
        value: 'generate',
        label: 'Generate Code',
        description:
          'Generate code from a requirement.',
      },
      {
        value: 'explain',
        label: 'Explain Code',
        description:
          'Understand code step by step.',
      },
      {
        value: 'debug',
        label: 'Debug Code',
        description:
          'Find and fix coding problems.',
      },
      {
        value: 'improve',
        label: 'Improve Code',
        description:
          'Refactor and optimize code.',
      },
      {
        value: 'documentation',
        label: 'Generate Documentation',
        description:
          'Create developer documentation.',
      },
    ],
  })
}

export {
  generateDeveloperResponse,
  getAIModes,
}