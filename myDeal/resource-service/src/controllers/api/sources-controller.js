/**
 * Module for the imagesController.
 *
 */
import createError from 'http-errors'
import { Source } from '../../models/source.js'

/**
 * Encapsulates a controller.
 */
export class SourcesController {
  /**
   * Provide req.image to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the image to load.
   */
  async loadsource (req, res, next, id) {
    try {
      // Get the image.
      const sourceSelected = await Source.findById(id)

      // If no source found send a 404 (Not Found).
      if (!sourceSelected) {
        next(createError(404))
        return
      }

      // Provide the image to req.
      req.source = sourceSelected

      // Next middleware.
      next()
    } catch (err) {
      const error = createError(404, 'The requested resource was not found.')
      error.cause = err
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a source.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.source)
  }

  /**
   * Sends a JSON response containing all images.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const sources = await Source.find()

      res.json(sources)
    } catch (err) {
      const error = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).')
      error.cause = err
      next(error)
    }
  }

  /**
   * Creates a new image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const sourceNew = new Source({
        title: req.body.title,
        description: req.body.description,
        city:( req.body.city).toLowerCase(),
        type: req.body.type,
        ownerId: req.user.userId,
        ownerName: req.user.username,
        ownerEmail : req.user.email,

        images: req.body.images
      })

      await sourceNew.save()

      res
        .status(201)
        .json(sourceNew)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  /**
   * Updates a specific source.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      req.source.title= req.body.title
      req.source.description = req.body.description
      req.source.city =( req.body.city).toLowerCase(),
      req.source.type = req.body.type
      req.source.images = req.body.images
      await req.source.save()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.source.deleteOne()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
