const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const { NotFoundError, ValidationError } = require('../helper/customErrorHelper')
const { bookingsModel, driversModel, usersModel } = require('../models/relation')
const { pgsql } = require('../db')

class Service {
  constructor(params, body, users) {
    this.params = params
    this.body = body
    this.users = users
  }

  async createBooking() {
    // Get Request
    const { lat, lng } = this.body

    // Validate Request
    if (!lat || !lng) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    const bookings = await bookingsModel.create({
      user_id: this.users.id,
      destination: { type: 'Point', coordinates: [lng, lat] },
      status: 'created',
    })

    return bookings
  }

  async getAllBooking() {
    // Get Data
    const bookings = await bookingsModel.findAll()

    return bookings
  }

  async getBookingById() {
    // Get Request
    const { id } = this.params

    // Validate Request
    if (!id) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    // Find Data
    const bookingData = await bookingsModel.findOne({ where: { id } })

    // If Data Not Exist
    if (!bookingData) {
      console.log('Booking Not Found')
      throw new NotFoundError('Booking Not Found')
    }

    return bookingData
  }

  async getAcceptedBooking() {
    // Get Data
    const bookings = await bookingsModel.findAll({
      where: { status: 'accepted' },
    })

    return bookings
  }

  async updateBooking() {
    // Get Request
    const { id } = this.params
    const { status, lat, lng, driver_id } = this.body

    // Validate Request
    if (!id || !status) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    // Find Data
    const bookingData = await bookingsModel.findOne({ where: { id } })

    // If Data Not Exist
    if (!bookingData) {
      console.log('Booking Not Found')
      throw new NotFoundError('Booking Not Found')
    }

    // Update Data
    const payload = { status, destination: { type: 'Point', coordinates: [lng, lat] }, driver_id }
    const data = await bookingData.update(payload)

    return data
  }

  async findDriverNearby() {
    // Get Request
    const { booking_id } = this.params

    // Validate Request
    if (!booking_id) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    // Find Data
    const bookingData = await bookingsModel.findOne({
      where: { id: booking_id },
      attributes: [],
      include: [
        {
          model: usersModel,
          as: 'user',
          attributes: ['last_location'],
        },
      ],
    })

    // If Data Not Exist
    if (!bookingData) {
      console.log('Booking Not Found')
      throw new NotFoundError('Booking Not Found')
    }

    const coordinates = bookingData.user.last_location.coordinates
    const [lng, lat] = coordinates

    // Find Driver Nearby
    const driver = await driversModel.findAll({
      attributes: [
        'id',
        'car_name',
        'car_plate',
        'status',
        [pgsql.literal(`ST_Distance(last_location::geography, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography)`), 'range'],
      ],
      include: [
        {
          model: usersModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
      where: {
        status: 'off',
      },
      order: [['range', 'ASC']],
      limit: 5,
    })

    return driver
  }
}

module.exports = Service
