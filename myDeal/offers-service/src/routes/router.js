/**
 *
 */

import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'
// import { router as accountRouter } from './account-router.js'

export const router = express.Router()

router.use('/api/v1', v1Router)

// Catch 404
router.use('*', (req, res, next) => next(createError(404)))
