import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import {
  errorHandler,
  NotFoundError,
  currentUser
} from '@brooksbenson03-tickets/common'

const app = express()
app.set('trust proxy', true)

// middlewares
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)
app.use(currentUser)

// routes
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
