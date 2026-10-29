import { Router } from 'express'
import SavedOpportunity from '../models/SavedOpportunity.js'

const router = Router()

router.get('/', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {}
    const saved = await SavedOpportunity.find(filter).populate('opportunity').sort({ createdAt: -1 }).lean()
    response.json(saved)
  } catch (error) { next(error) }
})

router.post('/', async (request, response, next) => {
  try {
    const { user, opportunity, status, notes } = request.body
    const saved = await SavedOpportunity.create({ user, opportunity, status, notes })
    response.status(201).location(`/api/saved-opportunities/${saved._id}`).json(saved)
  } catch (error) { next(error) }
})

router.put('/:id', async (request, response, next) => {
  try {
    const { status, notes } = request.body
    const saved = await SavedOpportunity.findByIdAndUpdate(
      request.params.id,
      { status, notes },
      { new: true, runValidators: true },
    ).populate('opportunity')
    if (!saved) return response.status(404).json({ message: 'Saved opportunity not found' })
    response.json(saved)
  } catch (error) { next(error) }
})

router.delete('/:id', async (request, response, next) => {
  try {
    const saved = await SavedOpportunity.findByIdAndDelete(request.params.id)
    if (!saved) return response.status(404).json({ message: 'Saved opportunity not found' })
    response.status(204).send()
  } catch (error) { next(error) }
})

export default router
