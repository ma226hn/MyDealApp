/**
 * Module for the offerController.
 *
 */
import createError from 'http-errors'
import { Offer } from '../../models/offer.js'

/**
 * Encapsulates a controller.
 */
export class OffersController {
  /**
   * Provide req.offer to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the offer to load.
   */
  async loadoffer (req, res, next, id) {
    try {
      // Get the offer.
      const offerSelected = await Offer.findById(id)

      // If no offer found send a 404 (Not Found).
      if (!offerSelected) {
        next(createError(404))
        return
      }

      // Provide the offer to req.
      req.offer = offerSelected

      // Next middleware.
      next()
    } catch (err) {
      const error = createError(404, 'The requested offer was not found.')
      error.cause = err
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a offer.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.offer)
  }

  /**
   * Sends a JSON response containing all offers for the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const offers = await Offer.find({ senderId: `${req.user.userId}` })

      res.json(offers)
    } catch (err) {
      const error = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).')
      error.cause = err
      next(error)
    }
  }

  /**
   * Method return all the offer for the specified resours.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAlloffers (req, res, next) {
    try {
      console.log(req.body.sourceId)
      const offers = await Offer.find({ receiverId: `${req.user.userId}` })
      console.log(offers)

      res.json(offers)
    } catch (err) {
      const error = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).')
      error.cause = err
      next(error)
    }
  }

  /**
   * Creates a new offer.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const offerNew = new Offer({
        sourceId: req.body.sourceId,
        description: req.body.description,
        city: (req.body.city).toLowerCase(),
        type: req.body.type,
        senderId: req.user.userId,
        senderName: req.user.username,
        receiverId: req.body.receiverId,
        sourceTitle :req.body. sourceTitle,
        title :req.body.title,
        images: req.body.images,
        contectMethod: req.body.contectMethod
      })

      await offerNew.save()

      res
        .status(201)
        .json(offerNew)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }



  /**
   * Deletes the specified offer.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.offer.deleteOne()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
