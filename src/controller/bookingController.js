const { response } = require('../helper/responseHelper')
const bookingService = require('../services/bookingService')

const createBooking = async (req, res, next) => {
  try {
    console.log('CREATE BOOKING')

    const user = req.user
    const body = req.body
    const paramaters = { ...req.params, ...req.query }
    const service = new bookingService(paramaters, body, user)
    const result = await service.createBooking()

    return response(res, 200, 'Ok', 'Success Login', result)
  } catch (error) {
    next(error)
  }
}

const findDriverNearby = async (req, res, next) => {
  try {
    console.log('FIND DRIVER NEARBY')

    const user = req.user
    const body = req.body
    const paramaters = { ...req.params, ...req.query }
    const service = new bookingService(paramaters, body, user)
    const result = await service.findDriverNearby()

    return response(res, 200, 'Ok', 'Success Login', result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBooking,
  findDriverNearby,
}
