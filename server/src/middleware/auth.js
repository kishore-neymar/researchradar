import { verifyAuthToken } from '../utils/authToken.js'

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization
  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Authentication required' })
  }

  try {
    request.user = verifyAuthToken(authorization.slice(7))
    next()
  } catch (_error) {
    response.status(401).json({ message: 'Invalid or expired token' })
  }
}
