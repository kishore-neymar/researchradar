import { describe, expect, it } from 'vitest'
import jwt from 'jsonwebtoken'
import { signAuthToken, verifyAuthToken } from '../src/utils/authToken.js'
import { requireAuth } from '../src/middleware/auth.js'

const secret = 'unit-test-secret-at-least-32-characters'
const user = { _id: { toString: () => '507f1f77bcf86cd799439011' }, username: 'researcher1' }

describe('JWT authentication utilities', () => {
  it('creates a signed token for a user', () => {
    const token = signAuthToken(user, secret)
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3)
  })

  it('includes the user identifier and username in the payload', () => {
    const payload = verifyAuthToken(signAuthToken(user, secret), secret)
    expect(payload.userId).toBe('507f1f77bcf86cd799439011')
    expect(payload.username).toBe('researcher1')
  })

  it('sets a one-hour expiration', () => {
    const payload = verifyAuthToken(signAuthToken(user, secret), secret)
    expect(payload.exp - payload.iat).toBe(3600)
  })

  it('rejects a token signed with a different secret', () => {
    const token = signAuthToken(user, secret)
    expect(() => verifyAuthToken(token, 'different-secret-value')).toThrow()
  })

  it('rejects an expired token', () => {
    const token = jwt.sign(
      { userId: '507f1f77bcf86cd799439011' },
      secret,
      { expiresIn: -1, issuer: 'researchradar-api', audience: 'researchradar-app', algorithm: 'HS256' },
    )
    expect(() => verifyAuthToken(token, secret)).toThrow()
  })

  it('throws when JWT_SECRET is missing', () => {
    expect(() => signAuthToken(user, undefined)).toThrow('JWT_SECRET is not configured')
  })

  it('rejects requests that do not contain a bearer token', () => {
    const response = {
      status: (value) => { response.statusCode = value; return response },
      json: (value) => { response.body = value; return response },
    }
    let nextCalled = false
    requireAuth({ headers: {} }, response, () => { nextCalled = true })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Authentication required')
    expect(nextCalled).toBe(false)
  })
})
