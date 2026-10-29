import { Router } from 'express'
import Opportunity from '../models/Opportunity.js'

const router = Router()
 feature/get-endpoints
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

 main
router.get('/', async (request, response, next) => {
  try {
    const filter = {}
    if (request.query.search) filter.$text = { $search: String(request.query.search) }
    if (request.query.active !== undefined) filter.isActive = request.query.active === 'true'
    response.json(await Opportunity.find(filter).sort({ deadline: 1 }).lean())
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
  try { response.status(201).json(await Opportunity.create(request.body)) }
  catch (error) { next(error) }
})
router.put('/:id', async (request, response, next) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
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
