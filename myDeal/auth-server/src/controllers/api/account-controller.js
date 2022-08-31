/**
 * Acount controller class
 */

// import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * Load user information.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param  {string} id  - Id for the user.
   */
  async loaduser (req, res, next, id) {
    try {
      console.log(id)
      // Get the user.
      const userSelected = await User.findById(id)
      console.log('öööö')
      // If no user found send a 404 (Not Found).
      if (!userSelected) {
        next(createError(404))
        return
      }

      // Provide the image to req.
      req.user = userSelected
      console.log(req.user)
      // Next middleware.
      next()
    } catch (err) {
      const error = createError(404, 'The requested resource was not found.')
      error.cause = err
      next(error)
    }
  }

  /**
   * Login method.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      console.log('_______________________________________:Ö______________________________')
      console.log(req.body)
      const user = await User.authenticate(req.body.username, req.body.password)
      console.log(user)
      const payload = {
        sub: user.id,
        username: user.username,
        given_name: user.firstName,
        family_name: user.lastName,
        email: user.email

      }

     
      const accessTokenBuffer = Buffer.from(process.env.PRIVATE_KEY, 'base64')
      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, accessTokenBuffer, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
         
      res
        .status(201)
        .json({
          access_token: accessToken,
          user:user
        
          // refresh_token: refreshToken
        })
    } catch (error) {
      // Authentication failed.
     
      const err = createError(401)
      err.cause = error

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email

      })

      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.cause = error
      }

      next(err)
    }
  }

  /**
   * Update information.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      console.log(req.user)

     req.body.password ? req.user.password = req.body.password :null
     
     req.body.email ? req.user.email = req.body.email : null

      await req.user.save()

      res
        .status(204)
        .end()
    } catch (error) {
      let err = error
      console.log(err)
      err = createError(404)
      next(err)
    }
  }
  async getuser (req, res, next) {
    try {
      const userinfo = {
        id: req.user.id,
        email:req.user.email,
       firstName : req.user.firstName,
       lastName : req.user.lastName
      }

      res
      .status(201)
      .json({
       
        user:userinfo
    
      })
    } catch (error) {
      next(error)
    }
  }
}
