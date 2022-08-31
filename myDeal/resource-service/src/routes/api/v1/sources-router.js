/**
 *
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { SourcesController } from '../../../controllers/api/sources-controller.js'

export const router = express.Router()

const Controller = new SourcesController()

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
 * Authorize requests.
 *
 * If authorization is successful, that is the user is granted access
 * to the requested resource, the request is authorized to continue.
 * If authentication fails, a forbidden response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const hasPermission = (req, res, next) => {
  console.log(req.user.userId)
  console.log(req.source.ownerId)
  req.user?.userId === req.source.ownerId
    ? next()
    : next(createError(403, ', but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'))
}

// ------------------------------------------------------------------------------
//  Routes
// ------------------------------------------------------------------------------

// Provide req.source to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => Controller.loadsource(req, res, next, id))

// GET sources/:id
router.get('/:id',
  authenticateJWT, (req, res, next) => Controller.find(req, res, next)
)
router.get('/',

  (req, res, next) => Controller.findAll(req, res, next)
)

// POST sources
router.post('/',
  authenticateJWT,
  (req, res, next) => Controller.create(req, res, next)
)

// PUT sources/:id
router.put('/:id',
  authenticateJWT,
  (req, res, next) => hasPermission(req, res, next),
  (req, res, next) => Controller.update(req, res, next)
)


// DELETE sources/:id
router.delete('/:id',
  authenticateJWT,
  (req, res, next) => hasPermission(req, res, next),
  (req, res, next) => Controller.delete(req, res, next)
)
