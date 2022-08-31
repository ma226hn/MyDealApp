/**
 * API version 1 routes.
 *
 */

import express from 'express'

import { router as accountRouter } from './account-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: ' Welcome to authentication server' }))
router.use('/', accountRouter)
