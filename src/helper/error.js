const auditLog = require('./AuditLog')
const { response } = require('./responseHelper')

const errorMiddleware = async (error, req, res, next) => {
  if (!error) return next()

  console.log(error)
  if (error.name === 'ValidationError') {
    await auditLog(req, 'Bad Request', 400)
    return response(res, 400, 'Bad Request', null, {}, error.message)
  } else if (error.name === 'NotFoundError') {
    await auditLog(req, 'Not Found', 404)
    return response(res, 404, 'Not Found', null, {}, error.message)
  } else if (error.name === 'AuthenticationError') {
    await auditLog(req, 'Auth Error', 401)
    return response(res, 401, 'Auth Error', null, {}, error.message)
  } else if (error.name === 'ForbiddenError') {
    await auditLog(req, 'Forbidden Error', 403)
    return response(res, 403, 'Forbidden Error', null, {}, error.message)
  }

  await auditLog(req, 'Internal Server Error', 500)
  return response(res, 500, 'Internal Server Error', null, {}, error.message)
}

module.exports = { errorMiddleware }
