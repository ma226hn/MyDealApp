/**
 * Offer router
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { OffersController } from '../../../controllers/api/offers-controller.js'

export const router = express.Router()

const Controller = new OffersController()

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const accessTokenBuffer = Buffer.from(process.env.PUBLIC_KEY, 'base64')
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, accessTokenBuffer)
    req.user = {
      username: payload.username,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      userId: payload.sub

    }
    console.log(req.user)
    next()
  } catch (err) {
    const error = createError(401, 'Access token invalid or not provided.')
    error.cause = err
    next(error)
  }
}


/**
 * Authintication user permission.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const hasPermission = (req, res, next) => {
  ( (req.user?.userId === req.offer.senderId))
    ? next()
    : next(createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'))
}
// ------------------------------------------------------------------------------
//  Routes
// ------------------------------------------------------------------------------

// Provide req.offer to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => Controller.loadoffer(req, res, next, id))
  

// get offers 
router.get('/incomingOffers', authenticateJWT,

  (req, res, next) => Controller.findAlloffers(req, res, next)
)

// GET offer/:id
router.get('/:id',
  authenticateJWT, (req, res, next) => hasPermission(req, res, next), (req, res, next) => Controller.find(req, res, next)
)
// POST offers
router.post('/',
  authenticateJWT,
  (req, res, next) => Controller.create(req, res, next)
)


// DELETE offers/:id
router.delete('/:id',
  authenticateJWT,
  (req, res, next) => hasPermission(req, res, next),
  (req, res, next) => Controller.delete(req, res, next)
)
// get all  sentoffers for user
router.get('/', authenticateJWT,

  (req, res, next) => Controller.findAll(req, res, next)
)


