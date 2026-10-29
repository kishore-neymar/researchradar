import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = Router()
router.get('/', async (_request, response, next) => {
  try { response.json(await User.find().select('-passwordHash').lean()) }
  catch (error) { next(error) }
})
router.get('/:id/relationships', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
      .select('-passwordHash')
      .populate({ path: 'savedOpportunities', populate: { path: 'opportunity', select: 'title organization amount deadline isActive' } })
      .lean()
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) { next(error) }
})
router.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).select('-passwordHash').lean()
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) { next(error) }
})
router.post('/', async (request, response, next) => {
  try {
    const { name, username, email, password, passwordHash, interests, skills, researchAreas, publications } = request.body
    const hashedPassword = password ? await bcrypt.hash(password, 12) : passwordHash
    if (!hashedPassword) return response.status(400).json({ message: 'Password is required' })
    const user = await User.create({ name, username, email, passwordHash: hashedPassword, interests, skills, researchAreas, publications })
    const result = user.toObject()
    delete result.passwordHash
    response.status(201).location(`/api/users/${user._id}`).json(result)
  } catch (error) { next(error) }
})
router.put('/:id', async (request, response, next) => {
  try {
    const { name, email, interests, skills, researchAreas, publications } = request.body
    const user = await User.findByIdAndUpdate(
      request.params.id,
      { name, email, interests, skills, researchAreas, publications },
      { new: true, runValidators: true },
    ).select('-passwordHash')
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) { next(error) }
})
export default router
