import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import opportunitiesRouter from './routes/opportunities.js'
import trendsRouter from './routes/trends.js'
import usersRouter from './routes/users.js'
import savedRouter from './routes/saved-opportunities.js'

export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
  })

  app.use('/api/opportunities', opportunitiesRouter)
  app.use('/api/trends', trendsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/saved-opportunities', savedRouter)

  app.use((error, _request, response, _next) => {
 feature/entity-relationships

feature/put-endpoints
 main
    let status = 500
    if (error.name === 'ValidationError' || error.name === 'CastError') status = 400
    if (error.code === 11000) status = 409
    response.status(status).json({ message: error.code === 11000 ? 'A record with this value already exists' : error.message })
feature/entity-relationships


 feature/post-endpoints
    let status = 500
    if (error.name === 'ValidationError' || error.name === 'CastError') status = 400
    if (error.code === 11000) status = 409

    const status = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500
    response.status(status).json({ message: error.message })
 main
 main
 main
  })

  return app
}
