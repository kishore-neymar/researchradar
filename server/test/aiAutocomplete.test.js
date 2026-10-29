import { describe, expect, it } from 'vitest'
import { buildFallbackSuggestions } from '../src/routes/ai.js'

describe('AI autocomplete fallback', () => {
  it('returns an empty list for an empty query', () => {
    expect(buildFallbackSuggestions('')).toEqual([])
  })

  it('finds healthcare suggestions', () => {
    const suggestions = buildFallbackSuggestions('healthcare')
    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.every((suggestion) => suggestion.toLowerCase().includes('health') || suggestion.toLowerCase().includes('medical'))).toBe(true)
  })

  it('matches partial AI queries case-insensitively', () => {
    expect(buildFallbackSuggestions('AI')).toContain('AI for healthcare research')
  })

  it('limits suggestions to five items', () => {
    expect(buildFallbackSuggestions('research')).toHaveLength(5)
  })

  it('returns no suggestion for unrelated input when no fallback topic matches', () => {
    expect(buildFallbackSuggestions('quantum finance derivatives')).toEqual([])
  })
})
