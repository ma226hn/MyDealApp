/**
 * The routes.
 *
 */

import express from 'express'
import createError from 'http-errors'
import { router as offersRouter } from './offers-router.js'

export const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to offers' }))


router.use('/offers', offersRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
