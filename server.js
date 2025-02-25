import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'

import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as gamesRouter } from './routes/games.js'
import { router as reviewsRouter } from './routes/reviews.js'

import('./config/database.js')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse()) 

app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/games', gamesRouter)
app.use('/api/reviews', reviewsRouter)

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not found" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
