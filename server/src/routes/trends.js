import { Router } from 'express'
import ResearchTrend from '../models/ResearchTrend.js'

const router = Router()
router.get('/', async (_request, response, next) => {
  try { response.json(await ResearchTrend.find().sort({ growthPercentage: -1 }).lean()) }
  catch (error) { next(error) }
})
 feature/post-endpoints

 feature/get-endpoints
main
router.get('/:id', async (request, response, next) => {
  try {
    const trend = await ResearchTrend.findById(request.params.id).lean()
    if (!trend) return response.status(404).json({ message: 'Trend not found' })
    response.json(trend)
  } catch (error) { next(error) }
})
 feature/post-endpoints
router.post('/', async (request, response, next) => {
  try {
    const { topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd } = request.body
    const trend = await ResearchTrend.create({ topic, growthPercentage, momentum, description, relatedTags, periodStart, periodEnd })
    response.status(201).location(`/api/trends/${trend._id}`).json(trend)
  } catch (error) { next(error) }

 main
router.post('/', async (request, response, next) => {
  try { response.status(201).json(await ResearchTrend.create(request.body)) }
  catch (error) { next(error) }
 main
})
export default router
