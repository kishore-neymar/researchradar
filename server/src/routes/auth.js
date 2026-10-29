import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function signToken(user) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not configured')
  return jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '1h' })
}

router.post('/register', async (request, response, next) => {
  try {
    const { username, password, name, email, interests, skills, researchAreas, publications } = request.body
    if (!username || !password || !email || !name) {
      return response.status(400).json({ message: 'Username, password, name, and email are required' })
    }
    if (password.length < 8) {
      return response.status(400).json({ message: 'Password must be at least 8 characters' })
    }
    const existing = await User.findOne({ $or: [{ username: username.trim().toLowerCase() }, { email: email.trim().toLowerCase() }] })
    if (existing) return response.status(409).json({ message: 'Username or email already exists' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ username: username.trim(), name, email, passwordHash, interests, skills, researchAreas, publications })
    const token = signToken(user)
    const result = user.toObject()
    delete result.passwordHash
    response.status(201).json({ token, user: result })
  } catch (error) { next(error) }
})

router.post('/login', async (request, response, next) => {
  try {
    const { username, password } = request.body
    if (!username || !password) return response.status(400).json({ message: 'Username and password are required' })

    const user = await User.findOne({ username: username.trim().toLowerCase() })
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return response.status(401).json({ message: 'Invalid username or password' })
    }

    const result = user.toObject()
    delete result.passwordHash
    response.json({ token: signToken(user), user: result })
  } catch (error) { next(error) }
})

router.get('/me', requireAuth, async (request, response, next) => {
  try {
    const user = await User.findById(request.user.userId).select('-passwordHash')
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) { next(error) }
})

export default router
