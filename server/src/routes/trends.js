import { Router } from 'express'
import ResearchTrend from '../models/ResearchTrend.js'

const router = Router()
router.get('/', async (_request, response, next) => {
  try { response.json(await ResearchTrend.find().sort({ growthPercentage: -1 }).lean()) }
  catch (error) { next(error) }
})
 feature/entity-relationships

 feature/put-endpoints

 feature/post-endpoints

 feature/get-endpoints
main
 main
 main
router.get('/:id', async (request, response, next) => {
  try {
    const trend = await ResearchTrend.findById(request.params.id).lean()
    if (!trend) return response.status(404).json({ message: 'Trend not found' })
    response.json(trend)
  } catch (error) { next(error) }
})
 feature/entity-relationships

 feature/put-endpoints

 feature/post-endpoints
 main
 main
router.post('/', async (request, response, next) => {
  try {
    const { topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd } = request.body
    const trend = await ResearchTrend.create({ topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd })
    response.status(201).location(`/api/trends/${trend._id}`).json(trend)
  } catch (error) { next(error) }
 feature/entity-relationships

 feature/put-endpoints
 main
})
router.put('/:id', async (request, response, next) => {
  try {
    const { topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd } = request.body
    const trend = await ResearchTrend.findByIdAndUpdate(
      request.params.id,
      { topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd },
      { new: true, runValidators: true },
    )
    if (!trend) return response.status(404).json({ message: 'Trend not found' })
    response.json(trend)
  } catch (error) { next(error) }
 feature/entity-relationships



 main
router.post('/', async (request, response, next) => {
  try { response.status(201).json(await ResearchTrend.create(request.body)) }
  catch (error) { next(error) }
 main
 main
 main
})
export default router
