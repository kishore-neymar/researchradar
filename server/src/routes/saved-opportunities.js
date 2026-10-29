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
    const saved = await SavedOpportunity.create(request.body)
    response.status(201).json(saved)
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
