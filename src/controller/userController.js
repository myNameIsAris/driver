const { response } = require('../helper/responseHelper')
const userService = require('../services/userService')

const login = async (req, res, next) => {
  try {
    console.log('LOGIN')

    const user = null
    const body = req.body
    const paramaters = { ...req.params, ...req.query }
    const service = new userService(paramaters, body, user)
    const result = await service.login()

    return response(res, 200, 'Ok', 'Success Login', result)
  } catch (error) {
    next(error)
  }
}

const identify = async (req, res, next) => {
  try {
    console.log('IDENTIFY')

    const user = req.user
    const body = req.body
    const paramaters = { ...req.params, ...req.query }
    const service = new userService(paramaters, body, user)
    const data = await service.identify()

    return response(res, 200, 'Ok', 'Success Identify', data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  identify,
}
