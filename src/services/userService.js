const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const { NotFoundError, ValidationError } = require('../helper/customErrorHelper')
const { usersModel } = require('../models/relation')

class Service {
  constructor(params, body, users) {
    this.params = params
    this.body = body
    this.users = users
  }

  async login() {
    // Get Request
    const { email, password } = this.body

    // Validate Request
    if (!email || !password) {
      console.log('Invalid Request')
      throw new Error('Invalid Request')
    }

    // Find Data
    const data = await usersModel.findOne({ where: { email } })

    // If Data Not Exist
    if (!data) {
      console.log('User Not Found')
      throw new NotFoundError('User Not Found')
    }

    // Check Password
    const isPasswordCorrect = bcrypt.compareSync(password, data.password)
    if (!isPasswordCorrect) {
      console.log('Password Not Correct')
      throw new ValidationError('Password Not Correct')
    }

    // Generate Token
    const token = uuid()

    // Update Data
    const payload = { token }
    await data.update(payload)

    return {
      id: data.id,
      name: data.name,
      token: token,
    }
  }

  async logout() {
    // Get Request
    const { token } = this.body

    // Validate Request
    if (!token) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    // Find Data
    const data = await usersModel.findOne({ where: { token } })

    // If Data Not Exist
    if (!data) {
      console.log('User Not Found')
      throw new NotFoundError('User Not Found')
    }

    // Update Data
    const payload = { token: null }
    await data.update(payload)

    return data
  }

  async identify() {
    return this.users
  }

  async updateUserLocation() {
    // Get Request
    const { lat, lng } = this.body

    // Validate Request
    if (!lat || !lng) {
      console.log('Invalid Request')
      throw new ValidationError('Invalid Request')
    }

    // Find Data
    const data = await usersModel.findOne({ where: { id: this.users.id } })

    // If Data Not Exist
    if (!data) {
      console.log('User Not Found')
      throw new NotFoundError('User Not Found')
    }

    // Update Data
    const payload = { last_location: { type: 'Point', coordinates: [lng, lat] } }
    await data.update(payload)

    return data
  }
}

module.exports = Service
