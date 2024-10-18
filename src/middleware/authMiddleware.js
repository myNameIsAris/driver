const { ValidationError } = require('../helper/customErrorHelper')
const { usersModel } = require('../models/relation')

const isAuthenticated = async (req, res, next) => {
  try {
    const authorizationCode = req.headers.authorization
    const [bearer, token] = authorizationCode.split(' ')
    if (!token) {
      throw new ValidationError('Token not found')
    }

    const user = await usersModel.findOne({
      where: { token },
      attributes: ['id', 'name', 'email', 'role', 'token'],
    })
    if (!user) {
      throw new ValidationError('Token is invalid')
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { isAuthenticated }
