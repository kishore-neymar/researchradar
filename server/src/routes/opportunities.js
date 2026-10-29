import { Router } from 'express'
import Opportunity from '../models/Opportunity.js'

const router = Router()
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
router.get('/', async (request, response, next) => {
  try {
    const filter = {}
    if (request.query.search) filter.$text = { $search: String(request.query.search) }
    if (request.query.active !== undefined) filter.isActive = request.query.active === 'true'
    response.json(await Opportunity.find(filter).sort({ deadline: 1 }).lean())
  } catch (error) { next(error) }
})
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
router.get('/:id', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findById(request.params.id).lean()
    if (!opportunity) return response.status(404).json({ message: 'Opportunity not found' })
    response.json(opportunity)
  } catch (error) { next(error) }
})
router.post('/', async (request, response, next) => {
  try {
    const { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy } = request.body
    const opportunity = await Opportunity.create({ title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy })
    response.status(201).location(`/api/opportunities/${opportunity._id}`).json(opportunity)
  } catch (error) { next(error) }
})
router.put('/:id', async (request, response, next) => {
  try {
    const { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy } = request.body
    const opportunity = await Opportunity.findByIdAndUpdate(
      request.params.id,
      { title, organization, description, amount, currency, deadline, tags, sourceUrl, isActive, createdBy },
      { new: true, runValidators: true, overwrite: true },
    )
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
