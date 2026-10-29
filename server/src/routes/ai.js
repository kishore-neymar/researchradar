import { Router } from 'express'

const router = Router()

const topics = [
  'AI for healthcare research',
  'medical imaging machine learning',
  'generative AI drug discovery',
  'responsible AI in public services',
  'natural language processing research funding',
  'multimodal healthcare AI grants',
  'computer vision clinical applications',
  'AI research opportunities for 2027',
  'biomedical AI research grants',
  'responsible AI research funding',
]

export function buildFallbackSuggestions(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []
  const words = normalized.split(/\s+/).filter((word) => word.length > 1)
  return topics
    .filter((topic) => {
      const searchableTopic = topic.toLowerCase()
      return searchableTopic.includes(normalized) || words.some((word) => searchableTopic.includes(word))
    })
    .slice(0, 5)
}

router.post('/autocomplete', async (request, response, next) => {
  try {
    const query = typeof request.body?.query === 'string' ? request.body.query.trim() : ''
    if (!query || query.length > 100) {
      return response.status(400).json({ message: 'Query must be between 1 and 100 characters' })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return response.json({ suggestions: buildFallbackSuggestions(query), source: 'fallback' })

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    const llmResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 100,
        messages: [
          { role: 'system', content: 'Return exactly a JSON object with a "suggestions" array containing 3 to 5 concise research topic searches. No markdown or explanation.' },
          { role: 'user', content: `Suggest research opportunity searches for: ${query}` },
        ],
      }),
    })
    if (!llmResponse.ok) {
      const detail = await llmResponse.text()
      console.error(`LLM autocomplete failed: ${llmResponse.status} ${detail}`)
      return response.json({ suggestions: buildFallbackSuggestions(query), source: 'fallback' })
    }

    const payload = await llmResponse.json()
    const content = payload.choices?.[0]?.message?.content || '{"suggestions":[]}'
    let suggestions = []
    try {
      const parsed = JSON.parse(content.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim())
      if (Array.isArray(parsed.suggestions)) suggestions = parsed.suggestions.slice(0, 5).filter((item) => typeof item === 'string')
    } catch {
      suggestions = buildFallbackSuggestions(query)
    }
    response.json({ suggestions: suggestions.length ? suggestions : buildFallbackSuggestions(query), source: suggestions.length ? 'llm' : 'fallback' })
  } catch (error) { next(error) }
})

export default router
