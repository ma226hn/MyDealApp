import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'
// import { router as accountRouter } from './account-router.js'

export const router = express.Router()
console.log('khkk')
router.use('/api/v1', v1Router)
// router.get('/', (req, res) => res.json({ message: ' Welcome to authentication server' }))
// router.use('/', accountRouter)

// Catch 404
router.use('*', (req, res, next) => next(createError(404)))
