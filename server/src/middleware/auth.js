import jwt from 'jsonwebtoken'

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization
  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Authentication required' })
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not configured')
    request.user = jwt.verify(authorization.slice(7), secret)
    next()
  } catch (_error) {
    response.status(401).json({ message: 'Invalid or expired token' })
  }
}
