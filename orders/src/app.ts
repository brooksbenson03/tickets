import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@brooksbenson03-tickets/common'
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

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
app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

// error handler
app.use(errorHandler)

export { app }
