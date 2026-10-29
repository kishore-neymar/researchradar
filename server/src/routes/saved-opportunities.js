import { Router } from 'express'
import SavedOpportunity from '../models/SavedOpportunity.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {}
    const saved = await SavedOpportunity.find(filter).populate('opportunity').sort({ createdAt: -1 }).lean()
    response.json(saved)
  } catch (error) { next(error) }
})

router.post('/', requireAuth, async (request, response, next) => {
  try {
 feature/jwt-authentication
    const { opportunity, status, notes } = request.body
    const saved = await SavedOpportunity.create({ user: request.user.userId, opportunity, status, notes })

 feature/entity-relationships

 feature/put-endpoints
 main
    const { user, opportunity, status, notes } = request.body
    const saved = await SavedOpportunity.create({ user, opportunity, status, notes })
 main
    response.status(201).location(`/api/saved-opportunities/${saved._id}`).json(saved)
  } catch (error) { next(error) }
})

router.put('/:id', requireAuth, async (request, response, next) => {
  try {
    const { status, notes } = request.body
    const saved = await SavedOpportunity.findOneAndUpdate(
      { _id: request.params.id, user: request.user.userId },
      { status, notes },
      { new: true, runValidators: true },
    ).populate('opportunity')
    if (!saved) return response.status(404).json({ message: 'Saved opportunity not found' })
    response.json(saved)
 feature/entity-relationships


 feature/post-endpoints
    const { user, opportunity, status, notes } = request.body
    const saved = await SavedOpportunity.create({ user, opportunity, status, notes })
    response.status(201).location(`/api/saved-opportunities/${saved._id}`).json(saved)

    const saved = await SavedOpportunity.create(request.body)
    response.status(201).json(saved)
 main
 main
 main
  } catch (error) { next(error) }
})

router.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const saved = await SavedOpportunity.findOneAndDelete({ _id: request.params.id, user: request.user.userId })
    if (!saved) return response.status(404).json({ message: 'Saved opportunity not found' })
    response.status(204).send()
  } catch (error) { next(error) }
})

export default router
