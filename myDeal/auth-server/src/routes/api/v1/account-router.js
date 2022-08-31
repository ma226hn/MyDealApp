/**
 *
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

// Map HTTP verbs and route paths to controller actions.

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
router.param('id', (req, res, next, id) => controller.loaduser(req, res, next, id))
router.put('/:id', (req, res, next) => controller.update(req, res, next))
router.get('/:id', (req, res, next) => controller.getuser(req, res, next))

