import { Router } from 'express'
import Opportunity from '../models/Opportunity.js'

const router = Router()
 feature/entity-relationships

 feature/put-endpoints

 feature/post-endpoints

 feature/get-endpoints
 main
 main
 main
router.get('/summary', async (_request, response, next) => {
  try {
    const [total, active, deadlinesThisMonth] = await Promise.all([
      Opportunity.countDocuments(),
      Opportunity.countDocuments({ isActive: true }),
      Opportunity.countDocuments({ deadline: { $gte: new Date(), $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } }),
    ])
    response.json({ total, active, deadlinesThisMonth })
  } catch (error) { next(error) }
})
 feature/entity-relationships

 feature/put-endpoints

 feature/post-endpoints


 main
 main
 main
 main
router.get('/', async (request, response, next) => {
  try {
    const filter = {}
    if (request.query.search) filter.$text = { $search: String(request.query.search) }
    if (request.query.active !== undefined) filter.isActive = request.query.active === 'true'
    response.json(await Opportunity.find(filter).sort({ deadline: 1 }).lean())
  } catch (error) { next(error) }
})
 feature/entity-relationships
router.get('/:id/relationships', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findById(request.params.id)
      .populate('createdBy', 'name email researchAreas')
      .populate({ path: 'savedRecords', populate: { path: 'user', select: 'name email' } })
      .lean()
    if (!opportunity) return response.status(404).json({ message: 'Opportunity not found' })
    response.json(opportunity)
  } catch (error) { next(error) }
})

 main
router.get('/:id', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findById(request.params.id).lean()
    if (!opportunity) return response.status(404).json({ message: 'Opportunity not found' })
    response.json(opportunity)
  } catch (error) { next(error) }
})
router.post('/', async (request, response, next) => {
 feature/entity-relationships

 feature/put-endpoints

 feature/post-endpoints
 main
 main
  try {
    const { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy } = request.body
    const opportunity = await Opportunity.create({ title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy })
    response.status(201).location(`/api/opportunities/${opportunity._id}`).json(opportunity)
  } catch (error) { next(error) }
 feature/entity-relationships

 feature/put-endpoints
 main
})
router.put('/:id', async (request, response, next) => {
  try {
    const { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy } = request.body
    const opportunity = await Opportunity.findByIdAndUpdate(
      request.params.id,
      { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy },
      { new: true, runValidators: true, overwrite: true },
 feature/entity-relationships
    )



  try { response.status(201).json(await Opportunity.create(request.body)) }
  catch (error) { next(error) }
 main
})
router.put('/:id', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
 main
 main
    if (!opportunity) return response.status(404).json({ message: 'Opportunity not found' })
    response.json(opportunity)
  } catch (error) { next(error) }
})
router.delete('/:id', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(request.params.id)
    if (!opportunity) return response.status(404).json({ message: 'Opportunity not found' })
    response.status(204).send()
  } catch (error) { next(error) }
})
export default router
