import { Router } from 'express'
import ResearchTrend from '../models/ResearchTrend.js'

const router = Router()
router.get('/', async (_request, response, next) => {
  try { response.json(await ResearchTrend.find().sort({ growthPercentage: -1 }).lean()) }
  catch (error) { next(error) }
})
router.post('/', async (request, response, next) => {
  try { response.status(201).json(await ResearchTrend.create(request.body)) }
  catch (error) { next(error) }
})
export default router
