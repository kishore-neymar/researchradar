import { Router } from 'express'
import User from '../models/User.js'

const router = Router()
router.get('/', async (_request, response, next) => {
  try { response.json(await User.find().select('-passwordHash').lean()) }
  catch (error) { next(error) }
})
 feature/get-endpoints
router.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).select('-passwordHash').lean()
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) { next(error) }
})
main
router.post('/', async (request, response, next) => {
  try {
    const user = await User.create(request.body)
    const result = user.toObject()
    delete result.passwordHash
    response.status(201).json(result)
  } catch (error) { next(error) }
})
export default router
