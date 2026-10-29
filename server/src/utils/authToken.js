import jwt from 'jsonwebtoken'

const issuer = 'researchradar-api'
const audience = 'researchradar-app'

export function signAuthToken(user, secret = process.env.JWT_SECRET) {
  if (!secret) throw new Error('JWT_SECRET is not configured')
  return jwt.sign(
    { userId: user._id.toString(), username: user.username },
    secret,
    { algorithm: 'HS256', expiresIn: '1h', issuer, audience },
  )
}

export function verifyAuthToken(token, secret = process.env.JWT_SECRET) {
  if (!secret) throw new Error('JWT_SECRET is not configured')
  return jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer,
    audience,
  })
}
