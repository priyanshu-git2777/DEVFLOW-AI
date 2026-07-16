import { GoogleGenAI } from '@google/genai'

function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing from server/.env')
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })
}

function buildDeveloperPrompt({
  mode,
  prompt,
  code,
  language,
}) {
  const safeLanguage = language?.trim() || 'Not specified'
  const safeCode = code?.trim() || 'No code was provided.'

  const modeInstructions = {
    chat: `
Act as a helpful senior software engineer.
Answer the developer's question clearly.
Use beginner-friendly explanations when appropriate.
Include code examples only when useful.
`,

    generate: `
Act as an expert software engineer.
Generate correct, complete and readable code for the request.
Explain the most important parts after the code.
Do not omit required setup steps.
`,

    explain: `
Act as a programming tutor.
Explain the supplied code step by step.
Describe what each important section does.
Point out complexity, assumptions and possible edge cases.
`,

    debug: `
Act as a debugging specialist.
Find likely errors in the supplied code.
Explain why each problem occurs.
Provide corrected code and testing steps.
`,

    improve: `
Act as a senior code reviewer.
Improve readability, maintainability, security and performance.
Return an improved version of the code.
Explain every meaningful change.
`,

    documentation: `
Act as a technical writer.
Generate clear developer documentation for the supplied project or code.
Use useful headings, setup instructions, usage examples and notes.
`,
  }

  const selectedInstruction =
    modeInstructions[mode] || modeInstructions.chat

  return `
${selectedInstruction}

Developer request:
${prompt.trim()}

Programming language:
${safeLanguage}

Code or additional context:
\`\`\`
${safeCode}
\`\`\`

Return a direct and useful answer.
Do not claim that code was tested unless it was actually executed.
`
}

async function generateAIResponse({
  mode = 'chat',
  prompt,
  code = '',
  language = '',
}) {
  const ai = getGeminiClient()

  const interaction = await ai.interactions.create({
    model:
      process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    input: buildDeveloperPrompt({
      mode,
      prompt,
      code,
      language,
    }),
  })

  const outputText = interaction.output_text?.trim()

  if (!outputText) {
    throw new Error('Gemini returned an empty response')
  }

  return {
    text: outputText,
    model:
      process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  }
}

export {
  generateAIResponse,
}